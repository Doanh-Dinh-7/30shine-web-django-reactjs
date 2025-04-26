import React from "react";
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
  VStack,
  Grid,
  GridItem,
  useToast,
  Select,
  Box,
} from "@chakra-ui/react";
import PropTypes from 'prop-types';

const AppointmentFormDrawer = ({ isOpen, onClose, appointment, onSubmit }) => {
  const [formData, setFormData] = React.useState({
    TenKH: "",
    SDT: "",
    TGHen: "",
    GioKhachDen: "",
    LoaiDV: "",
    TrangThai: "Chờ xác nhận",
  });

  const toast = useToast();

  React.useEffect(() => {
    if (appointment) {
      setFormData({
        TenKH: appointment.TenKH || "",
        SDT: appointment.SDT || "",
        TGHen: appointment.TGHen || "",
        GioKhachDen: appointment.GioKhachDen || "",
        LoaiDV: appointment.LoaiDV || "",
        TrangThai: appointment.TrangThai || "Chờ xác nhận",
      });
    } else {
      setFormData({
        TenKH: "",
        SDT: "",
        TGHen: "",
        GioKhachDen: "",
        LoaiDV: "",
        TrangThai: "Chờ xác nhận",
      });
    }
  }, [appointment]);

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
      await onSubmit(formData);
      onClose();
      toast({
        title: "Thành công",
        description: appointment
          ? "Cập nhật lịch hẹn thành công"
          : "Thêm lịch hẹn thành công",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
      toast({
        title: "Lỗi",
        description: appointment
          ? "Không thể cập nhật lịch hẹn"
          : "Không thể thêm lịch hẹn",
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
            {appointment ? "Cập nhật lịch hẹn" : "Thêm lịch hẹn mới"}
          </DrawerHeader>
        </Box>

        <form onSubmit={handleSubmit}>
          <DrawerBody>
            <VStack spacing={5} mt={4}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold">Tên khách hàng:</FormLabel>
                    <Input
                      name="TenKH"
                      value={formData.TenKH}
                      onChange={handleChange}
                      placeholder="Nhập tên khách hàng"
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold">Số điện thoại:</FormLabel>
                    <Input
                      name="SDT"
                      value={formData.SDT}
                      onChange={handleChange}
                      placeholder="Nhập số điện thoại"
                      type="tel"
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold">Ngày hẹn:</FormLabel>
                    <Input
                      name="TGHen"
                      type="date"
                      value={formData.TGHen}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold">Giờ hẹn:</FormLabel>
                    <Input
                      name="GioKhachDen"
                      type="time"
                      value={formData.GioKhachDen}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold">Loại dịch vụ:</FormLabel>
                    <Select
                      name="LoaiDV"
                      value={formData.LoaiDV}
                      onChange={handleChange}
                      placeholder="Chọn loại dịch vụ"
                    >
                      <option value="Cắt tóc nam">Cắt tóc nam</option>
                      <option value="Nhuộm tóc">Nhuộm tóc</option>
                      <option value="Uốn tóc">Uốn tóc</option>
                      <option value="Gội đầu">Gội đầu</option>
                      <option value="Combo cắt gội">Combo cắt gội</option>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold">Trạng thái:</FormLabel>
                    <Select
                      name="TrangThai"
                      value={formData.TrangThai}
                      onChange={handleChange}
                    >
                      <option value="Chờ xác nhận">Chờ xác nhận</option>
                      <option value="Đã xác nhận">Đã xác nhận</option>
                      <option value="Đã hoàn thành">Đã hoàn thành</option>
                      <option value="Đã hủy">Đã hủy</option>
                    </Select>
                  </FormControl>
                </GridItem>
              </Grid>
            </VStack>
          </DrawerBody>

          <DrawerFooter bg="blue.50" justifyContent="flex-end">
            <Button variant="outline" mr={3} onClick={onClose}>
              Huỷ
            </Button>
            <Button type="submit" colorScheme="blue">
              {appointment ? "Cập nhật" : "Thêm mới"}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

AppointmentFormDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  appointment: PropTypes.shape({
    TenKH: PropTypes.string,
    SDT: PropTypes.string,
    TGHen: PropTypes.string,
    GioKhachDen: PropTypes.string,
    LoaiDV: PropTypes.string,
    TrangThai: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default AppointmentFormDrawer; 