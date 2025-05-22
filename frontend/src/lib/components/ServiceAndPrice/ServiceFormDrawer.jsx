import { useState, useEffect } from "react";
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
  InputGroup,
  InputLeftElement,
  Box,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { FiDollarSign } from "react-icons/fi";

const ServiceFormDrawer = ({ isOpen, onClose, service, onSubmit }) => {
  const [formData, setFormData] = useState({
    MaDV: "",
    TenDV: "",
    GiaTien: "",
    ChitietDV: "",
    ThoiGianLamDV: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const toast = useToast();

  useEffect(() => {
    if (service) {
      setFormData({
        MaDV: service.MaDV || "",
        TenDV: service.TenDV || "",
        GiaTien: service.GiaTien || "",
        ChitietDV: service.ChitietDV || "",
        ThoiGianLamDV: service.ThoiGianLamDV || "",
      });
      setSelectedFile(null);
    } else {
      setFormData({
        MaDV: "Mới",
        TenDV: "",
        GiaTien: "",
        ChitietDV: "",
        ThoiGianLamDV: "",
      });
      setSelectedFile(null);
    }
  }, [service]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData, selectedFile);
      onClose();
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
      toast({
        title: "Lỗi",
        description: service
          ? "Không thể cập nhật dịch vụ"
          : "Không thể thêm dịch vụ",
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
            {service ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}
          </DrawerHeader>
        </Box>

        <form onSubmit={handleSubmit}>
          <DrawerBody>
            <VStack spacing={5} mt={4}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold">Tên dịch vụ:</FormLabel>
                    <Input
                      name="TenDV"
                      value={formData.TenDV}
                      onChange={handleChange}
                      placeholder="Nhập tên dịch vụ"
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold">Giá dịch vụ:</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <FiDollarSign color="gray.300" />
                      </InputLeftElement>
                      <Input
                        name="GiaTien"
                        value={formData.GiaTien}
                        onChange={handleChange}
                        placeholder="Nhập giá dịch vụ"
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold">
                      Thời gian làm dịch vụ (phút):
                    </FormLabel>
                    <Input
                      name="ThoiGianLamDV"
                      value={formData.ThoiGianLamDV}
                      onChange={handleChange}
                      placeholder="Nhập thời gian dịch vụ"
                    />
                  </FormControl>
                </GridItem>
                {formData?.MaDV !== "Mới" && (
                  <GridItem>
                    <FormControl>
                      <FormLabel fontWeight="bold">Ảnh đại diện:</FormLabel>
                      <Input
                        type="file"
                        name="AnhDaiDien"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </FormControl>
                  </GridItem>
                )}
                <GridItem colSpan={2}>
                  <FormControl isRequired>
                    <FormLabel fontWeight="bold">Chi tiết dịch vụ:</FormLabel>
                    <Input
                      name="ChitietDV"
                      value={formData.ChitietDV}
                      onChange={handleChange}
                      placeholder="Nhập chi tiết dịch vụ"
                    />
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
              {service ? "Cập nhật" : "Thêm mới"}
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

ServiceFormDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  service: PropTypes.shape({
    MaDV: PropTypes.string,
    TenDV: PropTypes.string,
    GiaTien: PropTypes.string,
    ChitietDV: PropTypes.string,
    ThoiGianLamDV: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default ServiceFormDrawer;
