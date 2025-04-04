import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import {
  getDepartmentList,
  getEmployeeDetail,
} from "../../controller/employeesController";

const EmployeeFormModal = ({ isOpen, onClose, employee, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    position: "",
    departmentID: "",
    gender: "",
    dateOfBirth: "",
    nationality: "",
    nationalIDNumber: "",
    phoneNumber: "",
    healthInsurance: "",
    address: "",
    bankAccountNumber: "",
    bankName: "",
    status: "Active",
  });
  const [departments, setDepartments] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await getDepartmentList();
        setDepartments(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      if (employee) {
        try {
          const employeeDetail = await getEmployeeDetail(employee.employeeID);
          setFormData({
            employeeID: employeeDetail.employeeID || "",
            fullName: employeeDetail.fullName || "",
            position: employeeDetail.position || "",
            departmentID: employeeDetail.departmentID || "",
            gender: employeeDetail.gender || "",
            dateOfBirth: employeeDetail.dateOfBirth
              ? new Date(employeeDetail.dateOfBirth).toISOString().split("T")[0]
              : "",
            nationality: employeeDetail.nationality || "",
            nationalIDNumber: employeeDetail.nationalIDNumber || "",
            phoneNumber: employeeDetail.phoneNumber || "",
            healthInsurance: employeeDetail.healthInsurance || "",
            address: employeeDetail.address || "",
            bankAccountNumber: employeeDetail.bankAccountNumber || "",
            bankName: employeeDetail.bankName || "",
            status: employeeDetail.status || "Active",
          });
        } catch (error) {
          console.error("Error fetching employee detail:", error);
          toast({
            title: "Error",
            description: "Cannot fetch employee detail",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        setFormData({
          employeeID: "",
          fullName: "",
          position: "",
          departmentID: "",
          gender: "",
          dateOfBirth: "",
          nationality: "",
          nationalIDNumber: "",
          phoneNumber: "",
          healthInsurance: "",
          address: "",
          bankAccountNumber: "",
          bankName: "",
          status: "Active",
        });
      }
    };

    fetchEmployeeDetail();
  }, [employee, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      onClose();
      toast({
        title: "Success",
        description: employee
          ? "Update employee successfully"
          : "Add employee successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: employee
          ? "Cannot update employee"
          : "Cannot add employee",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {employee ? "Edit employee" : "Add new employee"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Position</FormLabel>
                    <Input
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Department</FormLabel>
                    <Select
                      name="departmentID"
                      value={formData.departmentID}
                      onChange={handleChange}
                    >
                      <option value="">Select department</option>
                      {departments.map((dept) => (
                        <option
                          key={dept.departmentID}
                          value={dept.departmentID}
                        >
                          {dept.departmentName}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Date of Birth</FormLabel>
                    <Input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Nationality</FormLabel>
                    <Input
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>National ID Number</FormLabel>
                    <Input
                      name="nationalIDNumber"
                      value={formData.nationalIDNumber}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>Health Insurance</FormLabel>
                    <Input
                      name="healthInsurance"
                      value={formData.healthInsurance}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Address</FormLabel>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Bank Account Number</FormLabel>
                    <Input
                      name="bankAccountNumber"
                      value={formData.bankAccountNumber}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Bank Name</FormLabel>
                    <Input
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                    />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl isRequired>
                    <FormLabel>Status</FormLabel>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Active">Working</option>
                      <option value="On leave">On leave</option>
                      <option value="Inactive">Inactive</option>
                    </Select>
                  </FormControl>
                </GridItem>
              </Grid>
              <Button type="submit" colorScheme="blue" w="full">
                {employee ? "Update" : "Add"}
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EmployeeFormModal;
