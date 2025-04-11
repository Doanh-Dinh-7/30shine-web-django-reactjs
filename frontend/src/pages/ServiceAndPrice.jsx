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
import ServiceFormModal from "../lib/components/ServiceAndPrice/ServiceFormModal";

const ServiceAndPrice = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const toast = useToast();

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

  const handleEdit = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleDelete = (MaDV) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      // Xử lý xóa dịch vụ
      console.log("Xóa dịch vụ:", MaDV);
    }
  };

  const handleAddNew = () => {
    setSelectedService(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedService) {
        // Xử lý cập nhật dịch vụ
        const updatedServices = services.map((service) =>
          service.MaDV === formData.MaDV ? formData : service
        );
        setServices(updatedServices);
      } else {
        // Xử lý thêm dịch vụ mới
        setServices([...services, formData]);
      }
    } catch (error) {
      console.error("Lỗi khi xử lý dịch vụ:", error);
      throw error;
    }
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
    <Box p={6}>
      <Box mb={4}>
        <Heading fontSize="lg" color="blue.600">
          Quản lý dịch vụ & giá cả
        </Heading>
      </Box>

      <Flex justify="space-between" align="center" mb={4}>
        <InputGroup maxW="300px" bg="white" borderRadius="md" boxShadow="sm">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.400" />
          </InputLeftElement>
          <Input placeholder="Tìm kiếm dịch vụ" onChange={handleSearchChange} />
        </InputGroup>

        <Button
          leftIcon={<FiPlus />}
          colorScheme="blue"
          color="white"
          borderRadius="md"
          px={5}
          onClick={handleAddNew}
        >
          Thêm dịch vụ
        </Button>
      </Flex>

      <Box bg="blue.50" p={4} borderRadius="xl" boxShadow="md">
        <Table variant="simple" colorScheme="blue" size="md" bg="white" style={{ tableLayout: 'fixed' }}>
          <Thead>
            <Tr>
              <Th width="120px">Mã dịch vụ</Th>
              <Th width="200px">Tên dịch vụ</Th>
              <Th width="150px">Giá dịch vụ</Th>
              <Th>Chi tiết dịch vụ</Th>
              <Th width="120px">Tác vụ</Th>
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
                    <HStack spacing={2}>
                      <IconButton
                        icon={<FiEdit2 />}
                        variant="ghost"
                        colorScheme="blue"
                        onClick={() => handleEdit(service)}
                        aria-label="Edit"
                        size="sm"
                      />
                      <IconButton
                        icon={<FiTrash2 />}
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleDelete(service.MaDV)}
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

      <ServiceFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
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

export default ServiceAndPrice; 