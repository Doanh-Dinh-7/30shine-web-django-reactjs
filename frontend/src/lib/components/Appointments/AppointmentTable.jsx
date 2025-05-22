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
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { FiTrash2, FiFileText, FiCheckCircle } from "react-icons/fi";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import PropTypes from "prop-types";
import "../../../assets/styles/paginate.css";
import NoteModal from "./NoteModal";

const AppointmentTable = ({
  appointments,
  onDeleteAppointment,
  onCompleteAppointment,
  isManager = false,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedNote, setSelectedNote] = useState("");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const appointmentsPerPage = 5;
  const pageCount = Math.ceil(appointments.length / appointmentsPerPage);
  const startIndex = currentPage * appointmentsPerPage;
  const endIndex = startIndex + appointmentsPerPage;
  const paginatedAppointments = appointments.slice(startIndex, endIndex);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleViewNote = (note, appointmentId) => {
    setSelectedNote(note);
    setSelectedAppointmentId(appointmentId);
    onOpen();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return "yellow";
      case 1:
        return "green";
      default:
        return "gray";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Chờ xác nhận";
      case 1:
        return "Đã hoàn thành";
      default:
        return "Không xác định";
    }
  };

  return (
    <Box>
      <Table
        variant="simple"
        colorScheme="blue"
        size="md"
        bg="white"
        style={{ tableLayout: "fixed" }}
      >
        <Thead>
          <Tr>
            <Th width="100px">Mã lịch hẹn</Th>
            <Th width="150px">Tên khách hàng</Th>
            <Th width="120px">Số điện thoại</Th>
            <Th width="120px">Thời gian hẹn</Th>
            <Th width="120px">Giờ khách đến</Th>
            <Th width="150px">Loại dịch vụ</Th>
            <Th width="150px">Nhân viên phụ trách</Th>
            <Th width="130px">Trạng thái</Th>
            <Th width="100px">Tác vụ</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedAppointments.map((appointment) => (
            <Tr key={appointment.MaLH}>
              <Td width="100px">{appointment.MaLH}</Td>
              <Td width="150px">{appointment.HoTenKH}</Td>
              <Td width="120px">{appointment.SDT}</Td>
              <Td width="120px">{new Date(appointment.NgayDatLich).toLocaleDateString('vi-VN')}</Td>
              <Td width="120px">{appointment.GioKhachDen || 'Chưa đến'}</Td>
              <Td width="150px">{appointment.TenDV}</Td>
              <Td width="150px">{appointment.TenNV}</Td>
              <Td width="130px">
                <Badge colorScheme={getStatusColor(appointment.TrangThai)}>
                  {getStatusText(appointment.TrangThai)}
                </Badge>
              </Td>
              <Td width="100px">
                <HStack spacing={2}>
                  <IconButton
                    icon={<FiFileText />}
                    variant="ghost"
                    colorScheme="blue"
                    onClick={() => handleViewNote(appointment.GhiChu || "Không có ghi chú", appointment.MaLH)}
                    aria-label="View Note"
                    size="sm"
                  />
                  {isManager && appointment.TrangThai === 0 && (
                    <Tooltip label="Hoàn thành">
                      <IconButton
                        icon={<FiCheckCircle />}
                        variant="ghost"
                        colorScheme="green"
                        onClick={() => onCompleteAppointment(appointment.MaLH)}
                        aria-label="Complete"
                        size="sm"
                      />
                    </Tooltip>
                  )}
                  <IconButton
                    icon={<FiTrash2 />}
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => onDeleteAppointment(appointment.MaLH)}
                    aria-label="Delete"
                    size="sm"
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <NoteModal
        isOpen={isOpen}
        onClose={onClose}
        note={selectedNote}
        appointmentId={selectedAppointmentId}
      />

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

AppointmentTable.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      MaLH: PropTypes.number.isRequired,
      HoTenKH: PropTypes.string.isRequired,
      SDT: PropTypes.string.isRequired,
      NgayDatLich: PropTypes.string.isRequired,
      GioKhachDen: PropTypes.string,
      TenDV: PropTypes.string.isRequired,
      TenNV: PropTypes.string.isRequired,
      TrangThai: PropTypes.number.isRequired,
      GhiChu: PropTypes.string,
    })
  ).isRequired,
  onDeleteAppointment: PropTypes.func.isRequired,
  onCompleteAppointment: PropTypes.func,
  isManager: PropTypes.bool,
};

export default AppointmentTable;
