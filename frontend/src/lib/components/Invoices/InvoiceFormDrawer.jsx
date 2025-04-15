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
  Button,
  Text,
  VStack,
  useToast,
  Box,
  HStack
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const InvoiceFormDrawer = ({ isOpen, onClose, invoice, onSubmit }) => {
  const formatDateTime = (date) => {
    const hh = date.getHours().toString().padStart(2, '0');
    const mm = date.getMinutes().toString().padStart(2, '0');
    const dd = date.getDate().toString().padStart(2, '0');
    const MM = (date.getMonth() + 1).toString().padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${hh}:${mm} ${dd}/${MM}/${yyyy}`;
  };
  
  
  const [formData, setFormData] = useState({
    MaHD: "",
    MaKH: "",
    HoTenKH: "",
    GiaTien: "",
    ChietKhau: "",
    TongTien: "",
    NoiDung: "",
    TrangThaiTT: "",
    TrangThaiHT: "",
    ThoiGianThanhToan: new Date()
  });

  const toast = useToast();

  useEffect(() => {
    if (invoice) {
      setFormData({
        ...invoice,
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
        TrangThaiTT: "chưa thanh toán",
        TrangThaiHT: "chưa hoàn",
        ThoiGianThanhToan: formatDateTime(new Date())
      });
    }
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      TongTien:
        name === "GiaTien" || name === "ChietKhau"
          ? `${
              parseFloat(name === "GiaTien" ? value : prev.GiaTien || 0) -
              parseFloat(name === "ChietKhau" ? value : prev.ChietKhau || 0)
            }`
          : prev.TongTien
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await onSubmit(formData);
      onClose();
      toast({
        title: invoice ? "Cập nhật hóa đơn" : "Thêm hóa đơn thành công",
        status: "success",
        duration: 3000,
        isClosable: true
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
          <DrawerBody py={6}>
            <VStack spacing={5} align="stretch">
              <FormControl isRequired>
                <HStack>
                  <FormLabel minW="14vw">Họ và tên khách hàng</FormLabel>
                  <Input name="HoTenKH" value={formData.HoTenKH} onChange={handleChange} />
                </HStack>
              </FormControl>
              <FormControl isRequired>
                <HStack>
                  <FormLabel minW="14vw">Mã khách hàng</FormLabel>
                  <Input name="MaKH" value={formData.MaKH} onChange={handleChange} />
                </HStack>
              </FormControl>
              <FormControl isRequired>
                <HStack>
                  <FormLabel minW="14vw">Giá tiền</FormLabel>
                  <Input name="GiaTien" value={formData.GiaTien} onChange={handleChange} />
                </HStack>
              </FormControl>
              <FormControl>
                <HStack>
                  <FormLabel minW="14vw">Chiết khấu</FormLabel>
                  <Input name="ChietKhau" value={formData.ChietKhau} onChange={handleChange} />
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
                  <Input name="NoiDung" value={formData.NoiDung} onChange={handleChange} />
                </HStack>
              </FormControl>
            </VStack>
          </DrawerBody>

          <DrawerFooter bg="blue.50" justifyContent="flex-end" gap={2}>
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
  onSubmit: PropTypes.func.isRequired
};

export default InvoiceFormDrawer;
