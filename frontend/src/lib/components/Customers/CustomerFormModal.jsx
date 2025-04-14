import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const CustomerFormModal = ({ isOpen, onClose, customer, onSubmit }) => {
  const [formData, setFormData] = useState({
    MaKH: "",
    HoTenKH: "",
    SDT: "",
    Email: "",
  });

  const toast = useToast();

  useEffect(() => {
    if (customer) {
      setFormData({
        MaKH: customer.MaKH || "",
        HoTenKH: customer.HoTenKH || "",
        SDT: customer.SDT || "",
        Email: customer.Email || "",
      });
    } else {
      setFormData({
        MaKH: "Mới",
        HoTenKH: "",
        SDT: "",
        Email: "",
      });
    }
  }, [customer]);

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
        description: customer
          ? "Cập nhật khách hàng thành công"
          : "Thêm khách hàng thành công",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
      toast({
        title: "Lỗi",
        description: customer
          ? "Không thể cập nhật khách hàng"
          : "Không thể thêm khách hàng",
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
        <ModalHeader color="gray.700">
          {customer ? "Chỉnh sửa khách hàng" : "Thêm khách hàng mới"}
        </ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <VStack spacing={4}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color="gray.600">Tên khách hàng</FormLabel>
                    <Input
                      name="HoTenKH"
                      placeholder="Nhập tên khách hàng"
                      value={formData.HoTenKH}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color="gray.600">Số điện thoại</FormLabel>
                    <Input
                      name="SDT"
                      placeholder="Nhập số điện thoại"
                      value={formData.SDT}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel color="gray.600">Email</FormLabel>
                    <Input
                      name="Email"
                      placeholder="Nhập email"
                      value={formData.Email}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
            </VStack>
          </ModalBody>
          <ModalFooter gap={2}>
            <Button variant="ghost" onClick={onClose}>
              Huỷ
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
            >
              {customer ? "Cập nhật" : "Thêm mới"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

CustomerFormModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  customer: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default CustomerFormModal;
