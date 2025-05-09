import { useState } from "react";
import {
  Box,
  Button,
  Input,
  Select,
  Text,
  SimpleGrid,
  Flex,
  useDisclosure,
  Heading,
  Icon,
  useToast,
} from "@chakra-ui/react";
import PaymentDrawer from "../lib/components/Invoices/PaymentDrawer";
import RefundDrawer from "../lib/components/Invoices/RefundDrawer";
import RatingModal from "../lib/components/Invoices/CustomerRatingModal";
import { StarIcon } from "@chakra-ui/icons";
// Dữ liệu hóa đơn mẫu có review
const dummyInvoices = [
  {
    MaHD: "HD001",
    NgayLapHD: "14:30 22/05/2025",
    DịchVu: "Cắt tóc, uốn tóc",
    TongTien: 100000,
    ChietKhau: 0,
    TrangThaiTT: "Chưa thanh toán",
  },
  {
    MaHD: "HD002",
    NgayLapHD: "15:30 12/04/2025",
    DịchVu: "Cắt tóc, uốn tóc",
    TongTien: 100000,
    ChietKhau: 0,
    TrangThaiTT: "Chưa thanh toán",
  },
  {
    MaHD: "HD003",
    NgayLapHD: "11:30 03/03/2025",
    DịchVu: "Cắt tóc, uốn tóc",
    TongTien: 100000,
    ChietKhau: 0,
    TrangThaiTT: "Đã thanh toán",
    reviewed: true,
    review: {
      star: 5,
      content:
        "Dịch vụ tuyệt vời! Nhân viên thân thiện, cắt tóc đẹp, không gian sạch sẽ.",
    },
  },
  {
    MaHD: "HD004",
    NgayLapHD: "10:00 01/03/2025",
    DịchVu: "Cắt tóc",
    TongTien: 80000,
    ChietKhau: 0,
    TrangThaiTT: "Đã thanh toán",
    reviewed: false,
    review: null,
  },
];

