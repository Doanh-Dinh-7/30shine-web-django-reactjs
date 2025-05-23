import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
  Box,
  Flex,
} from "@chakra-ui/react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import ReactPaginate from "react-paginate"; 
import "../../../assets/styles/paginate.css";
import PropTypes from "prop-types";

const ServiceAndPriceTable = ({ services, onEditService, onDeleteService }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const servicesPerPage = 5;
  const pageCount = Math.ceil(services.length / servicesPerPage);
  const startIndex = currentPage * servicesPerPage;
  const endIndex = startIndex + servicesPerPage;
  const paginatedServices = services.slice(startIndex, endIndex);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
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
            <Th width="120px">Mã dịch vụ</Th>
            <Th width="200px">Tên dịch vụ</Th>
            <Th width="150px">Giá dịch vụ</Th>
            <Th>Mô tả dịch vụ</Th>
            <Th width="150px">Thời gian làm (phút)</Th>
            <Th width="120px">Tác vụ</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedServices.map((service) => (
            <Tr key={service.MaDV} _hover={{ bg: "gray.100" }}>
              <Td width="120px">{service.MaDV}</Td>
              <Td width="200px" fontWeight="medium">
                {service.TenDV}
              </Td>
              <Td width="150px" color="blue.600" fontWeight="bold">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(service.GiaTien)}
              </Td>
              <Td>{service.ChitietDV}</Td>
              <Td width="150px" textAlign="center">
                {service.ThoiGianLam || "30"}
              </Td>
              <Td width="120px">
                <HStack spacing={2}>
                  <IconButton
                    icon={<FiEdit2 />}
                    variant="ghost"
                    colorScheme="blue"
                    onClick={() => onEditService(service)}
                    aria-label="Edit"
                    size="sm"
                  />
                  <IconButton
                    icon={<FiTrash2 />}
                    variant="ghost"
                    colorScheme="red"
                    onClick={() => onDeleteService(service.MaDV)}
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

ServiceAndPriceTable.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      MaDV: PropTypes.string.isRequired,
      TenDV: PropTypes.string.isRequired,
      GiaTien: PropTypes.string.isRequired,
      ChitietDV: PropTypes.string.isRequired,
      ThoiGianLam: PropTypes.string,
    })
  ).isRequired,
  onEditService: PropTypes.func.isRequired,
  onDeleteService: PropTypes.func.isRequired,
};

export default ServiceAndPriceTable;
