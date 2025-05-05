import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  useDisclosure,
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
} from "@chakra-ui/react";
import { FiPlus, FiSearch } from "react-icons/fi";
import InvoiceTable from "../lib/components/Invoices/InvoiceTable";
import InvoiceFormDrawer from "../lib/components/Invoices/InvoiceFormDrawer";
import InvoiceDetailDrawer from "../lib/components/Invoices/InvoiceDetailDrawer";
import InvoicePrintView from "../lib/components/Invoices/InvoicePrintView";

const hoaDonList = [
  {
    MaHD: "HD001",
    MaKH: "KH0001",
    DichVu: [{ tenDichVu: "Cắt tóc", soLuong: 1 }],
    TongTien: "200.000",
    ThoiGianThanhToan: "10:00 22/06/2024",
    TrangThaiTT: "chưa thanh toán",
    TrangThaiHT: "chưa hoàn",
  },
  {
    MaHD: "HD002",
    MaKH: "KH0002",
    DichVu: [{ tenDichVu: "Cắt tóc", soLuong: 1 }],
    TongTien: "300.000",
    ThoiGianThanhToan: "9:00 23/02/2025",
    TrangThaiTT: "chưa thanh toán",
    TrangThaiHT: "chưa hoàn",
  },
  {
    MaHD: "HD003",
    MaKH: "KH0003",
    DichVu: [{ tenDichVu: "Cắt tóc", soLuong: 1 }],
    TongTien: "200.000",
    ThoiGianThanhToan: "12:20 05/02/2025",
    TrangThaiTT: "chưa thanh toán",
    TrangThaiHT: "chưa hoàn",
  },
  {
    MaHD: "HD006",
    MaKH: "KH0006",
    DichVu: [{ tenDichVu: "Cắt tóc", soLuong: 1 }],
    TongTien: "100.000",
    ThoiGianThanhToan: "16:30 05/02/2025",
    TrangThaiTT: "đã thanh toán",
    TrangThaiHT: "chưa hoàn",
  },
  {
    MaHD: "HD007",
    MaKH: "KH0007",
    DichVu: [{ tenDichVu: "Cắt tóc", soLuong: 1 }],
    TongTien: "300.000",
    ThoiGianThanhToan: "16:30 05/02/2025",
    TrangThaiTT: "đã thanh toán",
    TrangThaiHT: "đã hoàn",
  },
];

const parseDate = (str) => {
  const [time, date] = str.split(" ");
  const [day, month, year] = date.split("/").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute);
};

const Invoices = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const detailDrawer = useDisclosure();
  const toast = useToast();
  const printDrawer = useDisclosure();

  const [invoices, setInvoices] = useState(hoaDonList);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [invoiceToPrint, setInvoiceToPrint] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredInvoices = invoices
    .filter(
      (invoice) =>
        invoice.MaHD.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.MaKH.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((invoice) => {
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
    .sort(
      (a, b) => parseDate(b.ThoiGianThanhToan) - parseDate(a.ThoiGianThanhToan)
    );

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

  const handlePrintInvoice = (invoice) => {
    setInvoiceToPrint(invoice);
    printDrawer.onOpen();
  };

  const handleSubmit = (formData) => {
    if (!formData.MaHD || formData.MaHD === "Mới") {
      const maxNum = invoices.reduce((max, inv) => {
        const num = parseInt(inv.MaHD.replace("HD", ""));
        return num > max ? num : max;
      }, 0);
      formData.MaHD = `HD${(maxNum + 1).toString().padStart(3, "0")}`;
    }
    if (selectedInvoice) {
      const updatedInvoice = invoices.map((invoice) =>
        invoice.MaHD === formData.MaHD ? formData : invoice
      );
      setInvoices(updatedInvoice);
    } else {
      setInvoices([...invoices, formData]);
    }
  };

  const handleUpdateFromDetail = (updatedInvoice) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.MaHD === updatedInvoice.MaHD ? { ...updatedInvoice } : inv
      )
    );
    detailDrawer.onClose();
  };

  return (
    <Box p={6} bg="gray.50">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading size="lg" color="blue.600">
          Quản lý hóa đơn
        </Heading>
        <Button
          leftIcon={<FiPlus />}
          colorScheme="blue"
          onClick={handleAddInvoice}
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
            placeholder="Tìm kiếm theo mã hoá đơn hoặc mã khách hàng"
            value={searchQuery}
            onChange={handleSearchChange}
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

      <InvoiceTable
        invoices={filteredInvoices}
        onEditInvoice={handleEditInvoice}
        onDeleteInvoice={handleDeleteInvoice}
        onPrintInvoice={handlePrintInvoice}
      />
      <InvoiceFormDrawer
        isOpen={isOpen}
        onClose={onClose}
        invoice={selectedInvoice}
        onSubmit={handleSubmit}
        invoices={invoices}
      />
      {selectedInvoice && (
        <InvoiceDetailDrawer
          isOpen={detailDrawer.isOpen}
          onClose={detailDrawer.onClose}
          invoice={selectedInvoice}
          onUpdate={handleUpdateFromDetail}
        />
      )}
      {invoiceToPrint && (
        <Drawer
          isOpen={printDrawer.isOpen}
          onClose={printDrawer.onClose}
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
