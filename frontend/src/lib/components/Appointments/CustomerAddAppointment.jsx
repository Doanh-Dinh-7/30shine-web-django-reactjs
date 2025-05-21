import { useState, useEffect } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  SimpleGrid,
  Tooltip,
  IconButton,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useOutletContext } from "react-router-dom";
import LoginModal from "../Auth/LoginModal";
import axios from "axios";

const TIME_SLOTS = [
  ["08h00", "08h20", "08h40", "09h00", "09h20", "09h40"],
  ["10h00", "10h20", "10h40", "11h00", "11h20", "11h40"],
  ["12h00", "12h20", "12h40", "13h00", "13h20", "13h40"],
  ["14h00", "14h20", "14h40", "15h00", "15h20", "15h40"],
  ["16h00", "16h20", "16h40", "17h00", "17h20", "17h40"],
  ["18h00", "18h20", "18h40", "19h00", "19h20", "19h40"],
  ["20h00", "20h20", "20h40", "21h00", "21h20", "21h40"],
  ["22h00", "22h20", "22h40", "23h00", "23h20", "23h40"],
];

const MAX_APPOINTMENTS_PER_SLOT = 2; // Số lượng tối đa lịch hẹn cho mỗi khung giờ

const CustomerAddAppointment = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { appointments: rawAppointments, setAppointments } =
    useOutletContext() || {};
  const appointments = rawAppointments || [];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const role = localStorage.getItem("role");
  const [services, setServices] = useState([]);
  const [staffList, setStaffList] = useState([]);

  const [formData, setFormData] = useState({
    MaKH: "",
    HoTenKH: "",
    SDT: "",
    NgayDatLich: "",
    GioDatLich: "",
    MaDV: "",
    TenDV: "",
    GiaTien: "",
    GhiChu: "",
  });

  // Kiểm tra localStorage có MaKH không
  useEffect(() => {
    const MaKH = localStorage.getItem("MaKH");
    if (MaKH) {
      setFormData((prev) => ({
        ...prev,
        MaKH: MaKH,
        HoTenKH: HoTenKH,
        SDT: SDT,
      }));
    } else {
      onOpen();
    }
  }, [onOpen]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/nhan-vien/"
        );
        setStaffList(response.data);
      } catch (error) {
        console.error("Error fetching staff:", error);
        toast({
          title: "Lỗi",
          description: "Không thể tải danh sách nhân viên",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchStaff();
  }, [toast]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/dich-vu/");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
        toast({
          title: "Lỗi",
          description: "Không thể tải danh sách dịch vụ",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchServices();
  }, [toast]);

  // Scroll to top when component mounts
  useEffect(() => {
    const mainContent = document.querySelector('[role="main"]') || window;
    mainContent.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Kiểm tra xem một khung giờ đã kín chưa
  const isTimeSlotFull = (time) => {
    if (!formData.TGHen) return false;
    const appointmentsForSlot = appointments.filter(
      (app) => app.TGHen === formData.TGHen && app.GioKhachDen === time
    );
    return appointmentsForSlot.length >= MAX_APPOINTMENTS_PER_SLOT;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "TenDV") {
      const selectedService = services.find(
        (service) => service.TenDV === value
      );
      setFormData((prev) => ({
        ...prev,
        TenDV: value,
        MaDV: selectedService ? selectedService.MaDV : "",
        GiaTien: selectedService ? selectedService.GiaTien : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      TGHen: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const appointmentData = {
        MaKH: formData.MaKH,
        MaDV: formData.MaDV,
        NgayDatLich: new Date().toISOString().split("T")[0],
        GioDatLich: formData.GioDatLich,
        GhiChu: formData.GhiChu || "",
        TrangThai: 0, // 0: Chờ xác nhận
      };

      const response = await axios.post(
        "http://localhost:8000/api/lich-hen/",
        appointmentData
      );

      if (response.status === 201) {
        toast({
          title: "Thành công",
          description: "Đặt lịch hẹn thành công",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/appointments");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast({
        title: "Lỗi",
        description: error.response?.data?.detail || "Không thể đặt lịch hẹn",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="800px" mx="auto" p={6} role="main">
      <Flex align="center" mb={8}>
        <IconButton
          icon={<FiArrowLeft />}
          aria-label="Quay lại"
          variant="ghost"
          colorScheme="blue"
          mr={2}
          onClick={() => navigate(-1)}
        />
        <Heading textAlign="center" color="blue.700" flex={1}>
          Đặt lịch giữ chỗ
        </Heading>
      </Flex>

      {!role && (
        <Text
          color="red.500"
          textAlign="center"
          fontSize="lg"
          fontWeight="bold"
          mb={4}
        >
          Bạn cần đăng nhập để đặt lịch
        </Text>
      )}

      <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Họ và tên</FormLabel>
            <Input
              name="HoTenKH"
              value={formData.HoTenKH}
              onChange={handleChange}
              placeholder="Nhập họ và tên"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Số điện thoại</FormLabel>
            <Input
              name="SDT"
              value={formData.SDT}
              onChange={handleChange}
              placeholder="Nhập số điện thoại"
              type="tel"
            />
          </FormControl>

          {/* <FormControl isRequired>
            <FormLabel>Ngày đặt lịch</FormLabel>
            <Input
              name="NgayDatLich"
              value={formData.NgayDatLich}
              onChange={handleChange}
              type="date"
              min={new Date().toISOString().split("T")[0]}
            />
          </FormControl> */}

          <FormControl isRequired>
            <FormLabel>Loại dịch vụ</FormLabel>
            <Select
              name="TenDV"
              value={formData.TenDV}
              onChange={handleChange}
              placeholder="Chọn dịch vụ"
            >
              {services.map((service) => (
                <option key={service.MaDV} value={service.TenDV}>
                  {service.TenDV} -{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(service.GiaTien)}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Ngày hẹn</FormLabel>
            <Input
              name="TGHen"
              value={formData.TGHen}
              onChange={handleDateChange}
              type="date"
              min={new Date().toISOString().split("T")[0]}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Giờ hẹn</FormLabel>
            <VStack spacing={2} align="stretch">
              {TIME_SLOTS.map((row, rowIndex) => (
                <SimpleGrid key={rowIndex} columns={6} spacing={2}>
                  {row.map((time) => {
                    const isFull = isTimeSlotFull(time);
                    return (
                      <Tooltip
                        key={time}
                        label={isFull ? "Khung giờ này đã kín lịch" : ""}
                        isDisabled={!isFull}
                      >
                        <Button
                          size="sm"
                          variant={
                            formData.GioKhachDen === time ? "solid" : "outline"
                          }
                          colorScheme={
                            formData.GioKhachDen === time ? "blue" : "gray"
                          }
                          onClick={() =>
                            !isFull &&
                            handleChange({
                              target: { name: "GioKhachDen", value: time },
                            })
                          }
                          opacity={isFull ? 0.5 : 1}
                          cursor={isFull ? "not-allowed" : "pointer"}
                          _hover={{
                            bg: isFull ? "gray.300" : undefined,
                          }}
                          isDisabled={isFull}
                          bg={isFull ? "gray.300" : undefined}
                        >
                          {time}
                        </Button>
                      </Tooltip>
                    );
                  })}
                </SimpleGrid>
              ))}
            </VStack>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Nhân viên phụ trách</FormLabel>
            <Select
              name="HoTenNV"
              value={formData.HoTenNV}
              onChange={handleChange}
              placeholder="Chọn nhân viên"
            >
              {staffList.map((staff) => (
                <option key={staff.MaNV} value={staff.MaNV}>
                  {staff.HoTenNV}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Ghi chú</FormLabel>
            <Input
              name="GhiChu"
              value={formData.GhiChu}
              onChange={handleChange}
              placeholder="Nhập ghi chú (nếu có)"
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="full"
            onClick={handleSubmit}
          >
            Đặt lịch
          </Button>
        </VStack>
      </Box>

      <Box bg="gray.100" p={4} borderRadius="md" textAlign="center" mt={4}>
        <Text>Cắt xong trả tiền, huỷ lịch không sao</Text>
      </Box>

      <LoginModal
        isOpen={isOpen}
        onClose={onClose}
        onLoginSuccess={() => {
          localStorage.setItem("role", "khach hang");
          window.location.reload();
        }}
      />
    </Box>
  );
};

export default CustomerAddAppointment;
