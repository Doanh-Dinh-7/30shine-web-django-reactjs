import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Badge,
  Box,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import "../../../assets/styles/paginate.css";

const AppointmentTable = ({ appointments, onEditAppointment, onDeleteAppointment }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const appointmentsPerPage = 5;
  const pageCount = Math.ceil(appointments.length / appointmentsPerPage);
  const startIndex = currentPage * appointmentsPerPage;
  const endIndex = startIndex + appointmentsPerPage;
  const paginatedAppointments = appointments.slice(startIndex, endIndex);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
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

  return (
    <Box>
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
          {paginatedAppointments.map((appointment, index) => (
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
                    onClick={() => onEditAppointment(appointment)}
                    aria-label="Edit"
                    size="sm"
                  />
                  <IconButton
                    icon={<FiTrash2 />}
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => onDeleteAppointment(appointment.SDT)}
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
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          nextClassName={"page-item"}
          previousLinkClassName={"previous-link"}
          nextLinkClassName={"next-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"break-link"}
          activeClassName={"active"}
          disabledClassName={"disabled"}
          forcePage={currentPage}
        />
      </Flex>
    </Box>
  );
};

export default AppointmentTable; 