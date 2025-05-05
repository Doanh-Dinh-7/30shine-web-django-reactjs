import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Text,
  Input,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const RefundDrawer = ({ isOpen, onClose, invoice }) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader color="pink.500">Yêu cầu hoàn tiền</DrawerHeader>
        <DrawerBody>
          <VStack spacing={4} align="start">
            <Text fontSize="sm">{new Date().toLocaleString()}</Text>
            <Text fontWeight="bold" mt={4}>Hóa đơn</Text>
            <Text>Lý do yêu cầu:</Text>
            <Input placeholder="Nhập lý do" />
            <Text>Số tiền mong muốn:</Text>
            <Input placeholder="Nhập số tiền hoàn" />
            <Text>Ghi chú:</Text>
            <Input placeholder="Ghi chú thêm nếu có" />
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <Button mr={3} onClick={onClose}>
            Hủy
          </Button>
          <Button colorScheme="blue" onClick={onClose}>
            OK
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default RefundDrawer;
