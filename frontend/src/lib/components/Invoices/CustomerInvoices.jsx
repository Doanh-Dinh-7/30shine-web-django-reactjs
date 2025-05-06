import React, { useState } from "react";
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
  Textarea,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import PaymentDrawer from "./PaymentDrawer";
import RefundDrawer from "./RefundDrawer";

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

  // State cho modal đánh giá
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewStar, setReviewStar] = useState(5);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewingInvoice, setReviewingInvoice] = useState(null);
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
    setReviewingInvoice(inv);
    setReviewStar(5);
    setReviewContent("");
    setReviewModal(true);
  };
  const closeReviewModal = () => {
    setReviewModal(false);
    setReviewingInvoice(null);
  };
  const handleSubmitReview = () => {
    if (!reviewStar || reviewStar < 1 || reviewStar > 5) {
      toast({ title: "Vui lòng chọn số sao từ 1 đến 5", status: "warning" });
      return;
    }
    if (!reviewContent.trim()) {
      toast({ title: "Vui lòng nhập nội dung đánh giá", status: "warning" });
      return;
    }
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.MaHD === reviewingInvoice.MaHD
          ? {
              ...inv,
              reviewed: true,
              review: { star: reviewStar, content: reviewContent },
            }
          : inv
      )
    );
    toast({ title: "Gửi đánh giá thành công!", status: "success" });
    closeReviewModal();
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch = inv.DịchVu.toLowerCase().includes(
      search.toLowerCase()
    );
    const [time, dateStr] = inv.NgayLapHD.split(" ");
    const [day, month, year] = dateStr.split("/");

    const matchDate =
      (!selectedDate || selectedDate === day) &&
      (!selectedMonth || selectedMonth === month) &&
      (!selectedYear || selectedYear === year);

    return matchesSearch && matchDate;
  });

  return (
    <Box bg="#eaf0fb" minH="100vh" p={6}>
      <Heading size="lg" mb={4} color="blue.700">
        Hóa đơn
      </Heading>

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
                    "{inv.review.content}"
                  </Text>
                </Box>
              )}
            <Flex gap={3} mt={3}>
              {inv.TrangThaiTT === "Chưa thanh toán" && (
                <Button colorScheme="blue" onClick={() => handlePay(inv)}>
                  Thanh toán
                </Button>
              )}
              <Button colorScheme="blue" onClick={() => handleRefund(inv)}>
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

      {/* Modal đánh giá */}
      <Modal isOpen={reviewModal} onClose={closeReviewModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Đánh giá dịch vụ</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={2}>Chọn số sao:</Text>
            <Flex mb={4}>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Icon
                    as={StarIcon}
                    key={i}
                    boxSize={8}
                    color={i < reviewStar ? "yellow.400" : "gray.300"}
                    cursor="pointer"
                    onClick={() => setReviewStar(i + 1)}
                  />
                ))}
            </Flex>
            <Text mb={2}>Nội dung đánh giá:</Text>
            <Textarea
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="Nhập cảm nhận của bạn về dịch vụ..."
              rows={4}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmitReview}>
              Gửi đánh giá
            </Button>
            <Button variant="ghost" onClick={closeReviewModal}>
              Hủy
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
