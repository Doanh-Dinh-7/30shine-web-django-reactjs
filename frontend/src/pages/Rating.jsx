import { useEffect, useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import "../assets/styles/paginate.css";
import axios from "axios";

const Rating = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // Thêm state cho trang hiện tại
  const pageSize = 5; // Số lượng đánh giá mỗi trang
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/danh-gia/");
      setRatings(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đánh giá của khách hàng:", error);
      toast({
        title: "Lỗi",
        description: "Không thể lấy danh sách đánh giá của khách hàng",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const filteredRatings = ratings.filter((rating) => {
    const customerName = rating.ten_khach_hang || "";
    const reviewContent = rating.NoiDung || "";

    return (
      customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reviewContent.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

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
        />
        <IconButton
          aria-label="Search database"
          icon={<FaSearch />}
          isDisabled={true}
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
                <Td>{rating.ten_khach_hang || "N/A"}</Td>
                <Td>{Array(rating.DiemDanhGia).fill("⭐")}</Td>
                <Td>{rating.NoiDung || "Không có nội dung"}</Td>
                <Td>{rating.NgayDanhGia}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {pageCount > 1 && (
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
        )}
      </Box>
    </Box>
  );
};

export default Rating;
