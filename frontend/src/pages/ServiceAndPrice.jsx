import { useState, useEffect } from "react";
import axios from "axios";
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
import ServiceFormDrawer from "../lib/components/ServiceAndPrice/ServiceFormDrawer";
import ServiceAndPriceTable from "../lib/components/ServiceAndPrice/ServiceAndPriceTable";

const ServiceAndPrice = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/dich-vu/");
      const formattedServices = response.data.map((service) => ({
        MaDV: service.MaDV,
        TenDV: service.TenDV,
        GiaTien: service.GiaTien,
        ChitietDV: service.MoTa,
        ThoiGianLamDV: service.ThoiGianLamDV,
      }));
      setServices(formattedServices);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách dịch vụ:", error);
      toast({
        title: "Lỗi",
        description: "Không thể lấy danh sách dịch vụ",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteService = async (MaDV) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/dich-vu/${MaDV}/`);
        setServices(services.filter((service) => service.MaDV !== MaDV));
        toast({
          title: "Xóa thành công",
          description: "Dịch vụ đã được xóa",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Lỗi khi xóa dịch vụ:", error);
        toast({
          title: "Lỗi",
          description: "Không thể xóa dịch vụ",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
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

  const handleSubmit = async (formData, selectedFile) => {
    try {
      if (selectedService) {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/dich-vu/${formData.MaDV}/`,
          {
            TenDV: formData.TenDV,
            MoTa: formData.ChitietDV,
            GiaTien: formData.GiaTien,
            ThoiGianLamDV: formData.ThoiGianLamDV,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const updatedService = {
          MaDV: response.data.MaDV,
          TenDV: response.data.TenDV,
          GiaTien: response.data.GiaTien,
          ChitietDV: response.data.MoTa,
          ThoiGianLamDV: response.data.ThoiGianLamDV,
        };

        setServices(
          services.map((service) =>
            service.MaDV === updatedService.MaDV ? updatedService : service
          )
        );

        // Update ảnh dịch vụ ở đây
        const file = new FormData();
        file.append("AnhDaiDien", selectedFile);
        const res = await axios.patch(
          `http://127.0.0.1:8000/api/dich-vu/${formData.MaDV}/`,
          file,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/dich-vu/",
          {
            TenDV: formData.TenDV,
            MoTa: formData.ChitietDV,
            GiaTien: formData.GiaTien,
            ThoiGianLamDV: formData.ThoiGianLamDV,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const newService = {
          MaDV: response.data.MaDV.toString(),
          TenDV: response.data.TenDV,
          GiaTien: response.data.GiaTien,
          ChitietDV: response.data.MoTa,
          ThoiGianLam: response.data.ThoiGianLamDV.toString(),
        };

        setServices([...services, newService]);
      }

      toast({
        title: "Thành công",
        description: selectedService
          ? "Cập nhật dịch vụ thành công"
          : "Thêm dịch vụ thành công",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error("Lỗi khi xử lý dịch vụ:", error);
      toast({
        title: "Lỗi",
        description: "Không thể xử lý yêu cầu",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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

      <ServiceFormDrawer
        isOpen={isOpen}
        onClose={onClose}
        service={selectedService}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default ServiceAndPrice;
