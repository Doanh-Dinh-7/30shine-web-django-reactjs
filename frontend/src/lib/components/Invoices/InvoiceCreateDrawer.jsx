import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Text,
  VStack,
  useToast,
  Box,
  HStack,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";

const trangThaiTTOptions = [
  { value: 0, label: "Chưa thanh toán" },
  { value: 1, label: "Đã thanh toán" },
  { value: 2, label: "Đã đánh giá" },
];

const trangThaiHTOptions = [
  { value: 0, label: "Chưa hoàn" },
  { value: 1, label: "Đã yêu cầu hoàn" },
  { value: 2, label: "Đã hoàn" },
  { value: 3, label: "Đã từ chối" },
];

const InvoiceCreateDrawer = ({ isOpen, onClose, onSubmit }) => {
  const formatDateTime = () => {
    return new Date().toISOString(); // Định dạng ISO cho NgayLapHD
  };

  const [formData, setFormData] = useState({
    MaKH: "",
    HoTenKH: "",
    TongTien: "0.00",
    NgayLapHD: formatDateTime(),
    TrangThaiTT: 0,
    TrangThaiHT: 0,
    GhiChu: "",
    chi_tiet: [{ MaDV: "", TenDV: "", ThanhTien: "0.00", SoLuong: 1 }],
  });
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const toast = useToast();

  // Lấy danh sách dịch vụ từ API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/dich-vu/");
        setServices(response.data);
      } catch {
        toast({
          title: "Lỗi",
          description: "Không thể tải danh sách dịch vụ.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchServices();
  }, [toast]);

  // Lấy danh sách khách hàng từ API khi mở drawer
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/khach-hang/"
        );
        setCustomers(response.data);
      } catch {
        toast({
          title: "Lỗi",
          description: "Không thể tải danh sách khách hàng.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };
    fetchCustomers();
  }, [toast]);

  // Cập nhật HoTenKH khi MaKH thay đổi
  useEffect(() => {
    if (formData.MaKH) {
      const customer = customers.find((c) => c.MaKH === Number(formData.MaKH));
      setFormData((prev) => ({
        ...prev,
        HoTenKH: customer ? customer.HoTenKH : "Khách hàng không tồn tại",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        HoTenKH: "",
      }));
    }
  }, [formData.MaKH, customers]);

  // Tính toán TongTien dựa trên chi_tiet
  const calculateTotal = (chi_tiet) => {
    const total = chi_tiet.reduce((sum, dv) => {
      const thanhTien = parseFloat(dv.ThanhTien) || 0;
      const soLuong = dv.SoLuong || 1;
      return sum + thanhTien * soLuong;
    }, 0);
    return total.toFixed(2); // Định dạng số thập phân 2 chữ số
  };

  // Cập nhật TongTien mỗi khi chi_tiet thay đổi
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      TongTien: calculateTotal(prev.chi_tiet),
    }));
  }, [formData.chi_tiet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (index, value) => {
    const selectedService = services.find((s) => s.TenDV === value);
    const updatedChiTiet = [...formData.chi_tiet];
    updatedChiTiet[index] = {
      ...updatedChiTiet[index],
      MaDV: selectedService ? selectedService.MaDV : "",
      TenDV: value,
      ThanhTien: selectedService
        ? (
            parseFloat(selectedService.GiaTien) * updatedChiTiet[index].SoLuong
          ).toFixed(2)
        : "0.00",
    };
    setFormData((prev) => ({ ...prev, chi_tiet: updatedChiTiet }));
  };

  const handleServiceChange = (index, field, value) => {
    const updatedChiTiet = [...formData.chi_tiet];
    updatedChiTiet[index][field] = field === "SoLuong" ? Number(value) : value;
    if (field === "SoLuong") {
      const selectedService = services.find(
        (s) => s.TenDV === updatedChiTiet[index].TenDV
      );
      updatedChiTiet[index].ThanhTien = selectedService
        ? (parseFloat(selectedService.GiaTien) * Number(value)).toFixed(2)
        : "0.00";
    }
    setFormData((prev) => ({ ...prev, chi_tiet: updatedChiTiet }));
  };

  const handleAddService = () => {
    setFormData((prev) => ({
      ...prev,
      chi_tiet: [
        ...prev.chi_tiet,
        { MaDV: "", TenDV: "", ThanhTien: "0.00", SoLuong: 1 },
      ],
    }));
  };

  const handleRemoveService = (index) => {
    const updatedChiTiet = formData.chi_tiet.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, chi_tiet: updatedChiTiet }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasInvalidService = formData.chi_tiet.some(
      (dv) =>
        !dv.MaDV ||
        isNaN(parseFloat(dv.ThanhTien)) ||
        parseFloat(dv.ThanhTien) <= 0 ||
        dv.SoLuong < 1
    );

    if (
      !formData.MaKH ||
      formData.HoTenKH === "Khách hàng không tồn tại" ||
      hasInvalidService
    ) {
      toast({
        title: "Lỗi",
        description:
          formData.HoTenKH === "Khách hàng không tồn tại"
            ? "Khách hàng không tồn tại. Vui lòng kiểm tra Mã khách hàng!"
            : hasInvalidService
            ? "Thông tin dịch vụ không hợp lệ. Vui lòng chọn dịch vụ và kiểm tra số lượng/thành tiền."
            : "Vui lòng nhập đầy đủ thông tin hợp lệ!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const payload = {
      ...formData,
      TongTien: parseFloat(formData.TongTien).toFixed(2),
      LyDoKhachH: null,
      LyDoQly: null,
      chi_tiet: formData.chi_tiet.map((dv) => ({
        MaDV: dv.MaDV,
        ThanhTien: parseFloat(dv.ThanhTien).toFixed(2),
        SoLuong: dv.SoLuong,
      })),
    };

    try {
      await onSubmit(payload);
      onClose();
      toast({
        title: "Thêm hóa đơn thành công",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Lỗi khi gửi API:", error);
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data ||
        "Không thể lưu thông tin. Vui lòng kiểm tra API.";
      toast({
        title: "Lỗi",
        description:
          typeof errorMessage === "string"
            ? errorMessage
            : JSON.stringify(errorMessage),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <Box bg="blue.50" px={6} py={4}>
          <DrawerHeader p={0} color="black" fontWeight="semibold">
            Tạo hóa đơn
            <Text fontSize="sm" color="gray.600">
              {new Date().toLocaleString()}
            </Text>
          </DrawerHeader>
        </Box>
        <DrawerCloseButton />

        <form onSubmit={handleSubmit}>
          <DrawerBody py={6} overflow="auto" maxHeight="calc(100vh - 160px)">
            <VStack spacing={5} align="stretch">
              <FormControl isRequired>
                <HStack>
                  <FormLabel minW="14vw">Mã khách hàng</FormLabel>
                  <Input
                    name="MaKH"
                    value={formData.MaKH}
                    onChange={handleChange}
                    type="number"
                  />
                </HStack>
              </FormControl>
              <FormControl isRequired>
                <HStack>
                  <FormLabel minW="14vw">Họ và tên khách hàng</FormLabel>
                  <Input
                    name="HoTenKH"
                    value={formData.HoTenKH}
                    isReadOnly
                    bg={
                      formData.HoTenKH === "Khách hàng không tồn tại"
                        ? "red.100"
                        : "gray.100"
                    }
                    color={
                      formData.HoTenKH === "Khách hàng không tồn tại"
                        ? "red.600"
                        : "black"
                    }
                  />
                </HStack>
              </FormControl>

              <FormControl isRequired>
                <HStack align="flex-start">
                  <FormLabel minW="14vw" pt={2}>
                    Dịch vụ
                  </FormLabel>
                  <VStack spacing={2} flex={1} align="stretch">
                    {formData.chi_tiet.map((dv, index) => (
                      <HStack key={index} spacing={3}>
                        <Select
                          placeholder="Chọn dịch vụ"
                          value={dv.TenDV}
                          onChange={(e) =>
                            handleSelectChange(index, e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Chọn dịch vụ
                          </option>
                          {services.map((service) => (
                            <option key={service.MaDV} value={service.TenDV}>
                              {service.TenDV}
                            </option>
                          ))}
                        </Select>
                        <Input
                          placeholder="Thành tiền"
                          type="number"
                          step="0.01"
                          value={Number(dv.ThanhTien).toLocaleString("vi-VN")}
                          isReadOnly
                          bg="gray.100"
                        />
                        <Input
                          placeholder="Số lượng"
                          type="number"
                          min={1}
                          maxW="100px"
                          value={dv.SoLuong}
                          onChange={(e) =>
                            handleServiceChange(
                              index,
                              "SoLuong",
                              e.target.value
                            )
                          }
                        />
                        {formData.chi_tiet.length > 1 && (
                          <Button
                            size="sm"
                            colorScheme="red"
                            onClick={() => handleRemoveService(index)}
                          >
                            -
                          </Button>
                        )}
                      </HStack>
                    ))}
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="blue"
                      onClick={handleAddService}
                    >
                      + Thêm dịch vụ
                    </Button>
                  </VStack>
                </HStack>
              </FormControl>

              <FormControl isRequired>
                <HStack>
                  <FormLabel minW="14vw">Tổng tiền</FormLabel>
                  <Input
                    name="TongTien"
                    value={formData.TongTien}
                    isReadOnly
                    bg="gray.100"
                  />
                </HStack>
              </FormControl>
              <FormControl>
                <HStack>
                  <FormLabel minW="14vw">Ghi chú</FormLabel>
                  <Input
                    name="GhiChu"
                    value={formData.GhiChu}
                    onChange={handleChange}
                  />
                </HStack>
              </FormControl>

              <FormControl isRequired>
                <HStack>
                  <FormLabel minW="14vw">Trạng thái thanh toán</FormLabel>
                  <Select
                    name="TrangThaiTT"
                    value={formData.TrangThaiTT}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        TrangThaiTT: Number(e.target.value),
                      }))
                    }
                    maxW="200px"
                  >
                    {trangThaiTTOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Select>
                </HStack>
              </FormControl>

              <FormControl isRequired>
                <HStack>
                  <FormLabel minW="14vw">Trạng thái hoàn tiền</FormLabel>
                  <Select
                    name="TrangThaiHT"
                    value={formData.TrangThaiHT}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        TrangThaiHT: Number(e.target.value),
                      }))
                    }
                    maxW="200px"
                  >
                    {trangThaiHTOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Select>
                </HStack>
              </FormControl>
            </VStack>
          </DrawerBody>

          <DrawerFooter
            bg="blue.50"
            justifyContent="flex-end"
            gap={2}
            position="sticky"
            bottom="0"
          >
            <Button variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit" colorScheme="blue">
              Lưu
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

InvoiceCreateDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default InvoiceCreateDrawer;
