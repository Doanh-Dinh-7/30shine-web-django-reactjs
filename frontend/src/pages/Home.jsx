import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Text,
  Image,
  VStack,
  HStack,
} from "@chakra-ui/react";
import {
  FiUsers,
  FiGift,
  FiMapPin,
  FiScissors,
  FiUserCheck,
  FiSearch,
} from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import HeroIamge from "../images/hero-banner.png";
import Logo from "../../public/logo_30shine.png";
import Service1 from "../images/service-1.png";
import Service2 from "../images/service-2.png";
import Service3 from "../images/service-3.png";

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box bg="#F8FAFC" minH="600px" position="relative">
        <Container maxW="container.xl" py={8}>
          <Grid
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            gap={8}
            alignItems="center"
          >
            <Box>
              <Heading
                as="h1"
                size="2xl"
                color="#1E3A8A"
                mb={4}
                fontWeight="bold"
                lineHeight="1.2"
              >
                Đặt lịch giữ chỗ chỉ 30s
              </Heading>
              <Text color="#64748B" fontSize="lg" mb={6}>
                Cắt xong trả tiền, hủy lịch không sao
              </Text>
              <VStack spacing={4} align="stretch">
                <Input
                  placeholder="Nhập số điện thoại"
                  size="lg"
                  bg="white"
                  borderColor="#E2E8F0"
                />
                <Button
                  size="lg"
                  bg="#3B82F6"
                  color="white"
                  _hover={{ bg: "#2563EB" }}
                  width="full"
                >
                  ĐẶT LỊCH NGAY
                </Button>
              </VStack>
              <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={8}>
                <Box textAlign="center">
                  <HStack justify="center" spacing={2} mb={1}>
                    <FiUsers size={24} color="#1E3A8A" />
                    <Text fontSize="2xl" fontWeight="bold" color="#1E3A8A">
                      2500
                    </Text>
                  </HStack>
                  <Text color="#64748B">Users</Text>
                </Box>
                <Box textAlign="center">
                  <HStack justify="center" spacing={2} mb={1}>
                    <FiGift size={24} color="#1E3A8A" />
                    <Text fontSize="2xl" fontWeight="bold" color="#1E3A8A">
                      200
                    </Text>
                  </HStack>
                  <Text color="#64748B">Treasure</Text>
                </Box>
                <Box textAlign="center">
                  <HStack justify="center" spacing={2} mb={1}>
                    <FiMapPin size={24} color="#1E3A8A" />
                    <Text fontSize="2xl" fontWeight="bold" color="#1E3A8A">
                      20
                    </Text>
                  </HStack>
                  <Text color="#64748B">Cities</Text>
                </Box>
              </Grid>
            </Box>
            <Box>
              <Image src={HeroIamge} alt="30Shine Banner" w="full" h="auto" />
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* Search Section */}
      <Box bg="#EFF6FF" py={8}>
        <Container maxW="container.xl">
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
            gap={4}
            bg="white"
            p={4}
            borderRadius="xl"
            shadow="sm"
          >
            <Button
              leftIcon={<FaRegCalendarAlt />}
              variant="outline"
              colorScheme="blue"
              size="lg"
              justifyContent="flex-start"
            >
              Kiểm tra lịch trống
            </Button>
            <Button
              leftIcon={<FiScissors />}
              variant="outline"
              colorScheme="blue"
              size="lg"
              justifyContent="flex-start"
            >
              Dịch vụ
            </Button>
            <Button
              leftIcon={<FiUserCheck />}
              variant="outline"
              colorScheme="blue"
              size="lg"
              justifyContent="flex-start"
            >
              Chọn nhân viên
            </Button>
            <Button
              leftIcon={<FiSearch />}
              bg="#3B82F6"
              color="white"
              size="lg"
              _hover={{ bg: "#2563EB" }}
              justifyContent="flex-start"
            >
              Tìm kiếm
            </Button>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box py={12}>
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" color="#1E3A8A" mb={8}>
            DỊCH VỤ NỔI BẬT
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
            {/* Service Card 1 */}
            <Box bg="white" borderRadius="xl" overflow="hidden" shadow="md">
              <Image
                src={Service1}
                alt="Cắt tóc nam chuyên nghiệp"
                w="full"
                h="250px"
                objectFit="cover"
              />
              <Box p={4}>
                <Heading size="md" mb={2}>
                  Cắt tóc nam chuyên nghiệp
                </Heading>
                <Button colorScheme="blue" variant="outline" size="sm">
                  Tìm hiểu thêm
                </Button>
              </Box>
            </Box>

            {/* Service Card 2 */}
            <Box bg="white" borderRadius="xl" overflow="hidden" shadow="md">
              <Image
                src={Service2}
                alt="Gội đầu & chăm sóc da"
                w="full"
                h="250px"
                objectFit="cover"
              />
              <Box p={4}>
                <Heading size="md" mb={2}>
                  Gội đầu & chăm sóc da
                </Heading>
                <Button colorScheme="blue" variant="outline" size="sm">
                  Tìm hiểu thêm
                </Button>
              </Box>
            </Box>

            {/* Service Card 3 */}
            <Box bg="white" borderRadius="xl" overflow="hidden" shadow="md">
              <Image
                src={Service3}
                alt="Uốn tóc tạo kiểu"
                w="full"
                h="250px"
                objectFit="cover"
              />
              <Box p={4}>
                <Heading size="md" mb={2}>
                  Uốn tóc tạo kiểu
                </Heading>
                <Button colorScheme="blue" variant="outline" size="sm">
                  Tìm hiểu thêm
                </Button>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* Footer CTA */}
      <Box bg="#3B82F6" py={12} color="white">
        <Container maxW="container.xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            gap={6}
          >
            <Box>
              <Image src={Logo} alt="30Shine Logo" h="40px" />
              <Text mt={4}>
                Điểm Tựa Cho Việc Lớn
                <br />
                Kiểu Tóc Đẹp Không Phải Điểm Đến – Mà Là Điểm Khởi Đầu
              </Text>
            </Box>
            <VStack align="stretch" spacing={4}>
              <Heading size="md">Trở thành Khách hàng</Heading>
              <Button
                size="lg"
                colorScheme="whiteAlpha"
                bg="white"
                color="gray.700"
                _hover={{ bg: "whiteAlpha.200" }}
              >
                Đăng ký ngay
              </Button>
            </VStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
