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
} from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useOutletContext } from "react-router-dom";

const SERVICES = [
  { id: 1, name: "Cắt tóc nam", price: 100000 },
  { id: 2, name: "Nhuộm tóc", price: 500000 },
  { id: 3, name: "Combo cắt gội", price: 150000 },
  { id: 4, name: "Uốn tóc", price: 700000 },
];

const STAFF_LIST = [
  { id: "NV001", name: "Nguyễn Văn A" },
  { id: "NV002", name: "Trần Thị B" },
  { id: "NV003", name: "Phạm Văn C" },
  { id: "NV004", name: "Lê Thị D" },
  { id: "NV005", name: "Hoàng Văn E" },
];

const TIME_SLOTS = [
  ["08h00", "09h00", "10h00", "11h00", "12h00"],
  ["08h20", "09h20", "10h20", "11h20", "12h20"],
  ["08h40", "09h40", "10h40", "11h40", "12h40"],
  ["13h00", "14h00", "15h00", "16h00", "17h00"],
  ["13h20", "14h20", "15h20", "16h20", "17h20"],
  ["13h40", "14h40", "15h40", "16h40", "17h40"],
  ["18h00", "19h00", "20h00", "21h00", "22h00"],
  ["18h20", "19h20", "20h20", "21h20", "22h20"],
  ["18h40", "19h40", "20h40", "21h40", "22h40"],
];

const MAX_APPOINTMENTS_PER_SLOT = 2; // Số lượng tối đa lịch hẹn cho mỗi khung giờ

const CustomerAddAppointment = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { appointments, setAppointments } = useOutletContext();
  const [formData, setFormData] = useState({
    TenKH: "",
    SDT: "",
    TGHen: "",
    GioKhachDen: "",
    LoaiDV: "",
    NhanVien: "",
    TrangThai: "Chờ hoàn thành",
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate form data
    if (
      !formData.TenKH ||
      !formData.SDT ||
      !formData.TGHen ||
      !formData.GioKhachDen ||
      !formData.LoaiDV ||
      !formData.NhanVien
    ) {
      toast({
        title: "Lỗi",
        description: "Vui lòng điền đầy đủ thông tin",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Generate new appointment ID
    const maxNumber = appointments.reduce((max, app) => {
      const num = parseInt(app.MaLH.replace("LH", ""));
      return num > max ? num : max;
    }, 0);
    const newNumber = (maxNumber + 1).toString().padStart(3, "0");
    const newMaLH = `LH${newNumber}`;

    // Create new appointment object
    const newAppointment = {
      MaLH: newMaLH,
      ...formData,
    };

    // Add new appointment to the list
    setAppointments([...appointments, newAppointment]);

    toast({
      title: "Thành công",
      description: "Đặt lịch thành công",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    window.scrollTo(0, 0);
    navigate("/customerappointments");
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

      <Box bg="white" p={6} borderRadius="lg" boxShadow="md">
        <VStack spacing={4} align="stretch">
          <FormControl isRequired>
            <FormLabel>Họ và tên</FormLabel>
            <Input
              name="TenKH"
              value={formData.TenKH}
              onChange={handleInputChange}
              placeholder="Nhập họ và tên"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Số điện thoại</FormLabel>
            <Input
              name="SDT"
              value={formData.SDT}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại"
              type="tel"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Loại dịch vụ</FormLabel>
            <Select
              name="LoaiDV"
              value={formData.LoaiDV}
              onChange={handleInputChange}
              placeholder="Chọn dịch vụ"
            >
              {SERVICES.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name} -{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(service.price)}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Nhân viên phụ trách</FormLabel>
            <Select
              name="NhanVien"
              value={formData.NhanVien}
              onChange={handleInputChange}
              placeholder="Chọn nhân viên"
            >
              {STAFF_LIST.map((staff) => (
                <option key={staff.id} value={staff.name}>
                  {staff.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Ngày hẹn</FormLabel>
            <Input
              name="TGHen"
              value={formData.TGHen}
              onChange={handleInputChange}
              type="date"
              min={new Date().toISOString().split("T")[0]}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Giờ hẹn</FormLabel>
            <VStack spacing={2} align="stretch">
              {TIME_SLOTS.map((row, rowIndex) => (
                <SimpleGrid key={rowIndex} columns={5} spacing={2}>
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
                            handleInputChange({
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

          <Button colorScheme="blue" size="lg" onClick={handleSubmit} mt={4}>
            Đặt lịch
          </Button>
        </VStack>
      </Box>

      <Box bg="gray.100" p={4} borderRadius="md" textAlign="center" mt={4}>
        <Text>Cắt xong trả tiền, huỷ lịch không sao</Text>
      </Box>
    </Box>
  );
};

export default CustomerAddAppointment;