const CustomerInvoices = () => {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [invoices, setInvoices] = useState(dummyInvoices);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [isRatingOpen, setRatingOpen] = useState(false);
  const [ratingValue, setRatingValue] = useState(5);
  const [ratingContent, setRatingContent] = useState("");
  const toast = useToast();

  const {
    isOpen: isPaymentOpen,
    onOpen: onPaymentOpen,
    onClose: onPaymentClose,
  } = useDisclosure();

  const {
    isOpen: isRefundOpen,
    onOpen: onRefundOpen,
    onClose: onRefundClose,
  } = useDisclosure();

  const handlePay = (inv) => {
    setSelectedInvoice(inv);
    setShowQR(false);
    onPaymentOpen();
  };

  const handleConfirmPayment = () => {
    setShowQR(true);
    const updated = invoices.map((inv) =>
      inv.MaHD === selectedInvoice.MaHD
        ? { ...inv, TrangThaiTT: "Đã thanh toán" }
        : inv
    );
    setInvoices(updated);
  };

  const handleRefund = (inv) => {
    setSelectedInvoice(inv);
    onRefundOpen();
  };

  // Đánh giá hóa đơn
  const openReviewModal = (inv) => {
    setSelectedInvoice(inv);
    setRatingValue(5);
    setRatingContent("");
    setRatingOpen(true);
  };

  const handleSubmitReview = () => {
    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
      toast({ title: "Vui lòng chọn số sao từ 1 đến 5", status: "warning" });
      return;
    }
    if (!ratingContent.trim()) {
      toast({ title: "Vui lòng nhập nội dung đánh giá", status: "warning" });
      return;
    }
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.MaHD === selectedInvoice.MaHD
          ? {
              ...inv,
              reviewed: true,
              review: { star: ratingValue, content: ratingContent },
            }
          : inv
      )
    );
    toast({
      title: "Cảm ơn bạn đã đánh giá!",
      description: `Bạn đã đánh giá ${ratingValue} sao${
        ratingContent ? ": " + ratingContent : ""
      }`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    setRatingOpen(false);
    setSelectedInvoice(null);
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch = inv.DịchVu.toLowerCase().includes(
      search.toLowerCase()
    );
    const [, dateStr] = inv.NgayLapHD.split(" ");
    const [day, month, year] = dateStr.split("/");

    const matchDate =
      (!selectedDate || selectedDate === day) &&
      (!selectedMonth || selectedMonth === month) &&
      (!selectedYear || selectedYear === year);

    return matchesSearch && matchDate;
  });

  return (
    <Box p={6}>
      <Box mb={4}>
        <Heading size="lg" mb={4} color="blue.600">
          Hóa đơn
        </Heading>
      </Box>

      <Flex justify="space-between" mb={4} gap={4} flexWrap="wrap">
        <Input
          placeholder="Tìm kiếm hóa đơn"
          width="250px"
          bg="white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Flex gap={2}>
          <Select
            placeholder="Ngày"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {[...Array(31)].map((_, i) => (
              <option key={i} value={String(i + 1).padStart(2, "0")}>
                {i + 1}
              </option>
            ))}
          </Select>
          <Select
            placeholder="Tháng"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {[...Array(12)].map((_, i) => (
              <option key={i} value={String(i + 1).padStart(2, "0")}>
                {i + 1}
              </option>
            ))}
          </Select>
          <Select
            placeholder="Năm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </Select>
        </Flex>
      </Flex>

      <Box bg="blue.50" p={4} borderRadius="xl" boxShadow="md">
        <SimpleGrid columns={[1, 2, 3]} spacing={4}>
          {filteredInvoices.map((inv) => (
            <Box
              key={inv.MaHD}
              borderTop="5px solid #25c3d9"
              bg="white"
              borderRadius="md"
              p={4}
              boxShadow="sm"
              position="relative"
            >
              <Text fontWeight="bold" mb={2}>
                {inv.NgayLapHD}
              </Text>
              {inv.TrangThaiTT === "Đã thanh toán" && (
                <Text
                  position="absolute"
                  right={4}
                  top={2}
                  color="green"
                  fontWeight="bold"
                >
                  Đã thanh toán
                </Text>
              )}
              <Text>Dịch vụ: {inv.DịchVu}</Text>
              <Text>Chiết khấu: {inv.ChietKhau.toLocaleString()} VND</Text>
              <Text fontWeight="bold">
                Tổng tiền: {inv.TongTien.toLocaleString()} VND
              </Text>
              {/* Hiển thị đánh giá nếu có */}
              {inv.TrangThaiTT === "Đã thanh toán" &&
                inv.reviewed &&
                inv.review && (
                  <Box
                    mt={3}
                    p={3}
                    bg="gray.50"
                    borderRadius="md"
                    borderWidth={"1px"}
                    borderColor="yellow.200"
                  >
                    <Flex align="center" mb={1}>
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Icon
                            as={StarIcon}
                            key={i}
                            color={
                              i < inv.review.star ? "yellow.400" : "gray.300"
                            }
                            boxSize={5}
                          />
                        ))}
                      <Text ml={2} fontWeight="bold" color="blue.700">
                        {inv.review.star}/5
                      </Text>
                    </Flex>
                    <Text color="gray.700" fontStyle="italic">
                      &quot;{inv.review.content}&quot;
                    </Text>
                  </Box>
                )}
              <Flex gap={3} mt={3}>
                {inv.TrangThaiTT === "Chưa thanh toán" && (
                  <Button colorScheme="blue" onClick={() => handlePay(inv)}>
                    Thanh toán
                  </Button>
                )}
                <Button colorScheme="red" onClick={() => handleRefund(inv)}>
                  Hoàn tiền
                </Button>
                {/* Nếu đã thanh toán và chưa đánh giá thì hiện nút đánh giá */}
                {inv.TrangThaiTT === "Đã thanh toán" && !inv.reviewed && (
                  <Button
                    colorScheme="yellow"
                    onClick={() => openReviewModal(inv)}
                  >
                    Đánh giá
                  </Button>
                )}
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Box>

      {/* Modal đánh giá */}
      <RatingModal
        isOpen={isRatingOpen}
        onClose={() => setRatingOpen(false)}
        onSubmit={handleSubmitReview}
        value={ratingValue}
        onChange={setRatingValue}
        content={ratingContent}
        onContentChange={setRatingContent}
      />

      <PaymentDrawer
        isOpen={isPaymentOpen}
        onClose={onPaymentClose}
        invoice={selectedInvoice}
        showQR={showQR}
        onConfirmPayment={handleConfirmPayment}
      />

      <RefundDrawer
        isOpen={isRefundOpen}
        onClose={onRefundClose}
        invoice={selectedInvoice}
      />
    </Box>
  );
};

export default CustomerInvoices;
