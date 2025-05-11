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
import AppointmentTable from "../lib/components/Appointments/AppointmentTable";
import { useNavigate, useOutletContext } from "react-router-dom";

const CustomerAppointments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyPending, setShowOnlyPending] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { appointments: rawAppointments, setAppointments } = useOutletContext();
  const appointments = rawAppointments || [];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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

  const handleAddNewAppointment = () => {
    window.scrollTo(0, 0);
    navigate("/appointments/addappointment");
  };

  const filteredAppointments = appointments
    .filter(
      (appointment) =>
        appointment.TenKH.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.SDT.includes(searchQuery) ||
        appointment.LoaiDV.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (appointment) =>
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
          <Input
            placeholder="Tìm kiếm lịch hẹn"
            onChange={handleSearchChange}
          />
        </InputGroup>

        <Flex gap={2}>
          <Button
            leftIcon={<FiPlus />}
            colorScheme="blue"
            color="white"
            borderRadius="md"
            px={5}
            onClick={handleAddNewAppointment}
          >
            Đặt lịch mới
          </Button>
        </Flex>
      </Flex>

      <Box bg="blue.50" p={4} borderRadius="xl" boxShadow="md">
        <AppointmentTable
          appointments={filteredAppointments}
          onDeleteAppointment={handleDelete}
          showMaKH={false}
        />
      </Box>
    </Box>
  );
};

export default CustomerAppointments;
