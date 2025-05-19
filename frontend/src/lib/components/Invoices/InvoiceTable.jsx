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

// Ánh xạ trạng thái số sang chữ
const trangThaiTTMap = {
  0: "chưa thanh toán",
  1: "đã thanh toán",
  2: "đã đánh giá",
};

const trangThaiHTMap = {
  0: "chưa hoàn",
  1: "đã yêu cầu hoàn",
  2: "đã hoàn",
  3: "đã từ chối",
};

const InvoiceTable = ({
  invoices,
  onEditInvoice,
  onDeleteInvoice,
  onPrintInvoice,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const pageCount = Math.ceil(invoices.length / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedInvoices = invoices.slice(startIndex, endIndex);

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
            <Th>Thời gian</Th>
            <Th>Trạng thái</Th>
            <Th>Thao tác</Th>
            <Th>Yêu cầu hoàn tiền</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedInvoices.map((invoice) => {
            // Lấy trạng thái hiển thị
            const trangThaiTTText = trangThaiTTMap[invoice.TrangThaiTT] || "Không xác định";
            const trangThaiHTText = trangThaiHTMap[invoice.TrangThaiHT] || "Không xác định";

            // Màu cho trạng thái thanh toán
            let ttColor = "red.500"; // mặc định đỏ
            if (invoice.TrangThaiTT === 1) ttColor = "green.500";
            else if (invoice.TrangThaiTT === 2) ttColor = "blue.500";
            else if (invoice.TrangThaiTT === 0) ttColor = "red.500";

            return (
              <Tr key={invoice.MaHD} _hover={{ bg: "gray.50" }}>
                <Td>{invoice.MaHD}</Td>
                <Td>{invoice.MaKH}</Td>
                <Td fontWeight="bold">{invoice.TongTien}</Td>
                <Td>{invoice.ThoiGianThanhToan}</Td>
                <Td color={ttColor} fontWeight="medium">
                  {trangThaiTTText}
                </Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      icon={<FiEye />}
                      variant="ghost"
                      colorScheme="teal"
                      aria-label="Xem chi tiết"
                      onClick={() => onPrintInvoice(invoice)}
                    />
                    <IconButton
                      icon={<FiEdit2 />}
                      variant="ghost"
                      colorScheme="blue"
                      aria-label="Edit"
                      onClick={() => onEditInvoice(invoice)}
                    />
                    <IconButton
                      icon={<FiTrash2 />}
                      variant="ghost"
                      colorScheme="red"
                      aria-label="Delete"
                      onClick={() => onDeleteInvoice(invoice.MaHD)}
                    />
                  </HStack>
                </Td>
                <Td>
                  {(invoice.TrangThaiHT === 2 || invoice.TrangThaiHT === 3) && (
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
