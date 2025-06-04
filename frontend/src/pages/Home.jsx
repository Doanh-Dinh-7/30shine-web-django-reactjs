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
} from "@chakra-ui/react";
import HeroImage from "../images/hero-banner.png";
import Service1 from "../images/service-1.png";
import Service2 from "../images/service-2.png";
import Service3 from "../images/service-3.png";
import Service4 from "../images/service-4.png";
import Service5 from "../images/service-5.png";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../lib/components/Auth/RegisterModal";
import LoginModal from "../lib/components/Auth/LoginModal";
import { FaArrowUp, FaPhoneAlt, FaPhone, FaStar } from "react-icons/fa";

// Thêm các dịch vụ mẫu
const services = [
  {
    img: Service1,
    title: "Cắt tóc nam chuyên nghiệp",
    desc: "",
  },
  {
    img: Service2,
    title: "Cạo mặt & chăm sóc da",
    desc: "",
  },
  {
    img: Service3,
    title: "Gội đầu thư giãn",
    desc: "",
  },
  {
    img: Service4,
    title: "Cắt tạo kiểu Undercut Quiff",
    desc: "Chí Thành (Đen Vâu)",
  },
  {
    img: Service5,
    title: "Uốn tóc tạo kiểu",
    desc: "",
  },
  {
    img: Service5,
    title: "Nhuộm tóc thời trang",
    desc: "Màu Cherry",
  },
];

function RatingStars() {
  const [hovered, setHovered] = useState(0);
  const [selected, setSelected] = useState(1);
  return (
    <Flex gap={1} align="center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Box
          as="span"
          key={star}
          cursor="pointer"
          fontSize="3xl"
          color={star <= (hovered || selected) ? "yellow.400" : "gray.300"}
          transition="color 0.2s"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => setSelected(star)}
          _hover={{ transform: "scale(1.2)", color: "yellow.300" }}
        >
          ★
        </Box>
      ))}
    </Flex>
  );
}

