import { useState, useEffect } from "react";
import axios from "axios";
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
  Box,
  VStack,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const EmployeeDetail = ({ isOpen, onClose, employeeId }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/nhan-vien/${employeeId}/`
        );
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee details:", error);
        // Handle error display if needed
      } finally {
        setLoading(false);
      }
    };

    if (employeeId !== null) {
      // Fetch only if employeeId is provided
      fetchEmployeeDetail();
    } else {
      setEmployee(null); // Clear employee details if no employeeId
      setLoading(false); // Stop loading if no employeeId
    }
  }, [employeeId]); // Depend on employeeId

  if (loading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chi tiết nhân viên</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            justifyContent="center"
            alignItems="center"
            minH="200px"
          >
            <Spinner size="lg" />
            <Text ml={2}>Đang tải...</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  if (!employee) {
    if (!isOpen && employeeId === null) return null;

    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chi tiết nhân viên</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Không tìm thấy thông tin nhân viên.</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Chi tiết nhân viên</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            {/* Thông tin cơ bản */}
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Thông tin cơ bản
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <Text fontWeight="medium">Mã nhân viên:</Text>
                  <Text>{employee.MaNV}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="medium">Họ và tên:</Text>
                  <Text>{employee.HoTenNV}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="medium">Giới tính:</Text>
                  <Text>{employee.GioiTinh === 0 ? "Nam" : "Nữ"}</Text>
                </GridItem>
              </Grid>
            </Box>

            <Divider />

            {/* Thông tin tài khoản */}
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Thông tin tài khoản
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <Text fontWeight="medium">Username:</Text>
                  <Text>{employee.user?.username || "N/A"}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="medium">Is Superuser:</Text>
                  <Text>{employee.user?.is_superuser ? "Yes" : "No"}</Text>
                </GridItem>
              </Grid>
            </Box>

            <Divider />

            {/* Thông tin cá nhân */}
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                Thông tin cá nhân
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                <GridItem>
                  <Text fontWeight="medium">Số điện thoại:</Text>
                  <Text>{employee.SDT}</Text>
                </GridItem>
                <GridItem>
                  <Text fontWeight="medium">Email:</Text>
                  <Text>{employee.Email || "N/A"}</Text>
                </GridItem>
                <GridItem colSpan={2}>
                  <Text fontWeight="medium">Địa chỉ:</Text>
                  <Text>{employee.DiaChi || "N/A"}</Text>
                </GridItem>
              </Grid>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

EmployeeDetail.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  employeeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default EmployeeDetail;
