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
  Pagination,
  IconButton,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const RatingManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
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
  };

  const filteredRatings = ratings.filter(
    (rating) =>
      rating.TenKH.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rating.NoiDung.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

      <Table variant="simple" colorScheme="teal" size="md">
        <Thead>
          <Tr>
            <Th>Mã đánh giá</Th>
            <Th>Tên khách hàng</Th>
            <Th>Đánh giá</Th>
            <Th>Nội dung</Th>
            <Th>Ngày đánh giá</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredRatings.map((rating) => (
            <Tr key={rating.MaDG}>
              <Td>{rating.MaDG}</Td>
              <Td>{rating.TenKH}</Td>
              <Td>{Array(rating.DanhGia).fill("⭐")}</Td>
              <Td>{rating.NoiDung}</Td>
              <Td>{rating.NgayDanhGia}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex mt={5} justify="center">
        <Pagination total={filteredRatings.length} pageSize={5} />
      </Flex>
    </Box>
  );
};

export default RatingManagement;
