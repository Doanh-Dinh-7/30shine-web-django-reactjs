// src/pages/Employees.jsx
import { useState, useEffect } from "react";
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
import { FiSearch, FiPlus } from "react-icons/fi";
import EmployeeTable from "../lib/components/Employees/EmployeeTable";
import EmployeeDetail from "../lib/components/Employees/EmployeeDetail";
import EmployeeFormDrawer from "../lib/components/Employees/EmployeeFormDrawer";
import { Outlet, useNavigate } from "react-router-dom";
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
} from "../lib/controller/employeesController";

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
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await getAllEmployees();
        setEmployees(response);
        setFilteredEmployees(response);
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
    fetchEmployees();
  }, [toast]);

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
        await updateEmployee(selectedEmployee.MaNV, formData);
        toast({ title: "Cập nhật thành công", status: "success" });
      } else {
        // Thêm nhân viên mới
        await createEmployee(formData);
        toast({ title: "Thêm nhân viên thành công", status: "success" });
      }
      handleCloseFormModal();
      // Reload lại danh sách nhân viên
      setLoading(true);
      const response = await getAllEmployees();
      setEmployees(response);
      setFilteredEmployees(response);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting employee:", error);
      toast({
        title: "Lỗi",
        description: "Không thể lưu nhân viên",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      throw error;
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = employees.filter(
      (employee) =>
        employee.HoTenNV.toLowerCase().includes(searchTerm) ||
        employee.SDT.toLowerCase().includes(searchTerm) ||
        employee.MaNV.toLowerCase().includes(searchTerm)
    );
    setFilteredEmployees(filtered);
  };

  const handleDepartmentFilter = (event) => {
    const department = event.target.value;
    if (department === "all") {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(
        (employee) => employee.departmentName === department
      );
      setFilteredEmployees(filtered);
    }
  };

  const handleStatusFilter = (event) => {
    const status = event.target.value;
    if (status === "all") {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter(
        (employee) => employee.status === status
      );
      setFilteredEmployees(filtered);
    }
  };

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
    </Box>
  );
};

export default Employees;
