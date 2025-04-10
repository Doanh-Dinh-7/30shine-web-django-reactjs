import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FiSearch, FiPlus } from "react-icons/fi";
import CustomerForm from "../lib/components/Customers/CustomerForm";
import CustomerTable from "../lib/components/Customers/CustomerTable";

const Customers = () => {
  const mockupData = [
    {
      MaKH: "KH001",
      HoTenKH: "Nguyễn Văn A",
      SDT: "0123456789",
      Email: "nguyenvana@gmail.com",
    },
    {
      MaKH: "KH002",
      HoTenKH: "Trần Thị B",
      SDT: "0987654321",
      Email: "tranthib@gmail.com",
    },
    {
      MaKH: "KH003",
      HoTenKH: "Đinh Văn C",
      SDT: "0987656789",
      Email: "tranvana@gmail.com",
    },
    {
      MaKH: "KH004",
      HoTenKH: "Đinh Văn D",
      SDT: "0987656789",
      Email: "tranvana@gmail.com",
    },
    {
      MaKH: "KH005",
      HoTenKH: "Đinh Văn E",
      SDT: "0987656789",
      Email: "tranvana@gmail.com",
    },
  ];
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [customers, setCustomers] = useState(mockupData);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    setFilteredCustomers(customers);
    console.log("Filtered Customers: ", filteredCustomers);
  }, [customers, filteredCustomers]);

  // Xử lý thanh tìm kiếm
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filtered = customers.filter(
      (employee) =>
        employee.HoTenNV.toLowerCase().includes(searchTerm) ||
        employee.SDT.toLowerCase().includes(searchTerm) ||
        employee.MaNV.toLowerCase().includes(searchTerm)
    );
    setFilteredCustomers(filtered);
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    onOpen();
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    onOpen();
  };

  const handleDeleteCustomer = (customerId) => {
    // Xử lý xóa khách hàng
  };

  const handleSubmit = (formData) => {
    // Xử lý thêm/sửa khách hàng
    onClose();
  };

  return (
    <Box p={6} bg="gray.50">
      <Flex direction="column" gap={6}>
        {/* Header */}
        <Flex justify="space-between" align="center">
          <Heading size="lg" color="blue.600">
            Quản lý khách hàng
          </Heading>
          <Button
            leftIcon={<FiPlus />}
            colorScheme="blue"
            color="white"
            onClick={handleAddCustomer}
          >
            Thêm khách hàng
          </Button>
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
              onChange={handleSearch}
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

      <CustomerForm
        isOpen={isOpen}
        onClose={onClose}
        customer={selectedCustomer}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Customers;
