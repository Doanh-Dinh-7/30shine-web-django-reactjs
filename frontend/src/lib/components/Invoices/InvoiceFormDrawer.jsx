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
  HStack
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const trangThaiTTOptions = [
  { value: 0, label: "chưa thanh toán" },
  { value: 1, label: "đã thanh toán" },
  { value: 2, label: "đã đánh giá" },
];

const trangThaiHTOptions = [
  { value: 0, label: "chưa hoàn" },
  { value: 1, label: "đã yêu cầu hoàn" },
  { value: 2, label: "đã hoàn" },
  { value: 3, label: "đã từ chối" },
];

const InvoiceFormDrawer = ({ isOpen, onClose, invoice, onSubmit }) => {
  const formatDateTime = (date) => {
    const hh = date.getHours().toString().padStart(2, "0");
    const mm = date.getMinutes().toString().padStart(2, "0");
    const dd = date.getDate().toString().padStart(2, "0");
    const MM = (date.getMonth() + 1).toString().padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${hh}:${mm} ${dd}/${MM}/${yyyy}`;
  };

  const [formData, setFormData] = useState({
    MaKH: "",
    HoTenKH: "",
    GiaTien: "",
    ChietKhau: "0",
    TongTien: "",
    NoiDung: "",
    DichVu: [{ tenDichVu: "", soLuong: 1 }],
    TrangThaiTT: 0, // kiểu số
    TrangThaiHT: 0, // kiểu số
    ThoiGianThanhToan: formatDateTime(new Date()),
  });

  const toast = useToast();

  useEffect(() => {
    if (invoice) {
      setFormData({
        ...invoice,
        TrangThaiTT: Number(invoice.TrangThaiTT),
        TrangThaiHT: Number(invoice.TrangThaiHT),
      });
    } else {
      setFormData({
        MaHD: "Mới",
        MaKH: "",
        HoTenKH: "",
        GiaTien: "",
        ChietKhau: "0",
        TongTien: "",
        NoiDung: "",
        DichVu: [{ tenDichVu: "", soLuong: 1 }],
        TrangThaiTT: 0,
        TrangThaiHT: 0,
        ThoiGianThanhToan: formatDateTime(new Date()),
      });
    }
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "GiaTien" || name === "ChietKhau") {
      const numberValue = value.replace(/\D/g, ""); // Bỏ tất cả ký tự không phải số
      formattedValue = numberValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Thêm dấu phẩy
    }

    setFormData((prev) => {
      const giaTien = parseInt(
        name === "GiaTien"
          ? formattedValue.replace(/,/g, "")
          : prev.GiaTien.replace(/,/g, "") || 0
      );
      const chietKhau = parseInt(
        name === "ChietKhau"
          ? formattedValue.replace(/,/g, "")
          : prev.ChietKhau.replace(/,/g, "") || 0
      );
      const tongTien = (giaTien - chietKhau).toLocaleString();
      return { ...prev, [name]: formattedValue, TongTien: tongTien };
    });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleServiceChange = (index, field, value) => {
    const updatedDichVu = [...formData.DichVu];
    updatedDichVu[index][field] = value;
    setFormData((prev) => ({ ...prev, DichVu: updatedDichVu }));
  };

  const handleAddService = () => {
    setFormData((prev) => ({
      ...prev,
      DichVu: [...prev.DichVu, { tenDichVu: "", soLuong: 1 }],
    }));
  };

  const handleRemoveService = (index) => {
    const updatedDichVu = formData.DichVu.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, DichVu: updatedDichVu }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate dịch vụ
    const hasInvalidService = formData.DichVu.some(
      (dv) => !dv.tenDichVu.trim() || dv.soLuong < 1
    );

    if (hasInvalidService) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ tên dịch vụ và số lượng hợp lệ!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return; // Dừng lại nếu dịch vụ không hợp lệ
    }

    try {
      await onSubmit(formData);
      onClose();
      toast({
        title: invoice ? "Cập nhật hóa đơn" : "Thêm hóa đơn thành công",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể lưu thông tin",
        status: "error",
        duration: 3000,
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
            {invoice ? "Chỉnh sửa hóa đơn" : "Tạo hóa đơn"}
            <Text fontSize="sm" color="gray.600">
              {formData.ThoiGianThanhToan}
            </Text>
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
                  <Input
                    name="MaKH"
                    value={formData.MaKH}
                    onChange={handleChange}
                  />
                </HStack>
              </FormControl>

              <FormControl isRequired>
                <HStack align="flex-start">
                  <FormLabel minW="14vw" pt={2}>
                    Dịch vụ
                  </FormLabel>
                  <VStack spacing={2} flex={1} align="stretch">
                    {formData.DichVu.map((dv, index) => (
                      <HStack key={index} spacing={3}>
                        <Input
                          placeholder="Tên dịch vụ"
                          value={dv.tenDichVu}
                          onChange={(e) =>
                            handleServiceChange(index, "tenDichVu", e.target.value)
                          }
                        />
                        <Input
                          placeholder="Số lượng"
                          type="number"
                          min={1}
                          maxW="100px"
                          value={dv.soLuong}
                          onChange={(e) =>
                            handleServiceChange(index, "soLuong", e.target.value)
                          }
                        />
                        {formData.DichVu.length > 1 && (
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
                  <FormLabel minW="14vw">Giá tiền</FormLabel>
                  <Input
                    name="GiaTien"
                    value={formData.GiaTien}
                    onChange={handleChange}
                  />
                </HStack>
              </FormControl>
              <FormControl>
                <HStack>
                  <FormLabel minW="14vw">Chiết khấu</FormLabel>
                  <Input
                    name="ChietKhau"
                    value={formData.ChietKhau}
                    onChange={handleChange}
                  />
                </HStack>
              </FormControl>
              <FormControl>
                <HStack>
                  <FormLabel minW="14vw">Tổng tiền</FormLabel>
                  <Input name="TongTien" value={formData.TongTien} isReadOnly />
                </HStack>
              </FormControl>
              <FormControl>
                <HStack>
                  <FormLabel minW="14vw">Nội dung</FormLabel>
                  <Input
                    name="NoiDung"
                    value={formData.NoiDung}
                    onChange={handleChange}
                  />
                </HStack>
              </FormControl>

              {/* Chọn trạng thái thanh toán */}
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

              {/* Chọn trạng thái hoàn tiền */}
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
              Huỷ
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

InvoiceFormDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  invoice: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default InvoiceFormDrawer;
