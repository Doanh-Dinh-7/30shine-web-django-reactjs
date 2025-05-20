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
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";

const PaymentDrawer = ({ isOpen, onClose, invoice, onConfirmPayment }) => {
  const [isQrVisible, setIsQrVisible] = useState(false);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader color="#00cc66">Thanh toán hóa đơn</DrawerHeader>
        <DrawerBody>
          {!isQrVisible ? (
            <VStack spacing={4} align="start">
              <Text fontSize="sm">{new Date().toLocaleString()}</Text>
              <Text fontWeight="bold" mt={4}>
                Hóa đơn: {invoice?.MaHD}
              </Text>
              <Text>Tên khách hàng: {invoice?.HoTenKH}</Text>
              <Box>
                <Text fontWeight="semibold">Dịch vụ:</Text>
                {invoice?.chi_tiet?.map((dv, idx) => (
                  <Text key={idx}>
                    - {dv.TenDV} (Số lượng: {dv.SoLuong})
                  </Text>
                ))}
              </Box>
              <Text fontWeight="bold">
                Tổng tiền: {invoice?.TongTien ? Number(invoice.TongTien).toLocaleString() : 0} VND
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
          {!isQrVisible ? (
            <>
              <Button mr={3} onClick={onClose}>
                Hủy
              </Button>
              <Button colorScheme="blue" onClick={() => setIsQrVisible(true)}>
                OK
              </Button>
            </>
          ) : (
            <Button
              colorScheme="blue"
              onClick={() => {
                onConfirmPayment(invoice); // Cập nhật TrangThaiTT
                onClose(); // Đóng drawer
              }}
            >
              OK
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PaymentDrawer;