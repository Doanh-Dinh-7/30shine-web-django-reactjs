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
  Text,
  Button,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import "../assets/styles/paginate.css";

const Rating = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // Thêm state cho trang hiện tại
  const pageSize = 5; // Số lượng đánh giá mỗi trang

  const [ratings, setRatings] = useState([
    {
      MaDG: "DG001",
      TenKH: "Nguyễn Anh Tú",
      DanhGia: 5,
      NoiDung: "Dịch vụ tuyệt vời",
      NgayDanhGia: "17/10/2025",
    },
    {
      MaDG: "DG002",
      TenKH: "Đinh Sỹ Quốc Doanh",
      DanhGia: 4,
      NoiDung: "Rất đáng tiền",
      NgayDanhGia: "17/10/2024",
    },
    {
      MaDG: "DG003",
      TenKH: "Nguyễn Hoàng",
      DanhGia: 5,
      NoiDung: "Nhân viên nhiệt tình, có sự chu đáo trong việc tiếp đón",
      NgayDanhGia: "22/10/2024",
    },
    {
      MaDG: "DG004",
      TenKH: "Lê Nguyễn Ngọc Tú Hương",
      DanhGia: 3,
      NoiDung: "Trải nghiệm rất tuyệt vời",
      NgayDanhGia: "17/10/2024",
    },
    {
      MaDG: "DG005",
      TenKH: "Lê Đức Kiên",
      DanhGia: 4,
      NoiDung: "Dịch vụ ổn",
      NgayDanhGia: "20/10/2024",
    },
    {
      MaDG: "DG006",
      TenKH: "Nguyễn Thanh Tùng",
      DanhGia: 5,
      NoiDung: "Rất đáng tiền",
      NgayDanhGia: "25/10/2024",
    },
  ]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
  };

  const filteredRatings = ratings.filter(
    (rating) =>
      rating.TenKH.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rating.NoiDung.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Phân trang logic
  const pageCount = Math.ceil(filteredRatings.length / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedRatings = filteredRatings.slice(startIndex, endIndex);

  // Handle page change
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <Box p={5} bg="white" borderRadius="lg" boxShadow="md">
      <Flex mb={5} justify="space-between" align="center">
        <Input
          placeholder="Tìm kiếm đánh giá"
          value={searchQuery}
          onChange={handleSearchChange}
          width="300px"
          borderColor="gray.300"
          rightElement={<IconButton icon={<FaSearch />} />}
        />
      </Flex>

      <Box bg="blue.50" p={4} borderRadius="xl" boxShadow="md">
        <Table variant="simple" bg="white" borderRadius="lg" shadow="sm">
          <Thead bg="gray.100">
            <Tr>
              <Th>Mã đánh giá</Th>
              <Th>Tên khách hàng</Th>
              <Th>Đánh giá</Th>
              <Th>Nội dung</Th>
              <Th>Ngày đánh giá</Th>
            </Tr>
          </Thead>
          <Tbody>
            {paginatedRatings.map((rating) => (
              <Tr key={rating.MaDG} _hover={{ bg: "gray.100" }}>
                <Td>{rating.MaDG}</Td>
                <Td>{rating.TenKH}</Td>
                <Td>{Array(rating.DanhGia).fill("⭐")}</Td>
                <Td>{rating.NoiDung}</Td>
                <Td>{rating.NgayDanhGia}</Td>
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
    </Box>
  );
};

export default Rating;
