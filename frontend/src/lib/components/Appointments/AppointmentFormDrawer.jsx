import React, { useState } from "react";
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

const AppointmentFormDrawer = ({ isOpen, onClose, appointment, onSubmit, isManager }) => {
  const [formData, setFormData] = React.useState({
    TenKH: "",
    SDT: "",
    TGHen: "",
    GioKhachDen: "",
    LoaiDV: "",
    TrangThai: "Chờ hoàn thành",
  });

  const toast = useToast();
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (appointment) {
      setFormData({
        TenKH: appointment.TenKH || "",
        SDT: appointment.SDT || "",
        TGHen: appointment.TGHen || "",
        GioKhachDen: appointment.GioKhachDen || "",
        LoaiDV: appointment.LoaiDV || "",
        TrangThai: appointment.TrangThai || "Chờ hoàn thành",
      });
    } else {
      setFormData({
        TenKH: "",
        SDT: "",
        TGHen: "",
        GioKhachDen: "",
        LoaiDV: "",
        TrangThai: "Chờ hoàn thành",
      });
    }
  }, [appointment, isManager]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Validate ngày giờ
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const currentTime = now.toTimeString().slice(0, 5);
    if (formData.TGHen < todayStr) {
      setError("Ngày hẹn phải lớn hơn hoặc bằng ngày hiện tại.");
      return;
    }
    if (formData.TGHen === todayStr && formData.GioKhachDen <= currentTime) {
      setError("Giờ hẹn phải lớn hơn giờ hiện tại nếu chọn ngày hôm nay.");
      return;
    }
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
                {isManager && (
                  <GridItem colSpan={2}>
                    <FormControl isRequired>
                      <FormLabel fontWeight="bold">Mã khách hàng:</FormLabel>
                      <Input
                        name="MaKH"
                        value={formData.MaKH || ""}
                        onChange={handleChange}
                        placeholder="Nhập mã khách hàng (ví dụ: KH001)"
                      />
                    </FormControl>
                  </GridItem>
                )}
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
                    {(!appointment) ? (
                      <Input
                        name="TrangThai"
                        value="Chờ hoàn thành"
                        readOnly
                        bg="gray.100"
                      />
                    ) : isManager ? (
                      <Select
                        name="TrangThai"
                        value={formData.TrangThai}
                        onChange={handleChange}
                      >
                        <option value="Chờ hoàn thành">Chờ hoàn thành</option>
                        <option value="Đã hoàn thành">Đã hoàn thành</option>
                      </Select>
                    ) : (
                      <Input
                        name="TrangThai"
                        value={"Chờ hoàn thành"}
                        readOnly
                        bg="gray.100"
                      />
                    )}
                  </FormControl>
                </GridItem>
              </Grid>
            </VStack>
            {error && <Box color="red.500" mt={2}>{error}</Box>}
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
  isManager: PropTypes.bool,
};

export default AppointmentFormDrawer; 