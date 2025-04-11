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
} from "@chakra-ui/react";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const Appointment = () => {
  const [searchQuery, setSearchQuery] = useState("");
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
    // Xử lý sửa lịch hẹn
    console.log("Sửa lịch hẹn:", SDT);
  };

  const handleDelete = (SDT) => {
    // Xử lý xóa lịch hẹn
    console.log("Xóa lịch hẹn:", SDT);
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
    <Box p={5} bg="white" borderRadius="lg" boxShadow="md">
      <Flex mb={5} justify="space-between" align="center">
        <Input
          placeholder="Tìm kiếm lịch hẹn"
          value={searchQuery}
          onChange={handleSearchChange}
          width="300px"
          borderColor="gray.300"
          rightElement={<IconButton icon={<FaSearch />} />}
        />
        <IconButton
          colorScheme="blue"
          size="md"
          icon={<span>+ Thêm lịch hẹn</span>}
          onClick={() => console.log("Thêm lịch hẹn mới")}
          width="auto"
          height="40px"
          px={4}
          fontSize="sm"
        />
      </Flex>

      <Table variant="simple" colorScheme="teal" size="md" style={{ tableLayout: 'fixed' }}>
        <Thead>
          <Tr>
            <Th style={{ backgroundColor: "#3182ce", color: "white", width: "180px" }}>Tên khách hàng</Th>
            <Th style={{ backgroundColor: "#3182ce", color: "white", width: "120px" }}>Số điện thoại</Th>
            <Th style={{ backgroundColor: "#3182ce", color: "white", width: "120px" }}>Thời gian hẹn</Th>
            <Th style={{ backgroundColor: "#3182ce", color: "white", width: "120px" }}>Giờ khách đến</Th>
            <Th style={{ backgroundColor: "#3182ce", color: "white", width: "150px" }}>Loại dịch vụ</Th>
            <Th style={{ backgroundColor: "#3182ce", color: "white", width: "130px" }}>Trạng thái</Th>
            <Th style={{ backgroundColor: "#3182ce", color: "white", width: "100px" }}>Tác vụ</Th>
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
                  <Flex gap={2}>
                    <IconButton
                      icon={<FaEdit />}
                      colorScheme="blue"
                      onClick={() => handleEdit(appointment.SDT)}
                      aria-label="Edit"
                      size="sm"
                      _hover={{ transform: 'scale(1.1)' }}
                    />
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme="red"
                      onClick={() => handleDelete(appointment.SDT)}
                      aria-label="Delete"
                      size="sm"
                      _hover={{ transform: 'scale(1.1)' }}
                    />
                  </Flex>
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
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          color: #333;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
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

        /* Style for active page */
        .paginationActive a {
          background-color: #3182ce !important;
          color: white !important;
          border-color: #3182ce !important;
        }

        /* Style for ellipsis */
        .pagination li.break a {
          border: none;
          width: auto;
          background: none;
        }

        .pagination li.break a:hover {
          background: none;
          border: none;
        }

        /* Disabled state */
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

export default Appointment; 