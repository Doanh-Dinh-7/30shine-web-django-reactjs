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
    chi_tiet: [{ MaDV: 1, TenDV: "", ThanhTien: "0.00", SoLuong: 1 }],
  });

  const toast = useToast();

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

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleServiceChange = (index, field, value) => {
    const updatedChiTiet = [...formData.chi_tiet];
    updatedChiTiet[index][field] =
      field === "SoLuong"
        ? Number(value)
        : field === "ThanhTien"
        ? parseFloat(value).toFixed(2)
        : value;
    setFormData((prev) => ({ ...prev, chi_tiet: updatedChiTiet }));
  };

  const handleAddService = () => {
    setFormData((prev) => ({
      ...prev,
      chi_tiet: [
        ...prev.chi_tiet,
        { MaDV: prev.chi_tiet.length + 1, TenDV: "", ThanhTien: "0.00", SoLuong: 1 },
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
        !dv.TenDV.trim() ||
        isNaN(parseFloat(dv.ThanhTien)) ||
        parseFloat(dv.ThanhTien) <= 0 ||
        dv.SoLuong < 1
    );

    if (!formData.MaKH || !formData.HoTenKH || hasInvalidService) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ thông tin hợp lệ!",
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
        TenDV: dv.TenDV,
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
        description: JSON.stringify(errorMessage),
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
            <Text fontSize="sm" color="gray.600">{new Date().toLocaleString()}</Text>
          </DrawerHeader>
        </Box>
        <DrawerCloseButton />

        <form onSubmit={handleSubmit}>
          <DrawerBody py={6} overflow="auto" maxHeight="calc(100vh - 160px)">
            <VStack spacing={5} align="stretch">
              <FormControl isRequired>
                <HStack>
                  <FormLabel minW="14vw">Họ và tên khách hàng</FormLabel>
                  <Input
                    name="HoTenKH"
                    value={formData.HoTenKH}
                    onChange={handleChange}
                  />
                </HStack>
              </FormControl>
              <FormControl isRequired>
                <HStack>
                  <FormLabel minW="14vw">Mã khách hàng</FormLabel>
                  <Input name="MaKH" value={formData.MaKH} onChange={handleChange} />
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
                        <Input
                          placeholder="Tên dịch vụ"
                          value={dv.TenDV}
                          onChange={(e) =>
                            handleServiceChange(index, "TenDV", e.target.value)
                          }
                        />
                        <Input
                          placeholder="Thành tiền"
                          type="number"
                          step="0.01"
                          value={dv.ThanhTien}
                          onChange={(e) =>
                            handleServiceChange(index, "ThanhTien", e.target.value)
                          }
                        />
                        <Input
                          placeholder="Số lượng"
                          type="number"
                          min={1}
                          maxW="100px"
                          value={dv.SoLuong}
                          onChange={(e) =>
                            handleServiceChange(index, "SoLuong", e.target.value)
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
                    onChange={handleSelectChange}
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
                    onChange={handleSelectChange}
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