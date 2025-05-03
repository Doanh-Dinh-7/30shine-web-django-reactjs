import { Box, SimpleGrid, Text, Image, Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import service2 from "../images/service-2.png";
import service3 from "../images/service-3.png";
import service4 from "../images/service-4.png";
import service5 from "../images/service-5.png";
import service6 from "../images/service-6.png";
import service7 from "../images/service-7.png";

const services = [
  {
    TenDV: "Cắt gội khoang thương gia",
    MoTa: ["Combo cắt kỹ", "Combo gội massage"],
    ThoiGian: "50 Phút",
    image: service2,
  },
  {
    TenDV: "Cắt gội Combo 1",
    MoTa: ["Combo cắt kỹ", "Combo gội massage"],
    ThoiGian: "45 Phút",
    image: service3,
  },
  {
    TenDV: "Cắt gội Combo 2",
    MoTa: ["Combo cắt kỹ", "Combo gội massage cổ vai gáy"],
    ThoiGian: "55 Phút",
    image: service4,
  },
  {
    TenDV: "Cắt gội Combo 3",
    MoTa: ["Combo cắt kỹ", "Combo gội massage chăm sóc da"],
    ThoiGian: "65 Phút",
    image: service5,
  },
  {
    TenDV: "Cắt gội Combo 4",
    MoTa: ["Combo cắt kỹ", "Combo gội massage bằng đá nóng"],
    ThoiGian: "75 Phút",
    image: service6,
  },
  {
    TenDV: "Cắt gội Combo 5",
    MoTa: ["Combo cắt kỹ", "Combo gội massage lấy nhân mụn chuyên sâu"],
    ThoiGian: "75 Phút",
    image: service7,
  },
];

const CustomerServiceAndPrice = () => {
  const navigate = useNavigate();

  return (
    <Box p={6} bg="gray.50">
      <Heading fontSize="xl" mb={6} color="blue.700">Dịch vụ nổi bật</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {services.map((service, idx) => (
          <Box 
            key={idx} 
            bg="white" 
            borderRadius="xl" 
            overflow="hidden"
            boxShadow="md"
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
          >
            <Image 
              src={service.image} 
              alt={service.TenDV} 
              w="100%" 
              h="200px" 
              objectFit="cover"
            />
            <Box p={5}>
              <Text 
                fontWeight="bold" 
                fontSize="lg" 
                mb={2}
                color="blue.700"
              >
                {service.TenDV}
              </Text>
              {service.MoTa.map((mota, i) => (
                <Text 
                  key={i} 
                  color="gray.600" 
                  fontSize="sm"
                  mb={1}
                >
                  • {mota}
                </Text>
              ))}
              <Flex mt={4} align="center" justify="space-between">
                <Button 
                  size="sm" 
                  variant="outline" 
                  colorScheme="blue"
                  leftIcon={<Box as="span" fontSize="lg">⏱</Box>}
                >
                  {service.ThoiGian}
                </Button>
                <Button 
                  size="sm" 
                  colorScheme="blue"
                  rightIcon={<Box as="span" fontSize="lg">→</Box>}
                >
                  Tìm hiểu thêm
                </Button>
              </Flex>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      <Flex justify="center" mt={10}>
        <Button
          size="lg"
          colorScheme="blue"
          px={10}
          py={6}
          fontSize="xl"
          fontWeight="bold"
          onClick={() => navigate('/customerappointments')}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'xl',
          }}
          transition="all 0.2s"
        >
          ĐẶT LỊCH NGAY
        </Button>
      </Flex>
    </Box>
  );
};

export default CustomerServiceAndPrice; 