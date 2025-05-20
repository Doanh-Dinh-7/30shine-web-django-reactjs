import {
  Box,
  VStack,
  Text,
  HStack,
  Button,
  Divider,
  Image,
} from "@chakra-ui/react";

const formatDateTime = (isoString) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  if (isNaN(date)) return "-";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const InvoicePrintView = ({ invoice }) => {
  if (!invoice) return null;

  const services = invoice.chi_tiet || [];

  return (
    <Box className="print-area">
      <Box px={6} py={4} borderWidth={1} borderRadius="lg" bg="white" boxShadow="md">
        {/* Thêm logo ở phía trên */}
        <Box textAlign="center" mb={4}>
          <Image
            src="/logo_30shine.png"
            alt="30Shine Logo"
            maxWidth="150px"
            objectFit="contain"
          />
        </Box>

        {/* Tiêu đề hóa đơn */}
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={6}>
          Hóa đơn - {invoice.MaHD || "-"}
        </Text>

        <VStack spacing={4} align="start">
          <HStack w="full" justifyContent="space-between">
            <Text fontWeight="semibold">Mã khách hàng:</Text>
            <Text>{invoice.MaKH || "-"}</Text>
          </HStack>

          <HStack w="full" justifyContent="space-between">
            <Text fontWeight="semibold">Tên khách hàng:</Text>
            <Text>{invoice.HoTenKH || "-"}</Text>
          </HStack>

          <HStack w="full" justifyContent="space-between">
            <Text fontWeight="semibold">Ngày lập hóa đơn:</Text>
            <Text>{formatDateTime(invoice.NgayLapHD)}</Text>
          </HStack>

          {invoice.GhiChu && (
            <HStack w="full" justifyContent="space-between">
              <Text fontWeight="semibold">Ghi chú:</Text>
              <Text>{invoice.GhiChu}</Text>
            </HStack>
          )}

          {invoice.LyDoKhachH && (
            <HStack w="full" justifyContent="space-between">
              <Text fontWeight="semibold">Lý do khách hàng:</Text>
              <Text>{invoice.LyDoKhachH}</Text>
            </HStack>
          )}

          {invoice.LyDoQly && (
            <HStack w="full" justifyContent="space-between">
              <Text fontWeight="semibold">Lý do quản lý:</Text>
              <Text>{invoice.LyDoQly}</Text>
            </HStack>
          )}

          <Divider />

          {services.length > 0 ? (
            <>
              <Text fontWeight="semibold">Chi tiết dịch vụ:</Text>
              {services.map((dv, index) => (
                <HStack key={index} w="full" justifyContent="space-between">
                  <Text>{dv.TenDV || "-"}</Text>
                  <Text>Số lượng: {dv.SoLuong || 0}</Text>
                  <Text>Thành tiền: {dv.ThanhTien ? Number(dv.ThanhTien).toLocaleString() : "-"} VND</Text>
                </HStack>
              ))}
              <Divider />
            </>
          ) : (
            <Text>Không có dịch vụ nào.</Text>
          )}

          <HStack w="full" justifyContent="space-between">
            <Text fontWeight="bold">Tổng tiền:</Text>
            <Text fontWeight="bold">{invoice.TongTien ? Number(invoice.TongTien).toLocaleString() : "-"} VND</Text>
          </HStack>
        </VStack>
      </Box>

      <Box mt={8} textAlign="right" className="no-print">
        <Button colorScheme="blue" onClick={() => window.print()}>
          Xuất hóa đơn
        </Button>
      </Box>
    </Box>
  );
};

export default InvoicePrintView;