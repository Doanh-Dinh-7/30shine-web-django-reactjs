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
import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const RefundDrawer = ({ isOpen, onClose, invoice, setInvoices }) => {
  const [lyDoKhachH, setLyDoKhachH] = useState("");
  const [ghiChu, setGhiChu] = useState("");
  const toast = useToast();

  const handleSubmitRefund = async () => {
    if (!lyDoKhachH.trim()) {
      toast({
        title: "Vui lòng nhập lý do yêu cầu hoàn tiền",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      // Gửi PATCH request để cập nhật TrangThaiHT và LyDoKhachH
      await axios.patch(`http://127.0.0.1:8000/api/hoa-don/${invoice.MaHD}/`, {
        TrangThaiHT: 1,
        LyDoKhachH: lyDoKhachH,
      });
      // Cập nhật frontend
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.MaHD === invoice.MaHD
            ? { ...inv, TrangThaiHT: 1, LyDoKhachH: lyDoKhachH }
            : inv
        )
      );
      toast({
        title: "Yêu cầu hoàn tiền đã được gửi",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      setLyDoKhachH("");
      setGhiChu("");
    } catch (err) {
      toast({
        title: "Lỗi",
        description: "Không thể gửi yêu cầu hoàn tiền.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader color="pink.500">Yêu cầu hoàn tiền</DrawerHeader>
        <DrawerBody>
          <VStack spacing={4} align="start">
            <Text fontSize="sm">{new Date().toLocaleString()}</Text>
            <Text fontWeight="bold" mt={4}>
              Hóa đơn: {invoice?.MaHD}
            </Text>
            <Text>Lý do yêu cầu:</Text>
            <Input
              placeholder="Nhập lý do"
              value={lyDoKhachH}
              onChange={(e) => setLyDoKhachH(e.target.value)}
            />
            <Text>Ghi chú:</Text>
            <Input
              placeholder="Ghi chú thêm nếu có"
              value={ghiChu}
              onChange={(e) => setGhiChu(e.target.value)}
            />
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <Button mr={3} onClick={onClose}>
            Hủy
          </Button>
          <Button colorScheme="blue" onClick={handleSubmitRefund}>
            OK
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default RefundDrawer;