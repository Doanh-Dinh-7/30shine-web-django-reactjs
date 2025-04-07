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
import EmployeeFormModal from "../lib/components/Employees/EmployeeFormModal";
import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
} from "../lib/controller/employeesController";

const Employees = () => {
  // Tạo mockup data nhân viên: MaNV, HoTenNV, SDT, Email, ChucVu.
  const mockupData = [
    {
      MaNV: "NV001",
      HoTenNV: "Nguyễn Anh Tú",
      GioiTinh: 0,
      DiaChi: "01 An Hoà 4",
      SDT: "0387631548",
      Email: "dinhsyquocdoanh@gmail.com",
      ChucVu: "Nhân viên",
    },
    {
      MaNV: "NV002",
      HoTenNV: "Nguyễn Anh Tú",
      GioiTinh: 0,
      DiaChi: "01 An Hoà 4",
      SDT: "0387631548",
      Email: "dinhsyquocdoanh@gmail.com",
      ChucVu: "Nhân viên",
    },
    {
      MaNV: "NV003",
      HoTenNV: "Nguyễn Anh Tú",
      GioiTinh: 0,
      DiaChi: "01 An Hoà 4",
      SDT: "0387631548",
      Email: "dinhsyquocdoanh@gmail.com",
      ChucVu: "Nhân viên",
    },
    {
      MaNV: "NV004",
      HoTenNV: "Nguyễn Anh Tú",
      GioiTinh: 0,
      DiaChi: "01 An Hoà 4",
      SDT: "0387631548",
      Email: "dinhsyquocdoanh@gmail.com",
      ChucVu: "Nhân viên",
    },
  ];
  const [employees, setEmployees] = useState(mockupData);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const toast = useToast();

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  // // Gọi API lấy danh sách nhân viên
  // useEffect(() => {
  //   const fetchEmployees = async () => {
  //     try {
  //       const response = await getAllEmployees();
  //       setEmployees(response);
  //       setFilteredEmployees(response);
  //     } catch (error) {
  //       console.error("Error fetching employees:", error);
  //       toast({
  //         title: "Error",
  //         description: "Cannot load employee list",
  //         status: "error",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchEmployees();
  // }, [toast]);

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
    // try {
    //   if (selectedEmployee) {
    //     // Cập nhật nhân viên
    //     await updateEmployee(selectedEmployee.employeeID, formData);
    //   } else {
    //     // Thêm nhân viên mới
    //     await createEmployee(formData);
    //   }
    //   handleCloseFormModal();
    //   window.location.reload();
    // } catch (error) {
    //   console.error("Error submitting employee:", error);
    //   throw error;
    // }
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

        <Button
          leftIcon={<FiPlus />}
          bg="blue.600"
          color="white"
          _hover={{ bg: "blue.700" }}
          borderRadius="md"
          px={5}
          onClick={handleAddEmployee}
        >
          Thêm nhân viên
        </Button>
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
