// EmployeeTable.jsx
import { useEffect, useState } from "react";
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
  Box,
  Flex,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { FiEye, FiEdit2, FiTrash2, FiCalendar } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import "../../../assets/styles/paginate.css";
import PropTypes from "prop-types";

const EmployeeTable = ({
  employees,
  onViewEmployee,
  onEditEmployee,
  onDeleteEmployee,
  loading,
}) => {
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  const handleDelete = async (employeeId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      try {
        await onDeleteEmployee(employeeId);
      } catch (error) {
        console.error("Error deleting employee:", error);
        toast({
          title: "Lỗi",
          description: "Không thể xóa nhân viên",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [employees]);

  const pageCount = Math.ceil(employees.length / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedEmployees = employees.slice(startIndex, endIndex);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <Box>
      {loading ? (
        <Flex justify="center" align="center" minH="200px">
          <Spinner size="lg" />
          <Text ml={2}>Đang tải...</Text>
        </Flex>
      ) : (
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
                    <IconButton
                      icon={<FiTrash2 />}
                      size="sm"
                      variant="ghost"
                      colorScheme="red"
                      aria-label="Xóa"
                      isRound
                      onClick={() => handleDelete(employee.MaNV)}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {!loading && pageCount > 1 && (
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
      )}
    </Box>
  );
};

EmployeeTable.propTypes = {
  employees: PropTypes.array.isRequired,
  onViewEmployee: PropTypes.func.isRequired,
  onEditEmployee: PropTypes.func.isRequired,
  onDeleteEmployee: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default EmployeeTable;
