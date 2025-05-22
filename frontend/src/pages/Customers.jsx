import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FiSearch, FiPlus } from "react-icons/fi";
import CustomerFormDrawer from "../lib/components/Customers/CustomerFormDrawer";
import CustomerTable from "../lib/components/Customers/CustomerTable";

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/khach-hang/");
      setCustomers(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khách hàng:", error);
      toast({
        title: "Lỗi",
        description: "Không thể lấy danh sách khách hàng",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thanh tìm kiếm
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.HoTenKH.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.SDT.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.MaKH.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteCustomer = async (MaKH) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/khach-hang/${MaKH}/`);
        setCustomers(customers.filter((customer) => customer.MaKH !== MaKH));
        toast({
          title: "Xóa thành công",
          description: "Khách hàng đã được xóa",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Lỗi khi xóa khách hàng:", error);
        toast({
          title: "Lỗi",
          description: "Không thể xóa khách hàng",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  // const handleAddCustomer = () => {
  //   setSelectedCustomer(null);
  //   onOpen();
  // };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    onOpen();
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedCustomer) {
        // Cập nhật khách hàng
        const response = await axios.put(
          `http://127.0.0.1:8000/api/khach-hang/${formData.MaKH}/`,
          {
            HoTenKH: formData.HoTenKH,
            SDT: formData.SDT,
            Email: formData.Email,
            DiaChi: formData.DiaChi,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setCustomers(
          customers.map((customer) =>
            customer.MaKH === response.data.MaKH ? response.data : customer
          )
        );
      } else {
        // Thêm mới khách hàng
        const response = await axios.post(
          "http://127.0.0.1:8000/api/khach-hang/",
          {
            HoTenKH: formData.HoTenKH,
            SDT: formData.SDT,
            Email: formData.Email,
            DiaChi: formData.DiaChi,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setCustomers([...customers, response.data]);
      }
      toast({
        title: "Thành công",
        description: selectedCustomer
          ? "Cập nhật khách hàng thành công"
          : "Thêm khách hàng thành công",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error("Lỗi khi xử lý khách hàng:", error);
      toast({
        title: "Lỗi",
        description: "Không thể xử lý yêu cầu",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6} bg="gray.50">
      <Flex direction="column" gap={6}>
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Heading size="lg" color="blue.600">
            Quản lý khách hàng
          </Heading>
          {/* <Button
            leftIcon={<FiPlus />}
            colorScheme="blue"
            color="white"
            onClick={handleAddCustomer}
          >
            Thêm khách hàng
          </Button> */}
        </Flex>

        {/* Search Bar */}
        <Flex gap={4}>
          <InputGroup maxW="400px">
            <InputLeftElement pointerEvents="none">
              <FiSearch color="#718096" />
            </InputLeftElement>
            <Input
              placeholder="Tìm kiếm khách hàng..."
              bg="white"
              borderColor="gray.200"
              onChange={handleSearchChange}
            />
          </InputGroup>
        </Flex>
        <Box bg="blue.50" p={4} borderRadius="xl" boxShadow="md">
          <CustomerTable
            customers={filteredCustomers}
            onEditCustomer={handleEditCustomer}
            onDeleteCustomer={handleDeleteCustomer}
            loading={loading}
          />
        </Box>
      </Flex>

      <CustomerFormDrawer
        isOpen={isOpen}
        onClose={onClose}
        customer={selectedCustomer}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Customers;
