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

const CustomerAppointments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showOnlyPending, setShowOnlyPending] = useState(false);
  const toast = useToast();
  const [appointments, setAppointments] = useState([
    {
      MaLH: "LH001",
      TenKH: "Nguyễn Văn An",
      SDT: "0912345678",
      TGHen: "2024-03-22",
      GioKhachDen: "09:30",
      LoaiDV: "Cắt tóc nam",
      TrangThai: "Chờ hoàn thành",
    },
    {
      MaLH: "LH002",
      TenKH: "Nguyễn Văn An",
      SDT: "0912345678",
      TGHen: "2024-03-25",
      GioKhachDen: "14:00",
      LoaiDV: "Nhuộm tóc",
      TrangThai: "Chờ hoàn thành",
    },
    {
      MaLH: "LH003",
      TenKH: "Nguyễn Văn An",
      SDT: "0912345678",
      TGHen: "2024-03-28",
      GioKhachDen: "10:30",
      LoaiDV: "Combo cắt gội",
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
      setAppointments(
        appointments.map((app) =>
          app.MaLH === selectedAppointment.MaLH ? { ...formData, MaLH: selectedAppointment.MaLH } : app
        )
      );
    } else {
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
          Lịch hẹn của tôi
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
            Đặt lịch mới
          </Button>
        </Flex>
      </Flex>

      <Box bg="blue.50" p={4} borderRadius="xl" boxShadow="md">
        <AppointmentTable
          appointments={filteredAppointments}
          onEditAppointment={handleEdit}
          onDeleteAppointment={handleDelete}
          showMaKH={false}
        />
      </Box>

      <AppointmentFormDrawer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={selectedAppointment}
        onSubmit={handleSubmit}
        isManager={false}
      />
    </Box>
  );
};

export default CustomerAppointments; 