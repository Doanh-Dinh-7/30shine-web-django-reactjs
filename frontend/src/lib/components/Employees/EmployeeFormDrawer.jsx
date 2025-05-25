import React, { useState, useEffect } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Box,
  useToast,
} from "@chakra-ui/react";

const EmployeeFormDrawer = ({ isOpen, onClose, employee, onSubmit }) => {
  const [formData, setFormData] = useState({
    MaNV: "",
    HoTenNV: "",
    GioiTinh: "",
    DiaChi: "",
    SDT: "",
    Email: "",
    ChucVu: "",
  });

  const toast = useToast();

  useEffect(() => {
    if (employee) {
      setFormData({
        MaNV: employee.MaNV || "",
        HoTenNV: employee.HoTenNV || "",
        GioiTinh: employee.GioiTinh === 0 ? "Nam" : "Nữ",
        DiaChi: employee.DiaChi || "",
        SDT: employee.SDT || "",
        Email: employee.Email || "",
        ChucVu: employee.ChucVu || "",
      });
      
    } else {
      setFormData({
        MaNV: "",
        HoTenNV: "",
        GioiTinh: "",
        DiaChi: "",
        SDT: "",
        Email: "",
        ChucVu: "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        GioiTinh: formData.GioiTinh === "Nam" ? 0 : 1,
      };
      await onSubmit(submitData);
      onClose();
      toast({
        title: employee ? "Cập nhật thành công" : "Thêm nhân viên thành công",
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
        <DrawerCloseButton />
        <Box bg="blue.50" p={4}>
          <DrawerHeader p={0} fontSize="xl" fontWeight="semibold">
            {employee ? "Cập nhật nhân viên" : "Thêm nhân viên"}
          </DrawerHeader>
        </Box>

        <form onSubmit={handleSubmit}>
          <DrawerBody>
            <VStack spacing={5} mt={4}>
              <FormControl isRequired>
                <FormLabel fontWeight="bold">Họ và tên :</FormLabel>
                <Input
                  name="HoTenNV"
                  value={formData.HoTenNV}
                  onChange={handleChange}
                  placeholder="Nhập họ tên nhân viên"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="bold">Giới tính:</FormLabel>
                <Select
                  name="GioiTinh"
                  value={formData.GioiTinh}
                  onChange={handleChange}
                >
                  <option value="">-- Chọn giới tính --</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="bold">Địa chỉ:</FormLabel>
                <Input
                  name="DiaChi"
                  value={formData.DiaChi}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="bold">Số điện thoại :</FormLabel>
                <Input
                  name="SDT"
                  value={formData.SDT}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="bold">Email:</FormLabel>
                <Input
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  placeholder="Nhập email"
                />
              </FormControl>

              <FormControl>
                <FormLabel fontWeight="bold">Chức vụ:</FormLabel>
                <Input
                  name="ChucVu"
                  value={formData.ChucVu}
                  onChange={handleChange}
                  placeholder="Nhập chức vụ"
                />
              </FormControl>
            </VStack>
          </DrawerBody>

          <DrawerFooter bg="blue.50" justifyContent="flex-end">
            <Button variant="outline" mr={3} onClick={onClose}>
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

export default EmployeeFormDrawer;
