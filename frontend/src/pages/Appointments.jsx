import { useState } from "react";
import {
  Box,
  Input,
  Flex,
  InputGroup,
  InputLeftElement,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { FiSearch, FiPlus, FiFilter } from "react-icons/fi";
import AppointmentFormDrawer from "../lib/components/Appointments/AppointmentFormDrawer";
import AppointmentTable from "../lib/components/Appointments/AppointmentTable";

const Appointments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showOnlyPending, setShowOnlyPending] = useState(false);
  const toast = useToast();
  const [appointments, setAppointments] = useState([
    {
      MaKH: "KH001",
      MaLH: "LH001",
      TenKH: "Nguyễn Văn An",
      SDT: "0912345678",
      TGHen: "2024-03-22",
      GioKhachDen: "09:30",
      LoaiDV: "Cắt tóc nam",
      NhanVien: "Nguyễn Văn A",
      TrangThai: "Chờ hoàn thành",
    },
    {
      MaKH: "KH002",
      MaLH: "LH002",
      TenKH: "Trần Thị Bình",
      SDT: "0923456789",
      TGHen: "2024-03-22",
      GioKhachDen: "10:00",
      LoaiDV: "Nhuộm tóc",
      NhanVien: "Trần Thị B",
      TrangThai: "Chờ hoàn thành",
    },
    {
      MaKH: "KH001",
      MaLH: "LH003",
      TenKH: "Nguyễn Văn An",
      SDT: "0912345678",
      TGHen: "2024-03-21",
      GioKhachDen: "14:30",
      LoaiDV: "Combo cắt gội",
      NhanVien: "Phạm Văn C",
      TrangThai: "Đã hoàn thành",
    },
    {
      MaKH: "KH003",
      MaLH: "LH004",
      TenKH: "Phạm Thị Dung",
      SDT: "0945678901",
      TGHen: "2024-03-21",
      GioKhachDen: "15:00",
      LoaiDV: "Uốn tóc",
      NhanVien: "Nguyễn Văn D",
      TrangThai: "Đã hoàn thành",
    },
    {
      MaKH: "KH004",
      MaLH: "LH005",
      TenKH: "Hoàng Văn Em",
      SDT: "0956789012",
      TGHen: "2024-03-20",
      GioKhachDen: "13:30",
      LoaiDV: "Gội đầu",
      NhanVien: "Trần Thị E",
      TrangThai: "Đã hoàn thành",
    },
    {
      MaKH: "KH002",
      MaLH: "LH006",
      TenKH: "Trần Thị Bình",
      SDT: "0923456789",
      TGHen: "2024-03-20",
      GioKhachDen: "14:00",
      LoaiDV: "Nhuộm tóc",
      NhanVien: "Trần Thị F",
      TrangThai: "Đã hoàn thành",
    },
    {
      MaKH: "KH005",
      MaLH: "LH007",
      TenKH: "Vũ Văn Giang",
      SDT: "0978901234",
      TGHen: "2024-03-19",
      GioKhachDen: "16:00",
      LoaiDV: "Cắt tóc nam",
      NhanVien: "Nguyễn Văn G",
      TrangThai: "Đã hoàn thành",
    },
    {
      MaKH: "KH006",
      MaLH: "LH008",
      TenKH: "Đỗ Thị Hương",
      SDT: "0989012345",
      TGHen: "2024-03-19",
      GioKhachDen: "16:30",
      LoaiDV: "Uốn tóc",
      NhanVien: "Trần Thị H",
      TrangThai: "Đã hoàn thành",
    },
    {
      MaKH: "KH007",
      MaLH: "LH009",
      TenKH: "Bùi Văn Khoa",
      SDT: "0990123456",
      TGHen: "2024-03-18",
      GioKhachDen: "11:00",
      LoaiDV: "Combo cắt gội",
      NhanVien: "Nguyễn Văn I",
      TrangThai: "Đã hoàn thành",
    },
    {
      MaKH: "KH008",
      MaLH: "LH010",
      TenKH: "Lý Thị Mai",
      SDT: "0912345679",
      TGHen: "2024-03-18",
      GioKhachDen: "11:30",
      LoaiDV: "Nhuộm tóc",
      NhanVien: "Trần Thị J",
      TrangThai: "Đã hoàn thành",
    }
  ]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleDelete = (maLH) => {
    setAppointments(appointments.filter((app) => app.MaLH !== maLH));
    toast({
      title: "Xóa thành công",
      description: "Lịch hẹn đã được xóa",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleSubmit = (formData) => {
    if (selectedAppointment) {
      // Update existing appointment
      setAppointments(
        appointments.map((app) =>
          app.MaLH === selectedAppointment.MaLH ? { ...formData, MaLH: selectedAppointment.MaLH } : app
        )
      );
    } else {
      // Add new appointment
      const maxNumber = appointments.reduce((max, app) => {
        const num = parseInt(app.MaLH.replace('LH', ''));
        return num > max ? num : max;
      }, 0);
      const newNumber = (maxNumber + 1).toString().padStart(3, '0');
      const newMaLH = `LH${newNumber}`;
      setAppointments([...appointments, { ...formData, MaLH: newMaLH }]);
    }
    setIsModalOpen(false);
  };

  const filteredAppointments = appointments
    .filter(
      (appointment) =>
        appointment.TenKH.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.SDT.includes(searchQuery) ||
        appointment.LoaiDV.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((appointment) => 
      !showOnlyPending || appointment.TrangThai === "Chờ hoàn thành"
    )
    .sort((a, b) => {
      const dateTimeA = `${a.TGHen} ${a.GioKhachDen}`;
      const dateTimeB = `${b.TGHen} ${b.GioKhachDen}`;
      return new Date(dateTimeB) - new Date(dateTimeA);
    });

  return (
    <Box p={6}>
      <Box mb={4}>
        <Heading fontSize="lg" color="blue.600">
          Quản lý lịch hẹn
        </Heading>
      </Box>

      <Flex justify="space-between" align="center" mb={4}>
        <InputGroup maxW="300px" bg="white" borderRadius="md" boxShadow="sm">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.400" />
          </InputLeftElement>
          <Input placeholder="Tìm kiếm lịch hẹn" onChange={handleSearchChange} />
        </InputGroup>

        <Flex gap={2}>
          <Button
            leftIcon={<FiFilter />}
            colorScheme={showOnlyPending ? "blue" : "gray"}
            color="white"
            borderRadius="md"
            px={5}
            onClick={() => setShowOnlyPending(!showOnlyPending)}
          >
            Lọc trạng thái
          </Button>

          <Button
            leftIcon={<FiPlus />}
            colorScheme="blue"
            color="white"
            borderRadius="md"
            px={5}
            onClick={() => setIsModalOpen(true)}
          >
            Thêm lịch hẹn
          </Button>
        </Flex>
      </Flex>

      <Box bg="blue.50" p={4} borderRadius="xl" boxShadow="md">
        <AppointmentTable
          appointments={filteredAppointments}
          onEditAppointment={handleEdit}
          onDeleteAppointment={handleDelete}
          showMaKH={true}
        />
      </Box>

      <AppointmentFormDrawer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={selectedAppointment}
        onSubmit={handleSubmit}
        isManager={true}
      />
    </Box>
  );
};

export default Appointments; 