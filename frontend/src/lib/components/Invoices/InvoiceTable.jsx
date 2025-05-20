import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import { FaDotCircle } from "react-icons/fa";
import "../../../assets/styles/paginate.css";
import { useState } from "react";

const trangThaiTTMap = {
  0: "Chưa thanh toán",
  1: "Đã thanh toán",
  2: "Đã đánh giá",
};

const trangThaiHTMap = {
  0: "Chưa hoàn",
  1: "Đã yêu cầu hoàn",
  2: "Đã hoàn",
  3: "Đã từ chối",
};

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

const InvoiceTable = ({
  invoices,
  onEditInvoice,
  onDeleteInvoice,
  onPrintInvoice,
  onViewInvoice,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const pageCount = Math.ceil(invoices.length / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;

  // Hàm so sánh thời gian (gần nhất lên trên)
  const compareDate = (a, b) => {
    const dateA = new Date(a.NgayLapHD);
    const dateB = new Date(b.NgayLapHD);
    return dateB - dateA; // Sắp xếp giảm dần (gần nhất lên trên)
  };

  // Sắp xếp hóa đơn: Chưa thanh toán lên trên, sau đó sắp xếp theo thời gian
  const sortedInvoices = [...invoices].sort((a, b) => {
    // Đẩy chưa thanh toán (0) lên trên
    if (a.TrangThaiTT === 0 && b.TrangThaiTT !== 0) return -1;
    if (a.TrangThaiTT !== 0 && b.TrangThaiTT === 0) return 1;
    // Nếu cùng trạng thái thanh toán, sắp xếp theo thời gian
    return compareDate(a, b);
  });

  const paginatedInvoices = sortedInvoices.slice(startIndex, endIndex);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <Box>
      <Table bg="white" borderRadius="lg">
        <Thead bg="gray.100">
          <Tr>
            <Th>Mã hóa đơn</Th>
            <Th>Mã khách hàng</Th>
            <Th>Tổng tiền</Th>
            <Th>Thời gian lập</Th>
            <Th>Trạng thái</Th>
            <Th>Thao tác</Th>
            <Th>Yêu cầu hoàn tiền</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedInvoices.map((invoice) => {
            const trangThaiTTText = trangThaiTTMap[invoice.TrangThaiTT] || "Không xác định";
            const trangThaiHTText = trangThaiHTMap[invoice.TrangThaiHT] || "Không xác định";
            let ttColor = "red.500";
            if (invoice.TrangThaiTT === 1) ttColor = "green.500";
            else if (invoice.TrangThaiTT === 2) ttColor = "blue.500";

            return (
              <Tr key={invoice.MaHD} _hover={{ bg: "gray.50" }}>
                <Td>{invoice.MaHD}</Td>
                <Td>{invoice.MaKH}</Td>
                <Td fontWeight="bold">{Number(invoice.TongTien).toLocaleString()} VND</Td>
                <Td>{formatDateTime(invoice.NgayLapHD)}</Td>
                <Td color={ttColor} fontWeight="medium">{trangThaiTTText}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      icon={<FiEye />}
                      variant="ghost"
                      colorScheme="teal"
                      aria-label="Xem chi tiết"
                      onClick={() => onViewInvoice(invoice)}
                    />
                    <IconButton
                      icon={<FiEdit2 />}
                      variant="ghost"
                      colorScheme="blue"
                      aria-label="Sửa"
                      onClick={() => onEditInvoice(invoice)}
                    />
                    <IconButton
                      icon={<FiTrash2 />}
                      variant="ghost"
                      colorScheme="red"
                      aria-label="Xóa"
                      onClick={() => onDeleteInvoice(invoice.MaHD)}
                    />
                  </HStack>
                </Td>
                <Td>
                  {invoice.TrangThaiHT === 1 ? (
                    <HStack>
                      <FaDotCircle color="red" />
                    </HStack>
                  ) : (invoice.TrangThaiHT === 2 || invoice.TrangThaiHT === 3) && (
                    <HStack>
                      <FaDotCircle color={invoice.TrangThaiHT === 2 ? "green" : "red"} />
                      <Text fontSize="sm" color={invoice.TrangThaiHT === 2 ? "green.600" : "red.600"}>
                        {trangThaiHTText}
                      </Text>
                    </HStack>
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <Flex mt={5} justify="center">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          previousLinkClassName={"previous-link"}
          nextLinkClassName={"next-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"break-link"}
          forcePage={currentPage}
        />
      </Flex>
    </Box>
  );
};

export default InvoiceTable;