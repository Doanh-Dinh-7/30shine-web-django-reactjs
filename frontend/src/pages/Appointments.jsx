import { useState, useEffect } from "react";
import {
  Box,
  Input,
  Flex,
  InputGroup,
  InputLeftElement,
  Button,
  Heading,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { FiSearch, FiFilter } from "react-icons/fi";
import AppointmentTable from "../lib/components/Appointments/AppointmentTable";
import axios from "axios";

const Appointments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyPending, setShowOnlyPending] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [appointments, setAppointments] = useState([]);

  // Hàm lấy dữ liệu từ API
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/lich-hen/');
      setAppointments(response.data);
    } catch (error) {
      toast({
        title: "Lỗi khi tải dữ liệu",
        description: "Không thể kết nối đến máy chủ",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (maLH) => {
    try {
      await axios.delete(`http://localhost:8000/api/lich-hen/${maLH}/`);
      setAppointments(appointments.filter((app) => app.MaLH !== maLH));
      toast({
        title: "Xóa thành công",
        description: "Lịch hẹn đã được xóa",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Lỗi khi xóa",
        description: "Không thể xóa lịch hẹn",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const filteredAppointments = appointments
    .filter(
      (appointment) =>
        appointment.HoTenKH.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.SDT.includes(searchQuery) ||
        appointment.TenDV.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((appointment) => 
      !showOnlyPending || appointment.TrangThai === 0
    )
    .sort((a, b) => {
      const dateTimeA = `${a.NgayDatLich} ${a.GioKhachDen}`;
      const dateTimeB = `${b.NgayDatLich} ${b.GioKhachDen}`;
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
      </Flex>

      <Box bg="blue.50" p={4} borderRadius="xl" boxShadow="md">
        {loading ? (
          <Flex justify="center" align="center" h="200px">
            <Spinner size="xl" color="blue.500" />
          </Flex>
        ) : (
          <AppointmentTable
            appointments={filteredAppointments}
            onDeleteAppointment={handleDelete}
          />
        )}
      </Box>
    </Box>
  );
};

export default Appointments; 