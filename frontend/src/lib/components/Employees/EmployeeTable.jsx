// EmployeeTable.jsx
import React, { useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  IconButton,
  useToast,
  Checkbox,
  Link,
  Box,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { deleteEmployee } from "../../controller/employeesController";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import "../../../assets/styles/paginate.css";

const EmployeeTable = ({ employees, onViewEmployee, onEditEmployee }) => {
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1); // State cho trang hiện tại
  const pageSize = 3; // Số nhân viên mỗi trang (có thể thay đổi)

  const handleDelete = async (employeeId) => {
    // if (window.confirm("Are you sure you want to delete this employee?")) {
    //   try {
    //     await deleteEmployee(employeeId);
    //     toast({
    //       title: "Success",
    //       description: "Employee deleted successfully",
    //       status: "success",
    //       duration: 3000,
    //       isClosable: true,
    //     });
    //     // Gọi lại API lấy danh sách nhân viên
    //     window.location.reload();
    //   } catch (error) {
    //     console.error("Error deleting employee:", error);
    //     toast({
    //       title: "Error",
    //       description: "Cannot delete employee",
    //       status: "error",
    //       duration: 3000,
    //       isClosable: true,
    //     });
    //   }
    // }
  };

  // Logic phân trang
  const pageCount = Math.ceil(employees.length / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedEmployees = employees.slice(startIndex, endIndex);

  // Handle page change
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <Box>
      <Table variant="simple" bg="white" borderRadius="lg" size="md">
        <Thead bg="gray.100">
          <Tr>
            <Th>
              <Checkbox />
            </Th>
            <Th>Mã nhân viên</Th>
            <Th>Tên nhân viên</Th>
            <Th>Giới tính</Th>
            <Th>Địa chỉ</Th>
            <Th>Số điện thoại</Th>
            <Th>Tác vụ</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedEmployees.map((employee) => (
            <Tr key={employee.MaNV} _hover={{ bg: "gray.100" }}>
              <Td>
                <Checkbox borderColor="blackAlpha.600" />
              </Td>
              <Td>{employee.MaNV}</Td>
              <Td>{employee.HoTenNV}</Td>
              <Td>{employee.GioiTinh === 0 ? "Nam" : "Nữ"}</Td>
              <Td>{employee.DiaChi}</Td>
              <Td>{employee.SDT}</Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    icon={<FiEdit2 />}
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                    aria-label="Sửa"
                    isRound
                    onClick={() => onEditEmployee(employee)}
                  />
                  <IconButton
                    icon={<FiEye />}
                    size="sm"
                    variant="ghost"
                    colorScheme="blue"
                    aria-label="Xem thông tin chi tiết nhân viên"
                    isRound
                    onClick={() => onViewEmployee(employee.MaNV)}
                  />
                </HStack>
              </Td>
              <Td>
                <Link
                  href={`/employees/schedule/${employee.MaNV}`}
                  fontSize="sm"
                  color="gray.500"
                  _hover={{ color: "blue.600", textDecoration: "underline" }}
                >
                  Xem lịch làm việc
                </Link>
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

export default EmployeeTable;
