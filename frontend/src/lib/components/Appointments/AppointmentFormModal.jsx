import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Grid,
  GridItem,
  useToast,
  Select,
} from "@chakra-ui/react";
import PropTypes from 'prop-types';

const AppointmentFormModal = ({ isOpen, onClose, appointment, onSubmit }) => {
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
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {appointment ? "Chỉnh sửa lịch hẹn" : "Thêm lịch hẹn mới"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Tên khách hàng</FormLabel>
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
                    <FormLabel>Số điện thoại</FormLabel>
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
                    <FormLabel>Ngày hẹn</FormLabel>
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
                    <FormLabel>Giờ hẹn</FormLabel>
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
                    <FormLabel>Loại dịch vụ</FormLabel>
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
                    <FormLabel>Trạng thái</FormLabel>
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
              <Button type="submit" colorScheme="blue" w="full">
                {appointment ? "Cập nhật" : "Thêm mới"}
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

AppointmentFormModal.propTypes = {
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

export default AppointmentFormModal; 