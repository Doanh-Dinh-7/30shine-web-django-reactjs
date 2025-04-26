import { useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [customers, setCustomers] = useState(mockupData);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const toast = useToast();

  // Xử lý thanh tìm kiếm
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.HoTenKH.toLowerCase().includes(searchQuery) ||
      customer.SDT.toLowerCase().includes(searchQuery) ||
      customer.MaKH.toLowerCase().includes(searchQuery)
  );

  const handleDeleteCustomer = (MaKH) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      setCustomers(customers.filter((customer) => customer.MaKH !== MaKH));
      toast({
        title: "Xóa thành công",
        description: "Khách hàng đã được xóa",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddCustomer = () => {
    setSelectedCustomer(null);
    onOpen();
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    onOpen();
  };

  const handleSubmit = (formData) => {
    try {
      if (selectedCustomer) {
        // Xử lý cập nhật
        const updatedCustomers = customers.map((customer) =>
          customer.MaKH === formData.MaKH ? formData : customer
        );
        setCustomers(updatedCustomers);
      } else {
        // Xử lý thêm mới
        setCustomers([...customers, formData]);
      }
    } catch (error) {
      console.error("Lỗi khi xử lý khách hàng:", error);
      throw error;
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
              onChange={handleSearchChange}
            />
          </InputGroup>
        </Flex>
        <Box bg="blue.50" p={4} borderRadius="xl" boxShadow="md">
          <CustomerTable
            customers={filteredCustomers}
            onEditCustomer={handleEditCustomer}
            onDeleteCustomer={handleDeleteCustomer}
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
