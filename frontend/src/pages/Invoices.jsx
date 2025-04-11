import React, { useState } from "react";
import {
  Box, Button, Input, Select, Table, Thead, Tbody, Tr, Th, Td,
  IconButton, Text, Flex
} from "@chakra-ui/react";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";
import { FaDotCircle } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import "../assets/styles/paginate.css";

const hoaDonList = [
  {
    MaHD: "HD001", MaKH: "KH0001", TongTien: "200.000",
    ThoiGianThanhToan: "10:00 22/06/2024", TrangThaiTT: "chưa thanh toán", TrangThaiHT: "đã hoàn"
  },
  {
    MaHD: "HD002", MaKH: "KH0002", TongTien: "300.000",
    ThoiGianThanhToan: "9:00 23/2/2025", TrangThaiTT: "chưa thanh toán", TrangThaiHT: "đã hoàn"
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
    ThoiGianThanhToan: "16:30 05/02/2025", TrangThaiTT: "đã thanh toán", TrangThaiHT: "chưa hoàn"
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
  const [invoices, setInvoices] = useState(hoaDonList)
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // Thêm state cho trang hiện tại
  const pageSize = 10; // Số lượng đánh giá mỗi trang

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
  .sort((a, b) => parseDate(b.ThoiGianThanhToan) - parseDate(a.ThoiGianThanhToan)); // Mới nhất lên đầu



  // Phân trang logic
  const pageCount = Math.ceil(filteredInvoices.length / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedInvoices = filteredInvoices.slice(startIndex, endIndex);
  
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  

  return (
    <Box bg="#e8f0ff" borderRadius="xl" p={8}>
      <Flex justify="space-between" align="center" mb={4}>
        <Button colorScheme="blue" leftIcon={<MdAdd />}>
          Thêm hóa đơn
        </Button>
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

      <Input
        placeholder="Tìm kiếm theo mã hóa đơn"
        maxW="300px"
        mb={4}
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <Table bg="white" variant="simple" borderRadius="lg" boxShadow="md">
        <Thead bg="gray.100">
          <Tr>
            <Th><input type="checkbox" /></Th>
            <Th>Mã hóa đơn</Th>
            <Th>Mã khách hàng</Th>
            <Th>Tổng tiền</Th>
            <Th>Thời gian</Th>
            <Th>Trạng thái</Th>
            <Th>Tác vụ</Th>
            <Th>Yêu cầu hoàn tiền</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedInvoices.map((hd, idx) => (
            <Tr key={idx}>
              <Td><input type="checkbox" /></Td>
              <Td>{hd.MaHD}</Td>
              <Td>{hd.MaKH}</Td>
              <Td fontWeight="bold">{hd.TongTien}</Td>
              <Td>{hd.ThoiGianThanhToan}</Td>
              <Td color={hd.TrangThaiTT === "chưa thanh toán" ? "red.500" : "green.500"} fontWeight="bold">
                {hd.TrangThaiTT === "chưa thanh toán" ? "Chưa thanh toán" : "Đã thanh toán"}
              </Td>
              <Td>
                <Flex gap={2}>
                  <IconButton size="sm" icon={<MdEdit />} aria-label="edit" />
                  <IconButton size="sm" icon={<MdDelete />} aria-label="delete" />
                </Flex>
              </Td>
              <Td>
                {hd.TrangThaiHT === "đã hoàn" && <FaDotCircle color="red" />}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* ReactPaginate component */}
      <Flex mt={5} justify="center">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            previousLinkClassName={"previous-link"}
            nextLinkClassName={"next-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"break-link"}
            forcePage={currentPage}
          />
        </Flex>
    </Box>
  );
};

export default Invoices;
