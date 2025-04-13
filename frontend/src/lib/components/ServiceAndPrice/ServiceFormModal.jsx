import React, { useState, useEffect } from "react";
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
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FiDollarSign } from "react-icons/fi";

const ServiceFormModal = ({ isOpen, onClose, service, onSubmit }) => {
  const [formData, setFormData] = useState({
    MaDV: "",
    TenDV: "",
    GiaDV: "",
    ChitietDV: "",
  });

  const toast = useToast();

  useEffect(() => {
    if (service) {
      setFormData({
        MaDV: service.MaDV || "",
        TenDV: service.TenDV || "",
        GiaDV: service.GiaDV || "",
        ChitietDV: service.ChitietDV || "",
      });
    } else {
      setFormData({
        MaDV: "",
        TenDV: "",
        GiaDV: "",
        ChitietDV: "",
      });
    }
  }, [service]);

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
        description: service
          ? "Cập nhật dịch vụ thành công"
          : "Thêm dịch vụ thành công",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
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
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {service ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Mã dịch vụ</FormLabel>
                    <Input
                      name="MaDV"
                      value={formData.MaDV}
                      onChange={handleChange}
                      placeholder="Nhập mã dịch vụ"
                      isReadOnly={!!service}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Tên dịch vụ</FormLabel>
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
                    <FormLabel>Giá dịch vụ</FormLabel>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<FiDollarSign color="gray.300" />}
                      />
                      <Input
                        name="GiaDV"
                        type="number"
                        value={formData.GiaDV}
                        onChange={handleChange}
                        placeholder="Nhập giá dịch vụ"
                      />
                    </InputGroup>
                  </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                  <FormControl isRequired>
                    <FormLabel>Chi tiết dịch vụ</FormLabel>
                    <Input
                      name="ChitietDV"
                      value={formData.ChitietDV}
                      onChange={handleChange}
                      placeholder="Nhập chi tiết dịch vụ"
                    />
                  </FormControl>
                </GridItem>
              </Grid>
              <Button type="submit" colorScheme="blue" w="full">
                {service ? "Cập nhật" : "Thêm mới"}
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ServiceFormModal; 