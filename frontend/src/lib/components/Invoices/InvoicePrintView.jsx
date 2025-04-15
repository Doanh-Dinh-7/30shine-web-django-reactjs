import {
    Box,
    VStack,
    Text,
    HStack,
    Button,
    Divider
  } from "@chakra-ui/react";
  
  const InvoicePrintView = ({ invoice }) => {
    return (
      <Box px={6} py={4} borderWidth={1} borderRadius="lg" bg="white" boxShadow="md">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={6}>
          Hóa đơn
        </Text>
  
        <VStack spacing={4} align="start">
          <HStack w="full" justifyContent="space-between">
            <Text fontWeight="semibold">Tên khách hàng:</Text>
            <Text>{invoice.HoTenKH || "-"}</Text>
          </HStack>
          <HStack w="full" justifyContent="space-between">
            <Text fontWeight="semibold">Sử dụng dịch vụ:</Text>
            <Text>{invoice.NoiDung || "-"}</Text>
          </HStack>
          <HStack w="full" justifyContent="space-between">
            <Text fontWeight="semibold">Giá tiền:</Text>
            <Text>{invoice.GiaTien} VND</Text>
          </HStack>
          <HStack w="full" justifyContent="space-between">
            <Text fontWeight="semibold">Chiết khấu:</Text>
            <Text>{invoice.ChietKhau || 0} VND</Text>
          </HStack>
  
          <Divider />
  
          <HStack w="full" justifyContent="space-between">
            <Text fontWeight="bold">Tổng tiền:</Text>
            <Text fontWeight="bold">{invoice.TongTien} VND</Text>
          </HStack>
        </VStack>
  
        <Box mt={8} textAlign="right">
          <Button colorScheme="blue">Xuất</Button>
        </Box>
      </Box>
    );
  };
  
  export default InvoicePrintView;
  