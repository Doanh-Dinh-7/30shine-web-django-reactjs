import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import { deleteEmployee } from "../../controller/employeesController";

const EmployeeTable = ({ employees, onViewEmployee, onEditEmployee }) => {
  const toast = useToast();

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "green";
      case "On leave":
        return "yellow";
      case "Inactive":
        return "red";
      default:
        return "gray";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Active":
        return "Working";
      case "On leave":
        return "On leave";
      case "Inactive":
        return "Inactive";
      default:
        return status;
    }
  };

  const handleDelete = async (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployee(employeeId);
        toast({
          title: "Success",
          description: "Employee deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        // Gọi lại API lấy danh sách nhân viên
        window.location.reload();
      } catch (error) {
        console.error("Error deleting employee:", error);
        toast({
          title: "Error",
          description: "Cannot delete employee",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Table variant="simple" bg="white" borderRadius="lg">
      <Thead>
        <Tr>
          <Th>Employee ID</Th>
          <Th>Full Name</Th>
          <Th>Position</Th>
          <Th>Department</Th>
          <Th>Phone Number</Th>
          <Th>Status</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {employees.map((employee) => (
          <Tr key={employee.employeeID}>
            <Td>{employee.employeeID}</Td>
            <Td>{employee.fullName}</Td>
            <Td>{employee.position}</Td>
            <Td>{employee.departmentName}</Td>
            <Td>{employee.phoneNumber}</Td>
            <Td>
              <Badge colorScheme={getStatusColor(employee.status)}>
                {getStatusText(employee.status)}
              </Badge>
            </Td>
            <Td>
              <HStack spacing={2}>
                <IconButton
                  icon={<FiEdit2 />}
                  size="sm"
                  variant="ghost"
                  colorScheme="yellow"
                  onClick={() => onEditEmployee(employee)}
                  aria-label="Edit"
                />
                <IconButton
                  icon={<FiTrash2 />}
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => handleDelete(employee.employeeID)}
                  aria-label="Delete"
                />
                <IconButton
                  icon={<FiEye />}
                  size="sm"
                  variant="ghost"
                  colorScheme="blue"
                  onClick={() => onViewEmployee(employee.employeeID)}
                  aria-label="View"
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default EmployeeTable;
