import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Grid,
  GridItem,
  Text,
  Badge,
  Box,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { getEmployeeDetail } from "../../service/employees";

const EmployeeDetail = ({ isOpen, onClose, employeeId }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchEmployeeDetail = async () => {
  //     try {
  //       const response = await getEmployeeDetail(employeeId);
  //       setEmployee(response);
  //     } catch (error) {
  //       console.error("Error fetching employee details:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (employeeId) {
  //     fetchEmployeeDetail();
  //   }
  // }, [employeeId]);

  if (loading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Employee Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Loading...</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  if (!employee) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Employee Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Employee not found</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Employee Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            {/* Thông tin cơ bản */}
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Basic Information
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <Text fontWeight="medium">Employee ID:</Text>
                  <Text>{employee.employeeID}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="medium">Full Name:</Text>
                  <Text>{employee.fullName}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="medium">Position:</Text>
                  <Text>{employee.position}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="medium">Department:</Text>
                  <Text>{employee.departmentName}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="medium">Gender:</Text>
                  <Text>{employee.gender}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="medium">Date of Birth:</Text>
                  <Text>
                    {new Date(employee.dateOfBirth).toLocaleDateString("vi-VN")}
                  </Text>
                </GridItem>
              </Grid>
            </Box>

            <Divider />

            {/* Thông tin cá nhân */}
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Personal Information
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <Text fontWeight="medium">Nationality:</Text>
                  <Text>{employee.nationality}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="medium">National ID Number:</Text>
                  <Text>{employee.nationalIDNumber}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="medium">Phone Number:</Text>
                  <Text>{employee.phoneNumber}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="medium">Health Insurance Number:</Text>
                  <Text>{employee.healthInsurance || "No data"}</Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text fontWeight="medium">Address:</Text>
                  <Text>{employee.address}</Text>
                </GridItem>
              </Grid>
            </Box>

            <Divider />

            {/* Thông tin ngân hàng */}
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Bank Information
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <Text fontWeight="medium">Bank Account Number:</Text>
                  <Text>{employee.bankAccountNumber}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="medium">Bank Name:</Text>
                  <Text>{employee.bankName}</Text>
                </GridItem>
              </Grid>
            </Box>

            <Divider />

            {/* Trạng thái */}
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Status
              </Text>
              <HStack>
                <Badge
                  colorScheme={
                    employee.status === "Active"
                      ? "green"
                      : employee.status === "On leave"
                      ? "yellow"
                      : "red"
                  }
                >
                  {employee.status === "Active"
                    ? "Working"
                    : employee.status === "On leave"
                    ? "On leave"
                    : "Inactive"}
                </Badge>
              </HStack>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EmployeeDetail;
