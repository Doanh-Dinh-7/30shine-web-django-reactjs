import {
    Table, Thead, Tbody, Tr, Th, Td,
    IconButton, HStack, Box, Flex
  } from "@chakra-ui/react";
  import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
  import ReactPaginate from "react-paginate";
  import { FaDotCircle } from "react-icons/fa";
  import "../../../assets/styles/paginate.css";
  import { useState } from "react";
  
  const InvoiceTable = ({
    invoices,
    onEditInvoice,
    onDeleteInvoice,
    onPrintInvoice
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
            {paginatedInvoices.map((invoice) => (
              <Tr key={invoice.MaHD} _hover={{ bg: "gray.50" }}>
                <Td>{invoice.MaHD}</Td>
                <Td>{invoice.MaKH}</Td>
                <Td fontWeight="bold">{invoice.TongTien}</Td>
                <Td>{invoice.ThoiGianThanhToan}</Td>
                <Td
                  color={
                    invoice.TrangThaiTT === "đã thanh toán"
                      ? "green.500"
                      : invoice.TrangThaiTT === "đã hoàn tiền"
                      ? "orange.500"
                      : "red.500"
                  }
                  fontWeight="medium"
                >
                  {invoice.TrangThaiTT}
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
                  {invoice.TrangThaiHT === "đã hoàn" && <FaDotCircle color="red" />}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
  
        {/* ReactPaginate component */}
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
  