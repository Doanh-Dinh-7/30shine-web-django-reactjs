import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  Box,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import PropTypes from "prop-types";
import InvoicePrintView from "./InvoicePrintView";

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

const trangThaiTTLabels = {
  0: "Chưa thanh toán",
  1: "Đã thanh toán",
  2: "Đã đánh giá",
};

const trangThaiHTLabels = {
  0: "Chưa hoàn",
  1: "Đã yêu cầu hoàn",
  2: "Đã hoàn",
  3: "Đã từ chối",
};

const InvoiceViewDrawer = ({ isOpen, onClose, invoice }) => {
  const [isPrintOpen, setIsPrintOpen] = useState(false);

  if (!invoice) return null;

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" size="md" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <Box bg="blue.50" px={6} py={4}>
            <DrawerHeader p={0} fontWeight="bold">
              Chi tiết hóa đơn: {invoice.MaHD}
              <Text fontSize="sm" color="gray.600">
                {formatDateTime(invoice.NgayLapHD)}
              </Text>
            </DrawerHeader>
          </Box>
          <DrawerCloseButton />

          <DrawerBody p={6}>
            <VStack spacing={4} align="stretch">
              <Box>
                <Text fontWeight="bold">Thông tin khách hàng</Text>
                <Text>Mã khách hàng: {invoice.MaKH || "-"}</Text>
                <Text>Họ tên: {invoice.HoTenKH || "-"}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Chi tiết dịch vụ</Text>
                {invoice.chi_tiet && invoice.chi_tiet.length > 0 ? (
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Tên dịch vụ</Th>
                        <Th>Số lượng</Th>
                        <Th>Thành tiền</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {invoice.chi_tiet.map((dv, index) => (
                        <Tr key={index}>
                          <Td>{dv.TenDV || "-"}</Td>
                          <Td>{dv.SoLuong || 0}</Td>
                          <Td>{dv.ThanhTien ? Number(dv.ThanhTien).toLocaleString() : "-"} VND</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                ) : (
                  <Text>Không có dịch vụ</Text>
                )}
              </Box>

              <Box>
                <Text fontWeight="bold">Tổng tiền: {invoice.TongTien ? Number(invoice.TongTien).toLocaleString() : "-"} VND</Text>
                <Text>Trạng thái thanh toán: {trangThaiTTLabels[invoice.TrangThaiTT] || "N/A"}</Text>
                <Text>Trạng thái hoàn tiền: {trangThaiHTLabels[invoice.TrangThaiHT] || "N/A"}</Text>
                <Text>Ghi chú: {invoice.GhiChu || "-"}</Text>
                <Text>Lý do khách hàng: {invoice.LyDoKhachH || "-"}</Text>
                <Text>Lý do quản lý: {invoice.LyDoQly || "-"}</Text>
              </Box>
            </VStack>
          </DrawerBody>

          <DrawerFooter bg="blue.50" justifyContent="flex-end" gap={2}>
            <Button variant="outline" onClick={onClose}>
              Đóng
            </Button>
            <Button colorScheme="blue" onClick={() => setIsPrintOpen(true)}>
              In hóa đơn
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {invoice && (
        <Drawer
          isOpen={isPrintOpen}
          onClose={() => setIsPrintOpen(false)}
          placement="right"
          size="md"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Xuất hóa đơn - {invoice.MaHD}</DrawerHeader>
            <DrawerCloseButton />
            <DrawerBody>
              <InvoicePrintView invoice={invoice} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

InvoiceViewDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  invoice: PropTypes.object.isRequired,
};

export default InvoiceViewDrawer;