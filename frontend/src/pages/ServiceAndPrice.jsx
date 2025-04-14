import { useState } from "react";
import {
  Box,
  Input,
  Flex,
  InputGroup,
  InputLeftElement,
  Button,
  Heading,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { FiSearch, FiPlus } from "react-icons/fi";
import ServiceFormModal from "../lib/components/ServiceAndPrice/ServiceFormModal";
import ServiceAndPriceTable from "../lib/components/ServiceAndPrice/ServiceAndPriceTable";

const ServiceAndPrice = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const handleDeleteService = (MaDV) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      // Xử lý xóa dịch vụ
      setServices(services.filter(service => service.MaDV !== MaDV));
      toast({
        title: "Xóa thành công",
        description: "Dịch vụ đã được xóa",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddService = () => {
    setSelectedService(null);
    onOpen();
  };

  const handleEditService = (service) => {
    setSelectedService(service);
    onOpen();
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
          onClick={handleAddService}
        >
          Thêm dịch vụ
        </Button>
      </Flex>

      <Box bg="blue.50" p={4} borderRadius="xl" boxShadow="md">
        <ServiceAndPriceTable
          services={filteredServices}
          onEditService={handleEditService}
          onDeleteService={handleDeleteService}
          loading={loading}
        />
      </Box>

      <ServiceFormModal
        isOpen={isOpen}
        onClose={onClose}
        service={selectedService}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default ServiceAndPrice; 