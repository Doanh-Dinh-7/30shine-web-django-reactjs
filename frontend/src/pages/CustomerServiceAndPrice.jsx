import {
  Box,
  SimpleGrid,
  Text,
  Image,
  Button,
  Flex,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Icon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/400x200?text=No+Image";

const getAverageRating = (reviews) => {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, cur) => acc + (cur.DiemDanhGia || 0), 0);
  return (sum / reviews.length).toFixed(1);
};

const CustomerServiceAndPrice = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [services, setServices] = useState([]);
  const [selectedServiceIdx, setSelectedServiceIdx] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/dich-vu/dichvu_kem_danhgia/"
        );
        console.log(res.data);
        setServices(res.data);
      } catch {
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleBooking = () => {
    // Scroll to top before navigating
    window.scrollTo(0, 0);
    navigate("/appointments/addappointment");
  };

  const handleOpenReviews = (idx) => {
    setSelectedServiceIdx(idx);
    onOpen();
  };

  if (loading) {
    return (
      <Box p={6} bg="gray.50">
        <Text>Đang tải dữ liệu dịch vụ...</Text>
      </Box>
    );
  }

  return (
    <Box p={6} bg="gray.50">
      <Heading fontSize="xl" mb={6} color="blue.700">
        Dịch vụ nổi bật
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {services.map((service, idx) => {
          const moTaArr = service.MoTa
            ? service.MoTa.split(/;|\n/)
                .map((s) => s.trim())
                .filter(Boolean)
            : [];
          const reviews = service.danh_gia || [];
          const avgRating = getAverageRating(reviews);
          return (
            <Box
              key={service.MaDV}
              bg="white"
              borderRadius="xl"
              overflow="hidden"
              boxShadow="md"
              transition="all 0.3s"
              _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
            >
              <Image
                src={service.AnhDaiDien || PLACEHOLDER_IMAGE}
                alt={service.TenDV}
                w="100%"
                h="200px"
                objectFit="cover"
              />
              <Box p={5}>
                <Text fontWeight="bold" fontSize="lg" mb={2} color="blue.700">
                  {service.TenDV}
                </Text>
                <Flex align="center" mb={2}>
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <Icon
                        as={StarIcon}
                        key={i}
                        color={
                          i < Math.round(avgRating) ? "yellow.400" : "gray.300"
                        }
                        boxSize={5}
                      />
                    ))}
                  <Text ml={2} fontWeight="bold" color="gray.700">
                    {avgRating}/5
                  </Text>
                </Flex>
                {moTaArr.map((mota, i) => (
                  <Text key={i} color="gray.600" fontSize="sm" mb={1}>
                    • {mota}
                  </Text>
                ))}
                <Flex mt={4} align="center" justify="space-between">
                  <Button
                    size="sm"
                    variant="outline"
                    colorScheme="blue"
                    leftIcon={
                      <Box as="span" fontSize="lg">
                        ⏱
                      </Box>
                    }
                  >
                    {service.ThoiGianLamDV} Phút
                  </Button>
                  <Text fontSize="lg" fontWeight="bold" color="blue.700">
                    {Number(service.GiaTien).toLocaleString("vi-VN")} VNĐ
                  </Text>
                </Flex>
                <Button
                  mt={4}
                  size="sm"
                  colorScheme="yellow"
                  variant="outline"
                  onClick={() => handleOpenReviews(idx)}
                >
                  Xem đánh giá
                </Button>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>

      <Flex justify="center" mt={10}>
        <Button
          size="lg"
          colorScheme="blue"
          px={10}
          py={6}
          fontSize="xl"
          fontWeight="bold"
          onClick={handleBooking}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "xl",
          }}
          transition="all 0.2s"
        >
          ĐẶT LỊCH NGAY
        </Button>
      </Flex>

      {/* Modal hiển thị đánh giá */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Đánh giá dịch vụ:{" "}
            {selectedServiceIdx !== null
              ? services[selectedServiceIdx].TenDV
              : ""}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedServiceIdx !== null &&
            (services[selectedServiceIdx].danh_gia || []).length > 0 ? (
              services[selectedServiceIdx].danh_gia.map((review, i) => (
                <Box
                  key={i}
                  mb={5}
                  p={3}
                  borderWidth={1}
                  borderRadius="md"
                  bg="gray.50"
                >
                  <Flex align="center" mb={1}>
                    <Text fontWeight="bold" mr={2}>
                      {review.ten_khach_hang || "Ẩn danh"}
                    </Text>
                    {Array(5)
                      .fill("")
                      .map((_, soSao) => (
                        <Icon
                          as={StarIcon}
                          key={soSao}
                          color={
                            soSao < (review.DiemDanhGia || 0)
                              ? "yellow.400"
                              : "gray.300"
                          }
                          boxSize={4}
                        />
                      ))}
                  </Flex>
                  <Text color="gray.700">{review.NoiDung || ""}</Text>
                </Box>
              ))
            ) : (
              <Text>Chưa có đánh giá nào cho dịch vụ này.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme="blue">
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CustomerServiceAndPrice;
