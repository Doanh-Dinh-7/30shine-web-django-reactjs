import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Button,
    Text,
    Image,
    VStack,
  } from "@chakra-ui/react";
  import React from "react";
  
  const PaymentDrawer = ({ isOpen, onClose, invoice, showQR, onConfirmPayment }) => {
    return (
      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader color="#00cc66">Thanh toán hóa đơn</DrawerHeader>
          <DrawerBody>
            {!showQR ? (
              <VStack spacing={4} align="start">
                <Text fontSize="sm">{new Date().toLocaleString()}</Text>
                <Text fontWeight="bold" mt={4}>Hóa đơn</Text>
                <Text>Tên khách hàng: Doanh</Text>
                <Text>Dịch vụ: {invoice?.DịchVu}</Text>
                <Text>
                  Giá tiền: {invoice?.TongTien?.toLocaleString() || 0} VND
                </Text>
                <Text>
                  Chiết khấu: {invoice?.ChietKhau?.toLocaleString() || 0} VND
                </Text>
                <Text fontWeight="bold">
                  Tổng tiền: {(invoice?.TongTien - invoice?.ChietKhau).toLocaleString()} VND
                </Text>
              </VStack>
            ) : (
              <VStack spacing={4} align="center">
                <Text fontSize="sm">{new Date().toLocaleString()}</Text>
                <Image src="/qrcode-placeholder.png" alt="QR Code" boxSize="200px" />
              </VStack>
            )}
          </DrawerBody>
          <DrawerFooter>
            {!showQR ? (
              <>
                <Button mr={3} onClick={onClose}>
                  Hủy
                </Button>
                <Button colorScheme="blue" onClick={onConfirmPayment}>
                  OK
                </Button>
              </>
            ) : (
              <Button colorScheme="blue" onClick={onClose}>
                OK
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  };
  
  export default PaymentDrawer;
  