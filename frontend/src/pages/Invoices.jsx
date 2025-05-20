import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  useToast,
  Input,
  InputGroup,
  InputLeftElement,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { FiPlus, FiSearch } from "react-icons/fi";
import InvoiceTable from "../lib/components/Invoices/InvoiceTable";
import InvoiceCreateDrawer from "../lib/components/Invoices/InvoiceCreateDrawer";
import InvoiceEditDrawer from "../lib/components/Invoices/InvoiceEditDrawer";
import InvoiceViewDrawer from "../lib/components/Invoices/InvoiceViewDrawer";
import InvoicePrintView from "../lib/components/Invoices/InvoicePrintView";

const parseDate = (str) => {
  if (!str) return null;
  const dateObj = new Date(str);
  return isNaN(dateObj) ? null : dateObj;
};

const Invoices = () => {
  const toast = useToast();
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [invoiceToPrint, setInvoiceToPrint] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/hoa-don/");
        setInvoices(response.data);
      } catch (error) {
        console.error("Có lỗi khi lấy dữ liệu:", error);
        setError("Không thể tải danh sách hóa đơn.");
        toast({
          title: "Lỗi khi tải dữ liệu",
          description: "Không thể tải danh sách hóa đơn.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, [toast]);

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsViewOpen(true);
  };

  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsEditOpen(true);
  };

  const handleDeleteInvoice = async (MaHD) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa hóa đơn này?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/hoa-don/${MaHD}/`);
        setInvoices(invoices.filter((inv) => inv.MaHD !== MaHD));
        toast({
          title: "Đã xóa",
          description: "Hóa đơn đã được xóa thành công.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Lỗi khi xóa hóa đơn:", error);
        const errorMessage =
          error.response?.data?.detail ||
          error.response?.data ||
          "Không thể xóa hóa đơn.";
        toast({
          title: "Lỗi",
          description: JSON.stringify(errorMessage),
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handlePrintInvoice = (invoice) => {
    setInvoiceToPrint(invoice);
    setIsPrintOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (!formData.MaHD || formData.MaHD === "Mới") {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/hoa-don/",
          formData
        );
        setInvoices([...invoices, response.data]);
      } else {
        await axios.put(
          `http://127.0.0.1:8000/api/hoa-don/${formData.MaHD}/`,
          formData
        );
        setInvoices(
          invoices.map((inv) => (inv.MaHD === formData.MaHD ? formData : inv))
        );
      }
    } catch (error) {
      console.error("Lỗi khi lưu hóa đơn:", error);
      throw error;
    }
  };

  const filteredInvoices = invoices
    .filter((invoice) => {
      const MaHDStr = invoice.MaHD ? invoice.MaHD.toString() : "";
      const MaKHStr = invoice.MaKH ? invoice.MaKH.toString() : "";
      return (
        MaHDStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        MaKHStr.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .filter((invoice) => {
      const dateObj = parseDate(invoice.NgayLapHD);
      if (!dateObj) return false;
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();
      return (
        (!selectedDay || day === Number(selectedDay)) &&
        (!selectedMonth || month === Number(selectedMonth)) &&
        (!selectedYear || year === Number(selectedYear))
      );
    })
    .sort((a, b) => parseDate(b.NgayLapHD) - parseDate(a.NgayLapHD));

  return (
    <Box p={6} bg="gray.50">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg" color="blue.600">
          Quản lý hóa đơn
        </Heading>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="blue"
          onClick={() => setIsCreateOpen(true)}
        >
          Thêm hóa đơn
        </Button>
      </Flex>

      <Flex mb={4} justifyContent="space-between">
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Tìm kiếm theo mã hóa đơn hoặc mã khách hàng"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="white"
          />
        </InputGroup>
        <Flex gap={3}>
          <Select
            placeholder="Ngày"
            w="100px"
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {[...Array(31)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
          <Select
            placeholder="Tháng"
            w="100px"
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
          <Select
            placeholder="Năm"
            w="100px"
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {[2023, 2024, 2025].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>

      {loading ? (
        <Flex justify="center" my={10}>
          <Spinner size="lg" />
        </Flex>
      ) : error ? (
        <Text color="red.500" textAlign="center">
          {error}
        </Text>
      ) : (
        <InvoiceTable
          invoices={filteredInvoices}
          onEditInvoice={handleEditInvoice}
          onDeleteInvoice={handleDeleteInvoice}
          onPrintInvoice={handlePrintInvoice}
          onViewInvoice={handleViewInvoice}
        />
      )}

      <InvoiceCreateDrawer
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSubmit={handleSubmit}
      />

      {selectedInvoice && (
        <InvoiceEditDrawer
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          invoice={selectedInvoice}
          onSubmit={handleSubmit}
        />
      )}

      {selectedInvoice && (
        <InvoiceViewDrawer
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          invoice={selectedInvoice}
        />
      )}

      {invoiceToPrint && (
        <Drawer
          isOpen={isPrintOpen}
          onClose={() => setIsPrintOpen(false)}
          size="md"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              Xuất hóa đơn - {invoiceToPrint.MaHD}
            </DrawerHeader>
            <DrawerCloseButton />
            <DrawerBody>
              <InvoicePrintView invoice={invoiceToPrint} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </Box>
  );
};

export default Invoices;