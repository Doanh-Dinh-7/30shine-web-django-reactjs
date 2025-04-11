import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Flex,
  IconButton,
  Badge,
  InputGroup,
  InputLeftElement,
  Button,
  Heading,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { FiSearch, FiPlus } from "react-icons/fi";
import ReactPaginate from "react-paginate";
import AppointmentFormModal from "../lib/components/Appointments/AppointmentFormModal";

const Appointments = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const toast = useToast();
  // eslint-disable-next-line no-unused-vars
  const [appointments, setAppointments] = useState([
    {
      TenKH: "Nguyễn Văn An",
      SDT: "0912345678",
      TGHen: "2024-03-20",
      GioKhachDen: "09:30",
      LoaiDV: "Cắt tóc nam",
      TrangThai: "Đã xác nhận",
    },
    {
      TenKH: "Trần Thị Bình",
      SDT: "0923456789",
      TGHen: "2024-03-20",
      GioKhachDen: "10:00",
      LoaiDV: "Nhuộm tóc",
      TrangThai: "Chờ xác nhận",
    },
    {
      TenKH: "Lê Văn Cường",
      SDT: "0934567890",
      TGHen: "2024-03-20",
      GioKhachDen: "10:30",
      LoaiDV: "Combo cắt gội",
      TrangThai: "Đã hoàn thành",
    },
    {
      TenKH: "Phạm Thị Dung",
      SDT: "0945678901",
      TGHen: "2024-03-20",
      GioKhachDen: "11:00",
      LoaiDV: "Uốn tóc",
      TrangThai: "Đã hủy",
    },
    {
      TenKH: "Hoàng Văn Em",
      SDT: "0956789012",
      TGHen: "2024-03-20",
      GioKhachDen: "13:30",
      LoaiDV: "Gội đầu",
      TrangThai: "Đã xác nhận",
    },
    {
      TenKH: "Ngô Thị Phương",
      SDT: "0967890123",
      TGHen: "2024-03-20",
      GioKhachDen: "14:00",
      LoaiDV: "Nhuộm tóc",
      TrangThai: "Chờ xác nhận",
    },
  ]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (SDT) => {
    const appointmentToEdit = appointments.find((app) => app.SDT === SDT);
    setSelectedAppointment(appointmentToEdit);
    setIsModalOpen(true);
  };

  const handleDelete = (SDT) => {
    // Implement delete logic here
    setAppointments(appointments.filter((app) => app.SDT !== SDT));
    toast({
      title: "Xóa thành công",
      description: "Lịch hẹn đã được xóa",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleSubmit = (formData) => {
    if (selectedAppointment) {
      // Update existing appointment
      setAppointments(
        appointments.map((app) =>
          app.SDT === selectedAppointment.SDT ? formData : app
        )
      );
    } else {
      // Add new appointment
      setAppointments([...appointments, formData]);
    }
    handleModalClose();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Đã xác nhận":
        return "green";
      case "Chờ xác nhận":
        return "yellow";
      case "Đã hoàn thành":
        return "blue";
      case "Đã hủy":
        return "red";
      default:
        return "gray";
    }
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.TenKH.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.SDT.includes(searchQuery) ||
      appointment.LoaiDV.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [pageNumber, setPageNumber] = useState(0);
  const appointmentsPerPage = 5;
  const pagesVisited = pageNumber * appointmentsPerPage;

  const pageCount = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Box p={6}>
      <Box mb={4}>
        <Heading fontSize="lg" color="blue.600">
          Quản lý lịch hẹn
        </Heading>
      </Box>

      <Flex justify="space-between" align="center" mb={4}>
        <InputGroup maxW="300px" bg="white" borderRadius="md" boxShadow="sm">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.400" />
          </InputLeftElement>
          <Input placeholder="Tìm kiếm lịch hẹn" onChange={handleSearchChange} />
        </InputGroup>

        <Button
          leftIcon={<FiPlus />}
          colorScheme="blue"
          color="white"
          borderRadius="md"
          px={5}
          onClick={() => setIsModalOpen(true)}
        >
          Thêm lịch hẹn
        </Button>
      </Flex>

      <Box bg="blue.50" p={4} borderRadius="xl" boxShadow="md">
        <Table variant="simple" colorScheme="blue" size="md" bg="white" style={{ tableLayout: 'fixed' }}>
          <Thead>
            <Tr>
              <Th width="180px">Tên khách hàng</Th>
              <Th width="120px">Số điện thoại</Th>
              <Th width="120px">Thời gian hẹn</Th>
              <Th width="120px">Giờ khách đến</Th>
              <Th width="150px">Loại dịch vụ</Th>
              <Th width="130px">Trạng thái</Th>
              <Th width="100px">Tác vụ</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredAppointments
              .slice(pagesVisited, pagesVisited + appointmentsPerPage)
              .map((appointment, index) => (
                <Tr key={index}>
                  <Td width="180px">{appointment.TenKH}</Td>
                  <Td width="120px">{appointment.SDT}</Td>
                  <Td width="120px">{appointment.TGHen}</Td>
                  <Td width="120px">{appointment.GioKhachDen}</Td>
                  <Td width="150px">{appointment.LoaiDV}</Td>
                  <Td width="130px">
                    <Badge colorScheme={getStatusColor(appointment.TrangThai)}>
                      {appointment.TrangThai}
                    </Badge>
                  </Td>
                  <Td width="100px">
                    <HStack spacing={2}>
                      <IconButton
                        icon={<FiEdit2 />}
                        variant="ghost"
                        colorScheme="blue"
                        onClick={() => handleEdit(appointment.SDT)}
                        aria-label="Edit"
                        size="sm"
                      />
                      <IconButton
                        icon={<FiTrash2 />}
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleDelete(appointment.SDT)}
                        aria-label="Delete"
                        size="sm"
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>

        <Flex mt={5} justify="center">
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination"}
            previousLinkClassName={"paginationButton"}
            nextLinkClassName={"paginationButton"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            pageClassName={"paginationPage"}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
          />
        </Flex>
      </Box>

      <AppointmentFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        appointment={selectedAppointment}
        onSubmit={handleSubmit}
      />

      <style>{`
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          list-style: none;
          gap: 8px;
          margin-top: 20px;
          padding: 0;
        }

        .paginationButton,
        .paginationPage a {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          color: #333;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
          text-decoration: none;
        }

        .paginationButton:hover,
        .paginationPage a:hover {
          background-color: #f7fafc;
          border-color: #CBD5E0;
        }

        .paginationDisabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .paginationPage {
          display: inline-block;
        }

        .paginationActive a {
          background-color: #3182ce !important;
          color: white !important;
          border-color: #3182ce !important;
        }

        .pagination li.break a {
          border: none;
          width: auto;
          background: none;
        }

        .pagination li.break a:hover {
          background: none;
          border: none;
        }

        .paginationDisabled .paginationButton {
          background-color: #f7fafc;
          color: #CBD5E0;
          cursor: not-allowed;
          border-color: #E2E8F0;
        }
      `}</style>
    </Box>
  );
};

export default Appointments; 