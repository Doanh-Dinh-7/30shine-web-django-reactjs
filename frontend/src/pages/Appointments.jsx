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
      TenKH: "Nguyễn Văn An",
      SDT: "0912345678",
      TGHen: "2024-03-22",
      GioKhachDen: "09:30",
      LoaiDV: "Cắt tóc nam",
      TrangThai: "Chờ hoàn thành",
    },
    {
      TenKH: "Trần Thị Bình",
      SDT: "0923456789",
      TGHen: "2024-03-22",
      GioKhachDen: "10:00",
      LoaiDV: "Nhuộm tóc",
      TrangThai: "Chờ hoàn thành",
    },
    {
      TenKH: "Lê Văn Cường",
      SDT: "0934567890",
      TGHen: "2024-03-21",
      GioKhachDen: "14:30",
      LoaiDV: "Combo cắt gội",
      TrangThai: "Chờ hoàn thành",
    },
    {
      TenKH: "Phạm Thị Dung",
      SDT: "0945678901",
      TGHen: "2024-03-21",
      GioKhachDen: "15:00",
      LoaiDV: "Uốn tóc",
      TrangThai: "Đã hoàn thành",
    },
    {
      TenKH: "Hoàng Văn Em",
      SDT: "0956789012",
      TGHen: "2024-03-20",
      GioKhachDen: "13:30",
      LoaiDV: "Gội đầu",
      TrangThai: "Đã hoàn thành",
    },
    {
      TenKH: "Ngô Thị Phương",
      SDT: "0967890123",
      TGHen: "2024-03-20",
      GioKhachDen: "14:00",
      LoaiDV: "Nhuộm tóc",
      TrangThai: "Đã hoàn thành",
    },
    {
      TenKH: "Vũ Văn Giang",
      SDT: "0978901234",
      TGHen: "2024-03-19",
      GioKhachDen: "16:00",
      LoaiDV: "Cắt tóc nam",
      TrangThai: "Đã hoàn thành",
    },
    {
      TenKH: "Đỗ Thị Hương",
      SDT: "0989012345",
      TGHen: "2024-03-19",
      GioKhachDen: "16:30",
      LoaiDV: "Uốn tóc",
      TrangThai: "Đã hoàn thành",
    },
    {
      TenKH: "Bùi Văn Khoa",
      SDT: "0990123456",
      TGHen: "2024-03-18",
      GioKhachDen: "11:00",
      LoaiDV: "Combo cắt gội",
      TrangThai: "Đã hoàn thành",
    },
    {
      TenKH: "Lý Thị Mai",
      SDT: "0912345679",
      TGHen: "2024-03-18",
      GioKhachDen: "11:30",
      LoaiDV: "Nhuộm tóc",
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

  const handleDelete = (SDT) => {
    // Xử lý xóa lịch hẹn
    setAppointments(appointments.filter((app) => app.SDT !== SDT));
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
          app.SDT === selectedAppointment.SDT ? formData : app
        )
      );
    } else {
      // Add new appointment
      setAppointments([...appointments, formData]);
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
        />
      </Box>

      <AppointmentFormDrawer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={selectedAppointment}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Appointments; 