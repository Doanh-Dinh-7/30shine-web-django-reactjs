import React, { useState } from "react";
import {
  Box, Button, Flex, Heading, Select , useDisclosure, useToast, Input, InputGroup, InputLeftElement
} from "@chakra-ui/react";
import { FiPlus, FiSearch } from "react-icons/fi";
import InvoiceTable from "../lib/components/Invoices/InvoiceTable";
import InvoiceFormDrawer from "../lib/components/Invoices/InvoiceFormDrawer";
import InvoiceDetailDrawer from "../lib/components/Invoices/InvoiceDetailDrawer";

const hoaDonList = [
  {
    MaHD: "HD001", MaKH: "KH0001", TongTien: "200.000",
    ThoiGianThanhToan: "10:00 22/06/2024", TrangThaiTT: "chưa thanh toán", TrangThaiHT: "chưa hoàn"
  },
  {
    MaHD: "HD002", MaKH: "KH0002", TongTien: "300.000",
    ThoiGianThanhToan: "9:00 23/02/2025", TrangThaiTT: "chưa thanh toán", TrangThaiHT: "chưa hoàn"
  },
  {
    MaHD: "HD003", MaKH: "KH0003", TongTien: "200.000",
    ThoiGianThanhToan: "12:20 05/02/2025", TrangThaiTT: "chưa thanh toán", TrangThaiHT: "chưa hoàn"
  },
  {
    MaHD: "HD006", MaKH: "KH0006", TongTien: "100.000",
    ThoiGianThanhToan: "16:30 05/02/2025", TrangThaiTT: "đã thanh toán", TrangThaiHT: "chưa hoàn"
  },
  {
    MaHD: "HD007", MaKH: "KH0007", TongTien: "300.000",
    ThoiGianThanhToan: "16:30 05/02/2025", TrangThaiTT: "đã thanh toán", TrangThaiHT: "đã hoàn"
  }
];

const parseDate = (str) => {
  // Format: "HH:mm dd/MM/yyyy"

  const [time, date] = str.split(" ");
  const [day, month, year] = date.split("/").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute);
};

const Invoices = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const detailDrawer = useDisclosure();
  const toast = useToast();

  const [invoices, setInvoices] = useState(hoaDonList);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const filteredInvoices = invoices
    .filter(invoice =>
      invoice.MaHD.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.MaKH.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(invoice => {
      const dateObj = parseDate(invoice.ThoiGianThanhToan);
      const day = dateObj.getDate();
      const month = dateObj.getMonth() + 1;
      const year = dateObj.getFullYear();
      
      return (
        (!selectedDay || day === Number(selectedDay)) &&
        (!selectedMonth || month === Number(selectedMonth)) &&
        (!selectedYear || year === Number(selectedYear))
      );
    })
    .sort((a, b) => parseDate(b.ThoiGianThanhToan) - parseDate(a.ThoiGianThanhToan));

  const handleAddInvoice = () => {
    setSelectedInvoice(null);
    onOpen();
  };

  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    detailDrawer.onOpen();
  };

  const handleDeleteInvoice = (MaHD) => {
    if (window.confirm("Xoá hoá đơn này?")) {
      setInvoices(invoices.filter((inv) => inv.MaHD !== MaHD));
      toast({
        title: "Đã xóa",
        description: "Hóa đơn đã được xóa",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = (formData) => {
    try{
      if (selectedInvoice) {
        // Xử lý cập nhật
        const updatedInvoice = invoices.map((invoice) =>
          invoice.MaHD === formData.MaHD ? formData : invoice
        );
        setInvoice(updatedInvoice);
      } else {
        setInvoices([...invoices, formData]);
      }
    } catch (error) {
      console.error("Lỗi khi xử lý hóa đơn:", error);
      throw error;
    }
  };

  const handleUpdateFromDetail = (updatedInvoice) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.MaHD === updatedInvoice.MaHD ? { ...updatedInvoice } : inv))
    );
    detailDrawer.onClose();
  };

  return (
    <Box p={6} bg="gray.50">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg" color="blue.600">
          Quản lý hóa đơn
        </Heading>
        
        <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={handleAddInvoice}>
          Thêm hóa đơn
        </Button>
        
      </Flex>

      {/* Thanh tìm kiếm */}
      <Flex mb={4} justifyContent="space-between">
        <InputGroup maxW="400px">
          <InputLeftElement pointerEvents="none">
            <FiSearch color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Tìm kiếm theo mã hoá đơn hoặc mã khách hàng"
            value={searchQuery}
            onChange={handleSearchChange}
            bg="white"
          />
        </InputGroup>
        <Flex gap={3}>
          {/* <Select placeholder="Ngày" w="100px" />
          <Select placeholder="Tháng" w="100px" />
          <Select placeholder="Năm" w="100px" /> */}
          <Select placeholder="Ngày" w="100px" onChange={(e) => setSelectedDay(e.target.value)}>
            {[...Array(31)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </Select>
          <Select placeholder="Tháng" w="100px" onChange={(e) => setSelectedMonth(e.target.value)}>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </Select>
          <Select placeholder="Năm" w="100px" onChange={(e) => setSelectedYear(e.target.value)}>
            {[2023, 2024, 2025].map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </Select>
        </Flex>
      </Flex>
      

      <InvoiceTable
        invoices={filteredInvoices}
        onEditInvoice={handleEditInvoice}
        onDeleteInvoice={handleDeleteInvoice}
      />

      <InvoiceFormDrawer
        isOpen={isOpen}
        onClose={onClose}
        invoice={selectedInvoice}
        onSubmit={handleSubmit}
      />

      {selectedInvoice && (
        <InvoiceDetailDrawer
          isOpen={detailDrawer.isOpen}
          onClose={detailDrawer.onClose}
          invoice={selectedInvoice}
          onUpdate={handleUpdateFromDetail}
        />
      )}
    </Box>
  );
};

export default Invoices;
