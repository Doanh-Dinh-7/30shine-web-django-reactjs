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
import { FiSearch, FiPlus } from "react-icons/fi";
import AppointmentFormModal from "../lib/components/Appointments/AppointmentFormModal";
import AppointmentTable from "../lib/components/Appointments/AppointmentTable";

const Appointments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const toast = useToast();
  // eslint-disable-next-line no-unused-vars
  const [appointments, setAppointments] = useState([
    {
      TenKH: "Nguyễn Văn An",
      SDT: "0912345678",
      TGHen: "2024-03-20",
      GioKhachDen: "09:30",
      LoaiDV: "Cắt tóc nam",
      TrangThai: "Đã xác nhận",
    },
    {
      TenKH: "Trần Thị Bình",
      SDT: "0923456789",
      TGHen: "2024-03-20",
      GioKhachDen: "10:00",
      LoaiDV: "Nhuộm tóc",
      TrangThai: "Chờ xác nhận",
    },
    {
      TenKH: "Lê Văn Cường",
      SDT: "0934567890",
      TGHen: "2024-03-20",
      GioKhachDen: "10:30",
      LoaiDV: "Combo cắt gội",
      TrangThai: "Đã hoàn thành",
    },
    {
      TenKH: "Phạm Thị Dung",
      SDT: "0945678901",
      TGHen: "2024-03-20",
      GioKhachDen: "11:00",
      LoaiDV: "Uốn tóc",
      TrangThai: "Đã hủy",
    },
    {
      TenKH: "Hoàng Văn Em",
      SDT: "0956789012",
      TGHen: "2024-03-20",
      GioKhachDen: "13:30",
      LoaiDV: "Gội đầu",
      TrangThai: "Đã xác nhận",
    },
    {
      TenKH: "Ngô Thị Phương",
      SDT: "0967890123",
      TGHen: "2024-03-20",
      GioKhachDen: "14:00",
      LoaiDV: "Nhuộm tóc",
      TrangThai: "Chờ xác nhận",
    },
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

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.TenKH.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.SDT.includes(searchQuery) ||
      appointment.LoaiDV.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <Box bg="blue.50" p={4} borderRadius="xl" boxShadow="md">
        <AppointmentTable
          appointments={filteredAppointments}
          onEditAppointment={handleEdit}
          onDeleteAppointment={handleDelete}
        />
      </Box>

      <AppointmentFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={selectedAppointment}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Appointments; 