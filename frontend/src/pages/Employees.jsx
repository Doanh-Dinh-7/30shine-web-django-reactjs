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
  Select,
  HStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { FiSearch, FiPlus, FiFilter } from "react-icons/fi";
import EmployeeTable from "../lib/components/Employees/EmployeeTable";
import EmployeeDetail from "../lib/components/Employees/EmployeeDetail";
import EmployeeFormModal from "../lib/components/Employees/EmployeeFormModal";
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
} from "../lib/controller/employeesController";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const toast = useToast();

  // Gọi API lấy danh sách nhân viên
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getAllEmployees();
        setEmployees(response);
        setFilteredEmployees(response);
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast({
          title: "Error",
          description: "Cannot load employee list",
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
        await updateEmployee(selectedEmployee.employeeID, formData);
      } else {
        // Thêm nhân viên mới
        await createEmployee(formData);
      }
      handleCloseFormModal();
      window.location.reload();
    } catch (error) {
      console.error("Error submitting employee:", error);
      throw error;
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = employees.filter((employee) =>
      employee.fullName.toLowerCase().includes(searchTerm)
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
    <Box>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">Employee Management</Heading>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="black"
          bg="black"
          onClick={handleAddEmployee}
        >
          New Employee
        </Button>
      </Flex>

      <Flex
        direction={{ base: "column", md: "row" }}
        mb={6}
        gap={4}
        align={{ base: "stretch", md: "center" }}
      >
        <InputGroup maxW={{ md: "320px" }}>
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.300" />
          </InputLeftElement>
          <Input placeholder="Search employee..." onChange={handleSearch} />
        </InputGroup>

        <HStack spacing={4} ml={{ md: "auto" }}>
          <Select
            placeholder="Department"
            maxW="180px"
            onChange={handleDepartmentFilter}
          >
            <option value="all">All departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Product">Product</option>
          </Select>

          <Select
            placeholder="Status"
            maxW="150px"
            onChange={handleStatusFilter}
          >
            <option value="all">All status</option>
            <option value="Active">Working</option>
            <option value="On leave">On leave</option>
            <option value="Inactive">Inactive</option>
          </Select>

          <Button leftIcon={<FiFilter />} variant="outline">
            Filter
          </Button>
        </HStack>
      </Flex>

      <EmployeeTable
        employees={filteredEmployees}
        onViewEmployee={handleViewEmployee}
        onEditEmployee={handleEditEmployee}
      />

      <EmployeeDetail
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        employeeId={selectedEmployeeId}
      />

      <EmployeeFormModal
        isOpen={isFormModalOpen}
        onClose={handleCloseFormModal}
        employee={selectedEmployee}
        onSubmit={handleSubmitEmployee}
      />
    </Box>
  );
};

export default Employees;
