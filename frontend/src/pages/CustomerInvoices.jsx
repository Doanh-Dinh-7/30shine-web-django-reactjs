import { useState, useEffect } from "react";
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
import axios from "axios";

// Quy ước trạng thái:
// TrangThaiTT: 0 = Chưa thanh toán, 1 = Đã thanh toán chưa đánh giá, 2 = Đã đánh giá
// TrangThaiHT: 0 = Chưa hoàn tiền, 1 = Đã yêu cầu, 2 = Đồng ý hoàn tiền, 3 = Từ chối hoàn tiền

const CustomerInvoices = () => {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Lấy dữ liệu hóa đơn từ API
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    let user = null;
    try {
      user = JSON.parse(userStr);
    } catch {
      user = null;
    }
    const fetchInvoices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/hoa-don/khach-hang/${user.MaKH}/`
        );
        setInvoices(response.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setInvoices([]);
          setError("Không có hóa đơn nào.");
        } else {
          setError("Không thể tải danh sách hóa đơn.");
          toast({
            title: "Lỗi",
            description: "Không thể tải danh sách hóa đơn.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, [toast]);

  const handlePay = (inv) => {
    setSelectedInvoice(inv);
    setShowQR(false);
    onPaymentOpen();
  };

  const handleConfirmPayment = async () => {
    setShowQR(true);
    try {
      // Gửi PATCH request để cập nhật TrangThaiTT
      await axios.patch(
        `http://127.0.0.1:8000/api/hoa-don/${selectedInvoice.MaHD}/`,
        {
          TrangThaiTT: 1,
        }
      );
      // Cập nhật frontend
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.MaHD === selectedInvoice.MaHD ? { ...inv, TrangThaiTT: 1 } : inv
        )
      );
      toast({
        title: "Thanh toán thành công",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật trạng thái thanh toán.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRefund = (inv) => {
    setSelectedInvoice(inv);
    onRefundOpen();
  };

  const openReviewModal = (inv) => {
    setSelectedInvoice(inv);
    setRatingValue(5);
    setRatingContent("");
    setRatingOpen(true);
  };

  const handleSubmitReview = async () => {
    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
      toast({ title: "Vui lòng chọn số sao từ 1 đến 5", status: "warning" });
      return;
    }
    if (!ratingContent.trim()) {
      toast({ title: "Vui lòng nhập nội dung đánh giá", status: "warning" });
      return;
    }
    // Gọi API tạo đánh giá
    try {
      await axios.post("http://127.0.0.1:8000/api/danh-gia/", {
        MaKH: selectedInvoice.MaKH, // hoặc selectedInvoice.MaKH nếu là object thì .MaKH.MaKH
        NoiDung: ratingContent,
        DiemDanhGia: ratingValue,
        MaDV: selectedInvoice.chi_tiet && selectedInvoice.chi_tiet[0]?.MaDV, // lấy dịch vụ đầu tiên trong hóa đơn
        MaHD: selectedInvoice.MaHD,
      });
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.MaHD === selectedInvoice.MaHD
            ? {
                ...inv,
                reviewed: true,
                review: { star: ratingValue, content: ratingContent },
                TrangThaiTT: 2, // Đã đánh giá
              }
            : inv
        )
      );
      // Gửi PATCH request để cập nhật TrangThaiTT
      await axios.patch(
        `http://127.0.0.1:8000/api/hoa-don/${selectedInvoice.MaHD}/`,
        {
          TrangThaiTT: 2,
        }
      );
      // Cập nhật frontend
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.MaHD === selectedInvoice.MaHD ? { ...inv, TrangThaiTT: 2 } : inv
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
    } catch (error) {
      toast({
        title: "Lỗi khi gửi đánh giá",
        description: error.response?.data?.detail || "Không thể gửi đánh giá",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch = inv.chi_tiet?.some((dv) =>
      dv.TenDV.toLowerCase().includes(search.toLowerCase())
    );

    const date = new Date(inv.NgayLapHD);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());

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

      {loading ? (
        <Text textAlign="center">Đang tải...</Text>
      ) : error ? (
        <Text textAlign="center" color="red.500">
          {error}
        </Text>
      ) : (
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
                  {new Date(inv.NgayLapHD).toLocaleString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </Text>
                {(inv.TrangThaiTT === 1 || inv.TrangThaiTT === 2) && (
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
                <Box>
                  <Text fontWeight="semibold">Dịch vụ:</Text>
                  {inv.chi_tiet?.map((dv, idx) => (
                    <Text key={idx}>
                      - {dv.TenDV} (Thành tiền:{" "}
                      {Number(dv.ThanhTien).toLocaleString()} VND)
                    </Text>
                  ))}
                </Box>
                <Text fontWeight="bold">
                  Tổng tiền: {Number(inv.TongTien).toLocaleString()} VND
                </Text>
                {/* Hiển thị Lý do khách hàng nếu có */}
                {inv.LyDoKhachH && (
                  <Box mt={2}>
                    <Text fontWeight="semibold" color="red.500">
                      Lý do khách hàng: {inv.LyDoKhachH}
                    </Text>
                  </Box>
                )}
                {/* Hiển thị Lý do quản lý nếu có */}
                {inv.LyDoQly && (
                  <Box mt={2}>
                    <Text fontWeight="semibold" color="yellow.500">
                      Lý do quản lý: {inv.LyDoQly}
                    </Text>
                  </Box>
                )}
                {/* Hiển thị đánh giá nếu có */}
                {inv.TrangThaiTT === 2 && inv.reviewed && inv.review && (
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
                  {inv.TrangThaiTT === 0 && (
                    <Button colorScheme="blue" onClick={() => handlePay(inv)}>
                      Thanh toán
                    </Button>
                  )}
                  {(inv.TrangThaiTT === 1 || inv.TrangThaiTT === 2) &&
                    inv.TrangThaiHT === 0 && (
                      <Button
                        colorScheme="red"
                        onClick={() => handleRefund(inv)}
                      >
                        Hoàn tiền
                      </Button>
                    )}
                  {inv.TrangThaiTT === 1 && !inv.reviewed && (
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
      )}

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
        setInvoices={setInvoices}
      />
    </Box>
  );
};

export default CustomerInvoices;