// Floating action buttons with fan menu
function FloatingButtons() {
  const [open, setOpen] = useState(false);
  const { containerRef } = useOutletContext?.() || {};
  const handleScrollTop = (e) => {
    e.preventDefault();
    if (containerRef && containerRef.current && containerRef.current.scrollTo) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Fan menu items
  const fanItems = [
    {
      icon: <FaPhone size={22} />,
      label: "Hotline",
      color: "#17408B",
      href: "tel:1900272703",
    },
    {
      icon: <FaPhoneAlt size={22} />,
      label: "Học nghề",
      color: "#17408B",
      href: "tel:0967863030",
    },
    {
      icon: <FaStar size={22} color="#FFD600" />,
      label: "Đánh giá dịch vụ",
      color: "#17408B",
      onClick: () =>
        document
          .getElementById("booking")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
  ];

  // Fan menu angles (adjusted to match the image layout: ~45°, 90°, 135°)
  const fanAngles = [
    (250 * Math.PI) / 180,
    (210 * Math.PI) / 180,
    (180 * Math.PI) / 180,
  ];
  const radius = 120; // Adjusted radius for better spacing

  return (
    <>
      {open && (
        <Box
          position="fixed"
          zIndex={1000}
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          bg="blackAlpha.600"
          onClick={() => setOpen(false)}
        />
      )}

      <Box
        position="fixed"
        zIndex={1200}
        right={{ base: 4, md: 8 }}
        bottom={8}
        display="flex"
        flexDirection="column"
        alignItems="end"
        gap={4}
      >
        <Button
          onClick={handleScrollTop}
          bg="#17408B"
          color="white"
          borderRadius="full"
          boxSize={12}
          boxShadow="lg"
          _hover={{ bg: "#2563EB" }}
        >
          <FaArrowUp size={20} />
        </Button>

        <Box position="relative">
          <Button
            onClick={() => setOpen((v) => !v)}
            bg="#17408B"
            color="white"
            borderRadius="full"
            boxSize={12}
            boxShadow="lg"
            _hover={{ bg: "#2563EB" }}
          >
            {open ? (
              <Box as="span" fontSize="2xl" fontWeight="bold">
                ×
              </Box>
            ) : (
              <FaPhoneAlt size={20} />
            )}
          </Button>

          {/* Fan menu */}
          <Box
            position="absolute"
            right={0}
            bottom={0}
            pointerEvents={open ? "auto" : "none"}
          >
            {fanItems.map((item, idx) => {
              const angle = fanAngles[idx];
              // Adjust x and y for right-to-left fan spread
              const x = Math.cos(angle) * (open ? radius : 0);
              const y = -Math.sin(angle) * (open ? radius : 0);

              return (
                <Flex
                  key={item.label}
                  align="center"
                  position="absolute"
                  right={-x}
                  bottom={y}
                  opacity={open ? 1 : 0}
                  transform={`scale(${open ? 1 : 0.5})`}
                  transition="all 0.3s cubic-bezier(.4,2,.6,1)"
                  zIndex={open ? 2 : -1}
                  pointerEvents={open ? "auto" : "none"}
                >
                  <Button
                    as={item.href ? "a" : "button"}
                    href={item.href}
                    target={item.href ? "_blank" : undefined}
                    onClick={(e) => {
                      e.stopPropagation();
                      item.onClick && item.onClick();
                      setOpen(false);
                    }}
                    leftIcon={item.icon}
                    bg="white"
                    color={item.color}
                    borderRadius="full"
                    boxShadow="lg"
                    minW={12}
                    h={12}
                    fontWeight="bold"
                    _hover={{ bg: "#E5EDFF" }}
                    p={2}
                  >
                    {item.label}
                  </Button>
                </Flex>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
}

const Home = () => {
  const { onOpenRegister, isRegisterOpen, onCloseRegister } =
    useOutletContext?.() || {};
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const handleOpenLogin = () => {
    setShowLogin(true);
    onCloseRegister?.();
  };
  const handleOpenRegister = () => {
    setShowLogin(false);
    onOpenRegister?.();
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box id="hero" bg="#fff" minH="600px" position="relative" pt="100px">
        <Container maxW="container.xl" py={8}>
          <Grid
            templateColumns={{ base: "1fr", md: "1.2fr 1fr" }}
            gap={8}
            alignItems="center"
          >
            <Box w="full">
              <Heading
                as="h1"
                size="2xl"
                color="#1E3A8A"
                mb={2}
                fontWeight="bold"
                lineHeight="1.2"
              >
                Đặt lịch giữ chỗ chỉ 30s
              </Heading>
              <Text color="#A0AEC0" fontSize="lg" mb={8}>
                Cắt xong trả tiền, hủy lịch không sao
              </Text>
              {/* Đặt lịch ngay */}
              <Box
                id="booking"
                bg="#17408B"
                borderRadius="2xl"
                p={6}
                boxShadow="lg"
                color="white"
                mb={4}
              >
                <Flex gap={4}>
                  <Input
                    placeholder="Nhập SĐT để đặt lịch"
                    size="lg"
                    bg="white"
                    color="gray.700"
                    borderRadius="lg"
                    _placeholder={{ color: "gray.400" }}
                    flex={1}
                  />
                  <Button
                    size="lg"
                    bgGradient="linear(to-r, #2563EB, #60A5FA)"
                    color="white"
                    borderRadius="lg"
                    fontWeight="bold"
                    px={8}
                    _hover={{ bg: "#17408B" }}
                    onClick={() => navigate("/appointments")}
                  >
                    ĐẶT LỊCH NGAY
                  </Button>
                </Flex>
              </Box>
              {/* Đánh giá dưới đặt lịch */}
              <Box
                bg="white"
                borderRadius="xl"
                p={6}
                boxShadow="md"
                color="#17408B"
                minW="220px"
                mt={4}
              >
                <Text fontWeight="bold" fontSize="md" mb={1}>
                  MỜI ANH ĐÁNH GIÁ CHẤT LƯỢNG PHỤC VỤ
                </Text>
                <Text fontSize="sm" color="gray.600" mb={2}>
                  Phản hồi của anh sẽ giúp chúng em cải thiện chất lượng dịch vụ
                  tốt hơn
                </Text>
                <RatingStars />
              </Box>
            </Box>
            <Box>
              <Box
                bg="#fff"
                borderRadius="2xl"
                boxShadow="lg"
                p={0}
                overflow="hidden"
              >
                <Image
                  src={HeroImage}
                  alt="30Shine Banner"
                  w="full"
                  h="auto"
                  borderTopLeftRadius="2xl"
                  borderTopRightRadius="2xl"
                />
                {/* Banner overlay nếu cần */}
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Box id="services" py={12} bg="#F6F9FF">
        <Container maxW="container.xl">
          <Heading as="h2" size="xl" color="#1E3A8A" mb={8} fontWeight="bold">
            DỊCH VỤ NỔI BẬT
          </Heading>
          <Grid templateColumns={{ base: "1fr", md: "1.5fr 1fr 1fr" }} gap={6}>
            {/* Dịch vụ lớn bên trái */}
            <Box
              rowSpan={2}
              bg="#fff"
              borderRadius="2xl"
              boxShadow="md"
              overflow="hidden"
              position="relative"
            >
              <Image
                src={services[0].img}
                alt={services[0].title}
                w="full"
                h="320px"
                objectFit="cover"
              />
              <Button
                position="absolute"
                top={4}
                right={4}
                bg="#2563EB"
                color="white"
                borderRadius="lg"
                size="md"
                fontWeight="bold"
                _hover={{ bg: "#1E40AF" }}
                onClick={() => navigate("/services")}
              >
                Tìm hiểu thêm
              </Button>
              <Text
                position="absolute"
                bottom={4}
                left={4}
                color="#fff"
                fontWeight="bold"
                fontSize="xl"
                textShadow="0 2px 8px #0008"
              >
                {services[0].title}
              </Text>
            </Box>
            {/* 2 dịch vụ nhỏ bên phải */}
            <VStack spacing={6} align="stretch">
              <Box
                bg="#fff"
                borderRadius="2xl"
                boxShadow="md"
                overflow="hidden"
                position="relative"
              >
                <Image
                  src={services[1].img}
                  alt={services[1].title}
                  w="full"
                  h="150px"
                  objectFit="cover"
                />
                <Button
                  position="absolute"
                  top={4}
                  right={4}
                  bg="#2563EB"
                  color="white"
                  borderRadius="lg"
                  size="sm"
                  fontWeight="bold"
                  _hover={{ bg: "#1E40AF" }}
                  onClick={() => navigate("/services")}
                >
                  Tìm hiểu thêm
                </Button>
                <Text
                  position="absolute"
                  bottom={4}
                  left={4}
                  color="#fff"
                  fontWeight="bold"
                  fontSize="md"
                  textShadow="0 2px 8px #0008"
                >
                  {services[1].title}
                </Text>
              </Box>
              <Box
                bg="#fff"
                borderRadius="2xl"
                boxShadow="md"
                overflow="hidden"
                position="relative"
              >
                <Image
                  src={services[2].img}
                  alt={services[2].title}
                  w="full"
                  h="150px"
                  objectFit="cover"
                />
                <Button
                  position="absolute"
                  top={4}
                  right={4}
                  bg="#2563EB"
                  color="white"
                  borderRadius="lg"
                  size="sm"
                  fontWeight="bold"
                  _hover={{ bg: "#1E40AF" }}
                  onClick={() => navigate("/services")}
                >
                  Tìm hiểu thêm
                </Button>
                <Text
                  position="absolute"
                  bottom={4}
                  left={4}
                  color="#fff"
                  fontWeight="bold"
                  fontSize="md"
                  textShadow="0 2px 8px #0008"
                >
                  {services[2].title}
                </Text>
              </Box>
            </VStack>
            {/* 2 dịch vụ nhỏ bên dưới */}
            <VStack spacing={6} align="stretch">
              <Box
                bg="#fff"
                borderRadius="2xl"
                boxShadow="md"
                overflow="hidden"
                position="relative"
              >
                <Image
                  src={services[3].img}
                  alt={services[3].title}
                  w="full"
                  h="150px"
                  objectFit="cover"
                />
                <Button
                  position="absolute"
                  top={4}
                  right={4}
                  bg="#2563EB"
                  color="white"
                  borderRadius="lg"
                  size="sm"
                  fontWeight="bold"
                  _hover={{ bg: "#1E40AF" }}
                  onClick={() => navigate("/services")}
                >
                  Tìm hiểu thêm
                </Button>
                <Text
                  position="absolute"
                  bottom={4}
                  left={4}
                  color="#fff"
                  fontWeight="bold"
                  fontSize="md"
                  textShadow="0 2px 8px #0008"
                >
                  {services[3].title}
                </Text>
              </Box>
              <Box
                bg="#fff"
                borderRadius="2xl"
                boxShadow="md"
                overflow="hidden"
                position="relative"
              >
                <Image
                  src={services[4].img}
                  alt={services[4].title}
                  w="full"
                  h="150px"
                  objectFit="cover"
                />
                <Button
                  position="absolute"
                  top={4}
                  right={4}
                  bg="#2563EB"
                  color="white"
                  borderRadius="lg"
                  size="sm"
                  fontWeight="bold"
                  _hover={{ bg: "#1E40AF" }}
                  onClick={() => navigate("/services")}
                >
                  Tìm hiểu thêm
                </Button>
                <Text
                  position="absolute"
                  bottom={4}
                  left={4}
                  color="#fff"
                  fontWeight="bold"
                  fontSize="md"
                  textShadow="0 2px 8px #0008"
                >
                  {services[4].title}
                </Text>
              </Box>
            </VStack>
          </Grid>
          {/* Dịch vụ nổi bật thêm */}
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={6}
            mt={8}
          >
            {services.slice(5).map((s, idx) => (
              <Box
                key={idx}
                bg="#fff"
                borderRadius="2xl"
                boxShadow="md"
                overflow="hidden"
                position="relative"
              >
                <Image
                  src={s.img}
                  alt={s.title}
                  w="full"
                  h="150px"
                  objectFit="cover"
                />
                <Button
                  position="absolute"
                  top={4}
                  right={4}
                  bg="#2563EB"
                  color="white"
                  borderRadius="lg"
                  size="sm"
                  fontWeight="bold"
                  _hover={{ bg: "#1E40AF" }}
                  onClick={() => navigate("/services")}
                >
                  Tìm hiểu thêm
                </Button>
                <Text
                  position="absolute"
                  bottom={4}
                  left={4}
                  color="#fff"
                  fontWeight="bold"
                  fontSize="md"
                  textShadow="0 2px 8px #0008"
                >
                  {s.title}
                </Text>
              </Box>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Box id="about" py={12} bg="#F6F9FF">
        <Container maxW="container.xl">
          <Box mb={12}>
            <Heading as="h2" size="xl" color="#1E3A8A" fontWeight="bold" mb={4}>
              <Box as="span" borderLeft="6px solid #2563EB" pl={3} mr={2}>
                30SHINE - ĐIỂM TỰA CHO VIỆC LỚN
              </Box>
            </Heading>
            <Text fontStyle="italic" color="#1E3A8A" mb={2}>
              &quot;Hãy cho tôi một điểm tựa, tôi sẽ nâng cả thế giới.&quot; -
              Archimedes
            </Text>
            <Text color="#1E3A8A">
              Mỗi người đàn ông đều có một hành trình riêng, một thế giới muốn
              chinh phục
            </Text>
            <Text color="#1E3A8A">
              Có người đang tiến về đích, có người vẫn đang tìm hướng đi
            </Text>
            <Text color="#1E3A8A">
              Có người biết chính xác điều mình muốn, có người đang từng bước
              khám phá
            </Text>
            <Text color="#1E3A8A" fontWeight="bold">
              Dù anh đang ở đâu trên hành trình ấy – bản lĩnh và sự tự tin luôn
              có trong chính anh
            </Text>
            <Text color="#1E3A8A">
              30Shine không tạo ra chúng. <b>Chúng tôi là điểm tựa</b>, giúp anh
              thể hiện trọn vẹn phong thái, khí chất và sẵn sàng cho những điều
              quan trọng phía trước
            </Text>
          </Box>
          <Box mb={12}>
            <Heading as="h3" size="lg" color="#1E3A8A" fontWeight="bold" mb={4}>
              <Box as="span" borderLeft="6px solid #2563EB" pl={3} mr={2}>
                Ý NGHĨA LOGO VÀ THƯƠNG HIỆU
              </Box>
            </Heading>
            <Text color="#1E3A8A" mb={4}>
              30Shine đại diện cho tuổi 30 toả sáng của mỗi người đàn ông - độ
              tuổi mang ý nghĩa biểu tượng mạnh mẽ nhất đại diện cho ngọn lửa
              thành công, khát vọng chiến thắng và ý chí vươn lên của bất kỳ
              người đàn ông hiện đại nào. Tên gọi được thể hiện qua Logo nam
              nhân tỏa sáng cùng font chữ hiện đại và công nghệ như một sự khẳng
              định mạnh mẽ cho tinh thần chiến thắng, khát vọng thành công.
            </Text>
            <Grid
              templateColumns={{ base: "1fr", md: "1fr 1fr" }}
              gap={6}
              mb={4}
            >
              <Box
                border="2px solid #B6C6E3"
                borderRadius="xl"
                p={4}
                textAlign="center"
              >
                <Image
                  src="/logo-old.png"
                  alt="Logo cũ"
                  mx="auto"
                  mb={2}
                  h="100px"
                />
                <Text fontWeight="bold" color="#1E3A8A">
                  Logo 30Shine trước 07/2023
                </Text>
              </Box>
              <Box
                border="2px solid #B6C6E3"
                borderRadius="xl"
                p={4}
                textAlign="center"
              >
                <Image
                  src="logo_30shine.png"
                  alt="Logo mới"
                  mx="auto"
                  mb={2}
                  h="100px"
                />
                <Text fontWeight="bold" color="#1E3A8A">
                  Logo 30Shine sau 07/2023
                </Text>
              </Box>
            </Grid>
            <Text color="#1E3A8A">
              Nhận diện mới của 30Shine nổi bật với màu xanh Blue Royal đại diện
              hình mẫu người khởi tạo với ý chí không ngừng đổi mới, luôn nhìn
              ra cơ hội để thay đổi cuộc chơi, phá bỏ quan niệm cũ. Sự lựa chọn
              của 30Shine là một định vị không hào nhoáng, nhưng chứa đựng mơ
              ước lớn của doanh nghiệp 30Shine là hiện đại hoá ngành tóc ở Việt
              Nam.
            </Text>
          </Box>
          <Box mb={12}>
            <Heading as="h3" size="lg" color="#1E3A8A" fontWeight="bold" mb={4}>
              <Box as="span" borderLeft="6px solid #2563EB" pl={3} mr={2}>
                WILLS – VĂN HOÁ TINH THẦN CỦA NHỮNG NGƯỜI DÁM TIẾN LÊN
              </Box>
            </Heading>
            <Text color="#1E3A8A" mb={2}>
              Ở 30Shine, chúng tôi không chỉ tạo ra diện mạo tuyệt vời – chúng
              tôi phục vụ những người đàn ông muốn tốt hơn mỗi ngày
            </Text>
            <Text color="#1E3A8A" mb={2}>
              Dù anh đang <b>bắt đầu, bứt phá hay khẳng định chính mình</b>,
              tinh thần WILLS luôn đồng hành:
            </Text>
            <Box as="ul" pl={6} color="#1E3A8A" mb={2}>
              <li>
                <b>W - Warrior</b> (Chiến binh) – Kiên cường, không lùi bước
                trước thử thách
              </li>
              <li>
                <b>I - Intervention</b> (Can thiệp) – Không đợi thời điểm hoàn
                hảo, mà tạo ra nó
              </li>
              <li>
                <b>L - Learning</b> (Ham học hỏi) – Phát triển không giới hạn,
                không ngừng nâng cấp bản thân
              </li>
              <li>
                <b>L - Leadership</b> (Đổi mới) – Luôn sáng tạo, chủ động dẫn
                đầu sự thay đổi
              </li>
              <li>
                <b>S - Sincerity</b> (Chân thành) – Minh bạch, đáng tin cậy, tạo
                dựng giá trị bền vững
              </li>
            </Box>
            <Text color="#1E3A8A" mb={2}>
              Không có đúng hay sai – chỉ có phiên bản tốt nhất của chính mình,
              và 30Shine ở đây để giúp anh tự tin thể hiện điều đó
            </Text>
          </Box>
          <Box>
            <Heading as="h3" size="lg" color="#1E3A8A" fontWeight="bold" mb={4}>
              <Box as="span" borderLeft="6px solid #2563EB" pl={3} mr={2}>
                SỨ MỆNH – TÔN VINH ĐÔI BÀN TAY TÀI HOA NGƯỜI THỢ VIỆT
              </Box>
            </Heading>
            <Text color="#1E3A8A" mb={2}>
              30Shine không chỉ là điểm tựa giúp đàn ông thể hiện phong độ, mà
              còn mang trong mình một sứ mệnh lớn hơn:
            </Text>
            <Text color="#1E3A8A" fontWeight="bold" mb={2}>
              Tôn vinh và nâng tầm đôi bàn tay tài hoa của người thợ Việt trên
              bản đồ thế giới
            </Text>
            <Text color="#1E3A8A" mb={2}>
              Tay nghề con người Việt Nam không chỉ giỏi – mà có thể vươn xa
            </Text>
            <Text color="#1E3A8A" mb={2}>
              Bằng việc không ngừng đổi mới, nâng cao chất lượng dịch vụ và xây
              dựng môi trường phát triển chuyên nghiệp, 30Shine giúp người thợ
              Việt phát triển bản thân, nghề nghiệp và vị thế trong ngành tóc
              toàn cầu
            </Text>
            <Text color="#1E3A8A" fontWeight="bold">
              Từ bàn tay Việt – vươn tới những tầm cao mới
            </Text>
          </Box>
        </Container>
      </Box>

      {/* Footer CTA */}
      <Box
        id="contact"
        bg="#233876"
        py={8}
        color="white"
        borderTopRadius="2xl"
        mt={8}
      >
        <Container maxW="container.xl">
          <Grid
            templateColumns={{ base: "1fr", md: "1.5fr 1fr" }}
            gap={8}
            alignItems="center"
          >
            <Box>
              <Image
                src="/logo-new-footer.png"
                alt="30Shine Logo"
                h="52px"
                mb={2}
              />
              <Text fontSize="md" mb={2}>
                Điểm Tựa Cho Việc Lớn
                <br />
                Kiểu Tóc Đẹp Không Phải Điểm Đến – Mà Là Điểm Khởi Đầu
              </Text>
              <Text fontSize="sm" opacity={0.8}>
                © {new Date().getFullYear()} 30Shine. All rights reserved.
              </Text>
            </Box>
            <VStack align="stretch" spacing={2}>
              <Text fontWeight="bold">Liên hệ</Text>
              <Text fontSize="sm">
                Hotline (1000đ/phút):{" "}
                <a
                  href="tel:1900272703"
                  style={{ color: "white", textDecoration: "underline" }}
                >
                  1900.27.27.03
                </a>
              </Text>
              <Text fontSize="15px">
                Liên hệ học nghề tóc:{" "}
                <a
                  href="tel:0967863030"
                  style={{ color: "white", textDecoration: "underline" }}
                >
                  0967.86.3030
                </a>
              </Text>
              <Text fontSize="15px" fontWeight="bold">
                Giờ phục vụ: Thứ 2 - CN, 8h30 - 20h30
              </Text>
              <Button
                size="md"
                colorScheme="whiteAlpha"
                bg="white"
                color="#233876"
                borderRadius="lg"
                fontWeight="bold"
                _hover={{ bg: "#E5EDFF" }}
                mt={2}
                onClick={onOpenRegister}
              >
                Trở thành Khách hàng
              </Button>
            </VStack>
          </Grid>
        </Container>
      </Box>
      {isRegisterOpen && (
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={onCloseRegister}
          onSwitchLogin={handleOpenLogin}
        />
      )}
      {showLogin && (
        <LoginModal
          isOpen={showLogin}
          onClose={() => setShowLogin(false)}
          onSwitchRegister={handleOpenRegister}
          onSwitchForgot={() => {}}
        />
      )}
      <FloatingButtons />
    </Box>
  );
};

export default Home;
