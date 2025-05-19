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
import service2 from "../images/service-2.png";
import service3 from "../images/service-3.png";
import service4 from "../images/service-4.png";
import service5 from "../images/service-5.png";
import service6 from "../images/service-6.png";
import service7 from "../images/service-7.png";
import { StarIcon } from "@chakra-ui/icons";
import React from "react";

const services = [
  {
    TenDV: "Cắt gội khoang thương gia",
    MoTa: ["Combo cắt kỹ", "Combo gội massage"],
    ThoiGian: 55,
    Gia: "350.000đ",
    image: service2,
  },
  {
    TenDV: "Cắt gội Combo 1",
    MoTa: ["Combo cắt kỹ", "Combo gội massage"],
    ThoiGian: 45,
    Gia: "250.000đ",
    image: service3,
  },
  {
    TenDV: "Cắt gội Combo 2",
    MoTa: ["Combo cắt kỹ", "Combo gội massage cổ vai gáy"],
    ThoiGian: 55,
    Gia: "300.000đ",
    image: service4,
  },
  {
    TenDV: "Cắt gội Combo 3",
    MoTa: ["Combo cắt kỹ", "Combo gội massage chăm sóc da"],
    ThoiGian: 65,
    Gia: "400.000đ",
    image: service5,
  },
  {
    TenDV: "Cắt gội Combo 4",
    MoTa: ["Combo cắt kỹ", "Combo gội massage bằng đá nóng"],
    ThoiGian: 75,
    Gia: "450.000đ",
    image: service6,
  },
  {
    TenDV: "Cắt gội Combo 5",
    MoTa: ["Combo cắt kỹ", "Combo gội massage lấy nhân mụn chuyên sâu"],
    ThoiGian: 75,
    Gia: "500.000đ",
    image: service7,
  },
];

// Dữ liệu đánh giá mẫu cho từng dịch vụ
const reviewsData = [
  [
    {
      name: "Nguyễn Văn A",
      rating: 5,
      content:
        "Dịch vụ cắt gội khoang thương gia rất chuyên nghiệp, nhân viên tận tình, không gian sang trọng.",
    },
    {
      name: "Trần Minh B",
      rating: 4,
      content:
        "Cắt tóc đẹp, gội đầu massage thư giãn. Giá hơi cao nhưng xứng đáng.",
    },
    {
      name: "Lê Quốc C",
      rating: 5,
      content: "Rất hài lòng, sẽ quay lại thường xuyên!",
    },
  ],
  [
    {
      name: "Phạm Văn D",
      rating: 4,
      content: "Combo 1 ổn, cắt tóc kỹ, gội đầu sạch sẽ.",
    },
    {
      name: "Ngô Thị E",
      rating: 5,
      content: "Nhân viên thân thiện, cắt tóc đúng ý.",
    },
    { name: "Đỗ Văn F", rating: 4, content: "Dịch vụ tốt, giá hợp lý." },
  ],
  [
    {
      name: "Vũ Văn G",
      rating: 5,
      content: "Massage cổ vai gáy rất đã, cắt tóc cũng đẹp.",
    },
    {
      name: "Bùi Thị H",
      rating: 5,
      content: "Không gian sạch sẽ, dịch vụ chuyên nghiệp.",
    },
    {
      name: "Trịnh Văn I",
      rating: 4,
      content: "Hài lòng với chất lượng dịch vụ.",
    },
  ],
  [
    {
      name: "Nguyễn Văn K",
      rating: 5,
      content: "Chăm sóc da mặt rất tốt, cắt tóc đẹp.",
    },
    {
      name: "Phan Thị L",
      rating: 4,
      content: "Nhân viên nhiệt tình, dịch vụ ổn.",
    },
    {
      name: "Lê Văn M",
      rating: 5,
      content: "Rất thích combo này, thư giãn tuyệt vời.",
    },
  ],
  [
    {
      name: "Trần Văn N",
      rating: 5,
      content: "Massage đá nóng cực kỳ thư giãn, cắt tóc đẹp.",
    },
    {
      name: "Đặng Thị O",
      rating: 4,
      content: "Dịch vụ tốt, giá hơi cao nhưng đáng tiền.",
    },
    { name: "Phạm Văn P", rating: 5, content: "Sẽ giới thiệu cho bạn bè." },
  ],
  [
    {
      name: "Ngô Văn Q",
      rating: 5,
      content: "Lấy nhân mụn chuyên sâu rất sạch, cắt tóc cũng đẹp.",
    },
    {
      name: "Bùi Thị R",
      rating: 5,
      content: "Dịch vụ tuyệt vời, nhân viên chu đáo.",
    },
    {
      name: "Lê Văn S",
      rating: 4,
      content: "Hài lòng với trải nghiệm tại đây.",
    },
  ],
];

const getAverageRating = (reviews) => {
  if (!reviews.length) return 0;
  const sum = reviews.reduce((acc, cur) => acc + cur.rating, 0);
  return (sum / reviews.length).toFixed(1);
};

const CustomerServiceAndPrice = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedServiceIdx, setSelectedServiceIdx] = React.useState(null);

  const handleBooking = () => {
    // Scroll to top before navigating
    window.scrollTo(0, 0);
    navigate("/appointments/addappointment");
  };

  const handleOpenReviews = (idx) => {
    setSelectedServiceIdx(idx);
    onOpen();
  };

  return (
    <Box p={6} bg="gray.50">
      <Heading fontSize="xl" mb={6} color="blue.700">
        Dịch vụ nổi bật
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {services.map((service, idx) => {
          const reviews = reviewsData[idx] || [];
          const avgRating = getAverageRating(reviews);
          return (
            <Box
              key={idx}
              bg="white"
              borderRadius="xl"
              overflow="hidden"
              boxShadow="md"
              transition="all 0.3s"
              _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
            >
              <Image
                src={service.image}
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
                {service.MoTa.map((mota, i) => (
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
                    {service.ThoiGian} Phút
                  </Button>
                  <Text fontSize="lg" fontWeight="bold" color="blue.700">
                    {service.Gia}
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
            reviewsData[selectedServiceIdx].length > 0 ? (
              reviewsData[selectedServiceIdx].map((review, i) => (
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
                      {review.name}
                    </Text>
                    {Array(5)
                      .fill("")
                      .map((_, soSao) => (
                        <Icon
                          as={StarIcon}
                          key={soSao}
                          color={
                            soSao < review.rating ? "yellow.400" : "gray.300"
                          }
                          boxSize={4}
                        />
                      ))}
                  </Flex>
                  <Text color="gray.700">{review.content}</Text>
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
