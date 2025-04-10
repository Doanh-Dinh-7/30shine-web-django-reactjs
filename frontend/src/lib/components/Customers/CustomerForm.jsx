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
  Select,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const CustomerForm = ({ isOpen, onClose, customer, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý submit form
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
                      placeholder="Nhập tên khách hàng"
                      defaultValue={customer?.HoTenKH}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel color="gray.600">Số điện thoại</FormLabel>
                    <Input
                      placeholder="Nhập số điện thoại"
                      defaultValue={customer?.SDT}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel color="gray.600">Email</FormLabel>
                    <Input
                      placeholder="Nhập email"
                      defaultValue={customer?.Email}
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
              bg="#2A4365"
              color="white"
              _hover={{ bg: "#1A365D" }}
            >
              {customer ? "Cập nhật" : "Thêm mới"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

CustomerForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  customer: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default CustomerForm;
