import { useState, useEffect } from "react";
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
  Checkbox,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const EmployeeFormDrawer = ({ isOpen, onClose, employee, onSubmit }) => {
  const [formData, setFormData] = useState({
    MaNV: "",
    HoTenNV: "",
    GioiTinh: "",
    DiaChi: "",
    SDT: "",
    Email: "",
    ChucVu: "",
    username: "",
    password: "",
    is_superuser: false,
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
        username: employee.user?.username || "",
        password: "",
        is_superuser: employee.user?.is_superuser || false,
      });
    } else {
      setFormData({
        MaNV: "",
        HoTenNV: "",
        GioiTinh: "",
        DiaChi: "",
        SDT: "",
        Email: "",
        username: "",
        password: "",
        is_superuser: false,
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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        MaNV: formData.MaNV,
        HoTenNV: formData.HoTenNV,
        GioiTinh:
          formData.GioiTinh === "Nam"
            ? 0
            : formData.GioiTinh === "Nữ"
            ? 1
            : null,
        DiaChi: formData.DiaChi,
        SDT: formData.SDT,
        Email: formData.Email,
        user: {
          username: formData.username,
          is_superuser: formData.is_superuser,
          ...(formData.password && { password: formData.password }),
          ...(employee?.user?.id && { id: employee.user.id }),
        },
      };

      await onSubmit(submitData);
      onClose();
    } catch (error) {
      console.error("Error in EmployeeFormDrawer handleSubmit:", error);
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
            <Box overflowY="auto" pr={4} maxH="calc(100vh - 200px)" minH="0">
              <VStack spacing={5} mt={4}>
                {employee && (
                  <FormControl>
                    <FormLabel fontWeight="bold">Mã nhân viên:</FormLabel>
                    <Input value={formData.MaNV} isReadOnly />
                  </FormControl>
                )}

                <FormControl isRequired>
                  <FormLabel fontWeight="bold">Username:</FormLabel>
                  <Input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Nhập username"
                  />
                </FormControl>

                {!employee && (
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold">Password:</FormLabel>
                    <Input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Nhập password"
                    />
                  </FormControl>
                )}

                <FormControl>
                  <FormLabel fontWeight="bold">Là Superuser:</FormLabel>
                  <Checkbox
                    name="is_superuser"
                    isChecked={formData.is_superuser}
                    onChange={handleCheckboxChange}
                  >
                    Có quyền quản trị cao nhất
                  </Checkbox>
                </FormControl>

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
                    placeholder="-- Chọn giới tính --"
                  >
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
              </VStack>
            </Box>
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

EmployeeFormDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  employee: PropTypes.shape({
    MaNV: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    HoTenNV: PropTypes.string,
    GioiTinh: PropTypes.number,
    DiaChi: PropTypes.string,
    SDT: PropTypes.string,
    Email: PropTypes.string,
    ChucVu: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      username: PropTypes.string,
      is_superuser: PropTypes.bool,
    }),
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default EmployeeFormDrawer;
