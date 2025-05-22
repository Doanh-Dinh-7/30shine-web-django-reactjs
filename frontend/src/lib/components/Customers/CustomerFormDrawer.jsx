import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Grid,
  GridItem,
  useToast,
  Box,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const CustomerFormDrawer = ({ isOpen, onClose, customer, onSubmit }) => {
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
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <Box bg="blue.50" px={6} py={4}>
          <DrawerHeader p={0} color="black" fontWeight="semibold">
            Thông tin cá nhân khách hàng:{" "}
            <Text as="span" fontWeight="normal">
              {formData.MaKH}
            </Text>
          </DrawerHeader>
        </Box>
        <DrawerCloseButton />

        <form onSubmit={handleSubmit}>
          <DrawerBody py={6}>
            <VStack spacing={4}>
              <Grid templateColumns="repeat(1, 1fr)" gap={4} w="full">
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Họ và tên :</FormLabel>
                    <Input
                      name="HoTenKH"
                      value={formData.HoTenKH}
                      onChange={handleChange}
                      placeholder="Nhập tên khách hàng"
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Email:</FormLabel>
                    <Input
                      name="Email"
                      value={formData.Email}
                      onChange={handleChange}
                      placeholder="Nhập email"
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Số điện thoại :</FormLabel>
                    <Input
                      name="SDT"
                      value={formData.SDT}
                      onChange={handleChange}
                      placeholder="Nhập số điện thoại"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
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

CustomerFormDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  customer: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default CustomerFormDrawer;
