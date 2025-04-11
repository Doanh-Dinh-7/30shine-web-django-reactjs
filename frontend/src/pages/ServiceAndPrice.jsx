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
} from "@chakra-ui/react";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const ServiceAndPrice = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [services, setServices] = useState([
    {
      MaDV: "DV001",
      TenDV: "Cắt tóc nam",
      GiaDV: "100000",
      ChitietDV: "Cắt tóc, gội đầu, massage vai gáy, tư vấn kiểu tóc phù hợp với khuôn mặt",
    },
    {
      MaDV: "DV002",
      TenDV: "Nhuộm tóc cao cấp",
      GiaDV: "300000",
      ChitietDV: "Nhuộm tóc với sản phẩm cao cấp, tư vấn màu phù hợp, chăm sóc da đầu",
    },
    {
      MaDV: "DV003",
      TenDV: "Uốn tóc Hàn Quốc",
      GiaDV: "250000",
      ChitietDV: "Uốn tóc theo công nghệ Hàn Quốc, tư vấn kiểu phù hợp, chăm sóc tóc đặc biệt",
    },
    {
      MaDV: "DV004",
      TenDV: "Gội đầu dưỡng sinh",
      GiaDV: "100000",
      ChitietDV: "Gội đầu bằng sản phẩm thảo dược, massage vai gáy 15 phút, massage mặt thư giãn",
    },
    {
      MaDV: "DV005",
      TenDV: "Cạo râu và massage mặt",
      GiaDV: "50000",
      ChitietDV: "Cạo râu sạch sẽ, massage mặt thư giãn, đắp mặt nạ dưỡng da",
    },
    {
      MaDV: "DV006",
      TenDV: "Combo cắt gội VIP",
      GiaDV: "150000",
      ChitietDV: "Cắt tóc, gội đầu, massage vai gáy, tạo kiểu, chăm sóc da mặt cơ bản",
    },
    {
      MaDV: "DV007",
      TenDV: "Nhuộm tóc thời trang",
      GiaDV: "400000",
      ChitietDV: "Nhuộm tóc highlight, ombre hoặc balayage, tư vấn phong cách phù hợp",
    },
    {
      MaDV: "DV008",
      TenDV: "Phục hồi tóc",
      GiaDV: "200000",
      ChitietDV: "Phục hồi tóc hư tổn bằng sản phẩm cao cấp, chăm sóc da đầu chuyên sâu",
    },
    {
      MaDV: "DV009",
      TenDV: "Tẩy tóc",
      GiaDV: "350000",
      ChitietDV: "Tẩy tóc an toàn, bảo vệ da đầu, tư vấn quy trình chăm sóc sau tẩy",
    },
    {
      MaDV: "DV010",
      TenDV: "Combo chăm sóc toàn diện",
      GiaDV: "500000",
      ChitietDV: "Cắt tóc, gội đầu, massage toàn thân 30 phút, chăm sóc da mặt cao cấp",
    }
  ]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (MaDV) => {
    // Xử lý sửa dịch vụ
    console.log("Sửa dịch vụ:", MaDV);
  };

  const handleDelete = (MaDV) => {
    // Xử lý xóa dịch vụ
    console.log("Xóa dịch vụ:", MaDV);
  };

  const filteredServices = services.filter(
    (service) =>
      service.TenDV.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.ChitietDV.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [pageNumber, setPageNumber] = useState(0);
  const servicesPerPage = 5;
  const pagesVisited = pageNumber * servicesPerPage;

  const pageCount = Math.ceil(filteredServices.length / servicesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Box p={5} bg="white" borderRadius="lg" boxShadow="md">
      <Flex mb={5} justify="space-between" align="center">
        <Input
          placeholder="Tìm kiếm dịch vụ"
          value={searchQuery}
          onChange={handleSearchChange}
          width="300px"
          borderColor="gray.300"
          rightElement={<IconButton icon={<FaSearch />} />}
        />
        <IconButton
          colorScheme="blue"
          size="md"
          icon={<span>+ Thêm dịch vụ</span>}
          onClick={() => console.log("Thêm dịch vụ mới")}
          width="auto"
          height="40px"
          px={4}
          fontSize="sm"
        />
      </Flex>

      <Table variant="simple" colorScheme="teal" size="md" style={{ tableLayout: 'fixed' }}>
        <Thead>
          <Tr>
            <Th style={{ backgroundColor: "#3182ce", color: "white", width: "120px" }}>Mã dịch vụ</Th>
            <Th style={{ backgroundColor: "#3182ce", color: "white", width: "200px" }}>Tên dịch vụ</Th>
            <Th style={{ backgroundColor: "#3182ce", color: "white", width: "150px" }}>Giá dịch vụ</Th>
            <Th style={{ backgroundColor: "#3182ce", color: "white" }}>Chi tiết dịch vụ</Th>
            <Th style={{ backgroundColor: "#3182ce", color: "white", width: "120px" }}>Tác vụ</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredServices
            .slice(pagesVisited, pagesVisited + servicesPerPage)
            .map((service) => (
              <Tr key={service.MaDV}>
                <Td width="120px">{service.MaDV}</Td>
                <Td width="200px" fontWeight="medium">{service.TenDV}</Td>
                <Td width="150px" color="blue.600" fontWeight="bold">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.GiaDV)}
                </Td>
                <Td>{service.ChitietDV}</Td>
                <Td width="120px">
                  <Flex gap={2}>
                    <IconButton
                      icon={<FaEdit />}
                      colorScheme="blue"
                      onClick={() => handleEdit(service.MaDV)}
                      aria-label="Edit"
                      size="sm"
                      _hover={{ transform: 'scale(1.1)' }}
                    />
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme="red"
                      onClick={() => handleDelete(service.MaDV)}
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

export default ServiceAndPrice; 