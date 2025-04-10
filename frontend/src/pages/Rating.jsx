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

const Rating = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Thêm state cho trang hiện tại
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

  // Logic phân trang
  const totalPages = Math.ceil(filteredRatings.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedRatings = filteredRatings.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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

        {/* Phân trang thủ công */}
        <Flex mt={5} justify="center" align="center" gap={4}>
          <Button
            onClick={handlePrevious}
            isDisabled={currentPage === 1}
            colorScheme="teal"
            size="sm"
          >
            {"<"}
          </Button>
          <Text>
            Trang {currentPage} / {totalPages}
          </Text>
          <Button
            onClick={handleNext}
            isDisabled={currentPage === totalPages}
            colorScheme="teal"
            size="sm"
          >
            {">"}
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Rating;
