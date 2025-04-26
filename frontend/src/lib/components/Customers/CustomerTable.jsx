import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  useToast,
  Box,
  Flex,
  Button,
  Text,
  HStack,
} from "@chakra-ui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import "../../../assets/styles/paginate.css";

const CustomerTable = ({ customers, onEditCustomer, onDeleteCustomer }) => {
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(0); // State cho trang hiện tại
  const pageSize = 3; // Số nhân viên mỗi trang (có thể thay đổi)

  // Logic phân trang
  const pageCount = Math.ceil(customers.length / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedCustomers = customers.slice(startIndex, endIndex);

  // Handle page change
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <Box>
      <Table variant="simple" bg="white" borderRadius="lg" shadow="sm">
        <Thead bg="gray.100">
          <Tr>
            <Th>Mã khách hàng</Th>
            <Th>Tên khách hàng</Th>
            <Th>Số điện thoại</Th>
            <Th>Email</Th>
            <Th>Thao tác</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedCustomers.map((customer) => (
            <Tr key={customer.MaKH} _hover={{ bg: "gray.100" }}>
              <Td>{customer.MaKH}</Td>
              <Td>{customer.HoTenKH}</Td>
              <Td>{customer.SDT}</Td>
              <Td>{customer.Email}</Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    icon={<FiEdit2 />}
                    variant="ghost"
                    colorScheme="blue"
                    aria-label="Edit"
                    size="sm"
                    onClick={() => onEditCustomer(customer)}
                  />
                  <IconButton
                    icon={<FiTrash2 />}
                    variant="ghost"
                    colorScheme="red"
                    aria-label="Delete"
                    size="sm"
                    onClick={() => onDeleteCustomer(customer.MaKH)}
                  />
                </HStack>
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

export default CustomerTable;
