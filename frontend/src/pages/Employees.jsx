// src/pages/Employees.jsx
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import {
  Box,
  Heading,
  Flex,
  Button,
  InputGroup,
  Input,
  InputLeftElement,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { FiSearch, FiPlus, FiCalendar } from "react-icons/fi";
import EmployeeTable from "../lib/components/Employees/EmployeeTable";
import EmployeeDetail from "../lib/components/Employees/EmployeeDetail";
import EmployeeFormDrawer from "../lib/components/Employees/EmployeeFormDrawer";
import { useNavigate } from "react-router-dom"; // Remove Outlet

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  // Gọi API lấy danh sách nhân viên
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/nhan-vien/");
      // Assuming the API returns an array of employee objects directly
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast({
        title: "Lỗi",
        description: "Không thể tải danh sách nhân viên",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [toast]); // Depend on toast if used inside fetchEmployees, otherwise remove it

  const handleViewEmployee = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedEmployeeId(null);
  };

  const handleAddEmployee = () => {
    setSelectedEmployee(null);
    setIsFormModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsFormModalOpen(true);
  };

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleSubmitEmployee = async (formData) => {
    try {
      if (selectedEmployee) {
        // Cập nhật nhân viên
        // Assuming API PUT endpoint is /api/nhan-vien/{id}/
        await axios.put(
          `http://127.0.0.1:8000/api/nhan-vien/${selectedEmployee.MaNV}/`,
          formData // Assuming formData structure matches API expected input
        );
        toast({ title: "Cập nhật thành công", status: "success" });
      } else {
        // Thêm nhân viên mới
        // Assuming API POST endpoint is /api/nhan-vien/
        await axios.post("http://127.0.0.1:8000/api/nhan-vien/", formData); // Assuming formData structure matches API expected input
        toast({ title: "Thêm nhân viên thành công", status: "success" });
      }
      handleCloseFormModal();
      // Reload lại danh sách nhân viên sau khi thêm/sửa thành công
      fetchEmployees();
    } catch (error) {
      console.error("Error submitting employee:", error);
      toast({
        title: "Lỗi",
        description: error.response?.data?.message || "Không thể lưu nhân viên", // Use error response message if available
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      // Rethrow or handle error as needed
      // throw error; // Optional: if you want calling component to handle it
    }
  };

  // Add handleDeleteEmployee function
  const handleDeleteEmployee = async (employeeId) => {
    setLoading(true);
    try {
      // Assuming API DELETE endpoint is /api/nhan-vien/{id}/
      await axios.delete(`http://127.0.0.1:8000/api/nhan-vien/${employeeId}/`);
      toast({ title: "Xóa thành công", status: "success" });
      // Reload the employee list after successful deletion
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast({
        title: "Lỗi",
        description: error.response?.data?.message || "Không thể xóa nhân viên",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false); // Stop loading on error
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = employees.filter(
      (employee) =>
        employee.HoTenNV.toLowerCase().includes(searchTerm) ||
        (employee.SDT && employee.SDT.toLowerCase().includes(searchTerm)) || // Check if SDT exists
        employee.MaNV.toString().toLowerCase().includes(searchTerm) // Ensure MaNV is string
    );
    setFilteredEmployees(filtered);
  };

  // Remove unused filter functions
  // const handleDepartmentFilter = (event) => { ... }
  // const handleStatusFilter = (event) => { ... }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="400px"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={6}>
      <Box mb={4}>
        <Heading fontSize="lg" color="blue.600">
          Quản lý nhân viên
        </Heading>
      </Box>
      <Flex justify="space-between" align="center" mb={4}>
        <InputGroup maxW="300px" bg="white" borderRadius="md" boxShadow="sm">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.400" />
          </InputLeftElement>
          <Input placeholder="Tìm kiếm nhân viên" onChange={handleSearch} />
        </InputGroup>
        <Flex gap={3}>
          <Button
            leftIcon={<FiCalendar />}
            colorScheme="blue"
            color="white"
            borderRadius="md"
            px={5}
            fontWeight="bold"
            onClick={() => navigate("/employees/schedule")}
          >
            Xem lịch làm việc
          </Button>
          <Button
            leftIcon={<FiPlus />}
            color="white"
            colorScheme="blue"
            borderRadius="md"
            px={5}
            onClick={handleAddEmployee}
          >
            Thêm nhân viên
          </Button>
        </Flex>
      </Flex>
      <Box bg="blue.50" p={4} borderRadius="xl" boxShadow="md">
        <EmployeeTable
          employees={filteredEmployees}
          onViewEmployee={handleViewEmployee}
          onEditEmployee={handleEditEmployee}
          onDeleteEmployee={handleDeleteEmployee}
          loading={loading}
        />
      </Box>
      <EmployeeDetail
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        employeeId={selectedEmployeeId}
      />
      <EmployeeFormDrawer
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        employee={selectedEmployee}
        onSubmit={handleSubmitEmployee}
      />
      {/* Outlet is removed */} {/* <Outlet /> */}
    </Box>
  );
};

export default Employees;
