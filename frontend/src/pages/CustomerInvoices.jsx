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
  Spinner,
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

  // Lấy dữ liệu hóa đơn và đánh giá từ API
  const fetchInvoicesAndRatings = async () => {
    setLoading(true);
    setError(null);
    try {
      const userStr = localStorage.getItem("user");
      let user = null;
      try {
        user = JSON.parse(userStr);
      } catch (parseError) {
        console.error("Error parsing user from local storage:", parseError);
        setError("Lỗi: Không tìm thấy thông tin người dùng.");
        setLoading(false);
        return;
      }

      if (!user || !user.MaKH) {
        setError("Lỗi: Không tìm thấy Mã khách hàng cho người dùng.");
        setLoading(false);
        return;
      }

      // Fetch invoices and ratings in parallel
      const [invoicesResponse, ratingsResponse] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/api/hoa-don/khach-hang/${user.MaKH}/`),
        // Assuming /api/danh-gia/ returns all ratings, adjust if there's a filtered endpoint
        axios.get(`http://127.0.0.1:8000/api/danh-gia/`),
      ]);

      const fetchedInvoices = invoicesResponse.data;
      const fetchedRatings = ratingsResponse.data;

      // Create a map of ratings by MaHD for quick lookup
      const ratingsByInvoiceId = fetchedRatings.reduce((acc, rating) => {
        if (rating.MaHD) {
          // Only include ratings linked to an invoice
          acc[rating.MaHD] = rating;
        }
        return acc;
      }, {});

      // Merge ratings into invoices
      const invoicesWithRatings = fetchedInvoices.map((invoice) => ({
        ...invoice,
        // Add the corresponding rating object if found
        danh_gia: ratingsByInvoiceId[invoice.MaHD] || null,
      }));

      setInvoices(invoicesWithRatings);
    } catch (err) {
      console.error("Error fetching data:", err); // Log the actual error
      // Handle errors from either API call
      if (err.response && err.response.status === 404) {
        setInvoices([]);
        setError("Không tìm thấy hóa đơn hoặc đánh giá nào.");
      } else {
        setError("Không thể tải dữ liệu (hóa đơn hoặc đánh giá).");
        toast({
          title: "Lỗi",
          description: "Không thể tải dữ liệu từ máy chủ.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch data on component mount and after actions
  useEffect(() => {
    fetchInvoicesAndRatings();
  }, []); // Empty dependency array means it runs once on mount

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
      // Sau khi cập nhật thành công, fetch lại hóa đơn và đánh giá để lấy dữ liệu mới nhất
      fetchInvoicesAndRatings(); // Re-fetch both
      toast({
        title: "Thanh toán thành công",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (patchError) {
      console.error("Error confirming payment:", patchError);
      toast({
        title: "Lỗi",
        description:
          patchError.response?.data?.detail ||
          "Không thể cập nhật trạng thái thanh toán.",
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
    // Reset rating form when opening for a new invoice
    setRatingValue(5);
    setRatingContent("");
    setRatingOpen(true);
  };

  const handleSubmitReview = async () => {
    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
      toast({
        title: "Vui lòng chọn số sao từ 1 đến 5",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!ratingContent.trim()) {
      toast({
        title: "Vui lòng nhập nội dung đánh giá",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    if (!selectedInvoice) {
      toast({
        title: "Lỗi: Không có hóa đơn được chọn để đánh giá.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Prepare payload for creating a review
    const reviewPayload = {
      MaKH: selectedInvoice.MaKH, // Use MaKH from selected invoice
      NoiDung: ratingContent,
      DiemDanhGia: ratingValue,
      // Assuming MaDV should be for the whole invoice or the first service if multi-service invoice rating is not supported
      MaDV:
        selectedInvoice.chi_tiet && selectedInvoice.chi_tiet[0]?.MaDV
          ? selectedInvoice.chi_tiet[0].MaDV
          : null, // Use MaDV from first service if available
      MaHD: selectedInvoice.MaHD, // Include MaHD
    };

    try {
      // Gọi API tạo đánh giá
      await axios.post("http://127.0.0.1:8000/api/danh-gia/", reviewPayload);

      // Gửi PATCH request để cập nhật TrangThaiTT của hóa đơn
      // This PATCH request is important as it updates the status that determines if rating should be shown
      await axios.patch(
        `http://127.0.0.1:8000/api/hoa-don/${selectedInvoice.MaHD}/`,
        {
          TrangThaiTT: 2,
        }
      );

      // Sau khi tạo đánh giá và cập nhật hóa đơn thành công, fetch lại hóa đơn và đánh giá để lấy dữ liệu mới nhất bao gồm cả đánh giá vừa tạo
      fetchInvoicesAndRatings(); // Re-fetch both

      toast({
        title: "Cảm ơn bạn đã đánh giá!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setRatingOpen(false);
      setSelectedInvoice(null); // Clear selected invoice
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error); // Log the actual error
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.message ||
        "Không thể gửi đánh giá.";
      toast({
        title: "Lỗi khi gửi đánh giá",
        description:
          typeof errorMessage === "string"
            ? errorMessage
            : JSON.stringify(errorMessage),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch = inv.chi_tiet?.some((dv) =>
      dv.TenDV.toLowerCase().includes(search.toLowerCase())
    );

    // Robust date parsing and filtering
    let matchDate = true;
    if (inv.NgayLapHD) {
      try {
        const date = new Date(inv.NgayLapHD);
        if (!isNaN(date.getTime())) {
          // Check for valid date
          const day = String(date.getDate()).padStart(2, "0");
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = String(date.getFullYear());

          matchDate =
            (!selectedDate || selectedDate === day) &&
            (!selectedMonth || selectedMonth === month) &&
            (!selectedYear || selectedYear === year);
        } else {
          matchDate = false; // Treat invalid dates as not matching filter
          console.warn(
            "Invalid date string for invoice",
            inv.MaHD,
            inv.NgayLapHD
          );
        }
      } catch (dateError) {
        matchDate = false; // Handle parsing errors
        console.error(
          "Error parsing date for invoice",
          inv.MaHD,
          inv.NgayLapHD,
          dateError
        );
      }
    } else {
      matchDate = !selectedDate && !selectedMonth && !selectedYear; // If no date, only match if no date filters are set
    }

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
          placeholder="Tìm kiếm hóa đơn (theo dịch vụ)"
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
            <option value="">Tất cả ngày</option>
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
            <option value="">Tất cả tháng</option>
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
            <option value="">Tất cả năm</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </Select>
        </Flex>
      </Flex>

      {loading ? (
        <Flex justify="center" align="center" minH="200px">
          <Spinner size="lg" color="blue.500" />
        </Flex>
      ) : error ? (
        <Text textAlign="center" color="red.500">
          {error}
        </Text>
      ) : filteredInvoices.length === 0 ? (
        <Text textAlign="center" color="gray.500">
          Không tìm thấy hóa đơn nào phù hợp với tiêu chí tìm kiếm.
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
                {inv.TrangThaiTT === 0 && (
                  <Text
                    position="absolute"
                    right={4}
                    top={2}
                    color="orange.500"
                    fontWeight="bold"
                  >
                    Chưa thanh toán
                  </Text>
                )}

                <Box>
                  <Text fontWeight="semibold">Dịch vụ:</Text>
                  {/* Ensure chi_tiet is an array before mapping */}
                  {Array.isArray(inv.chi_tiet) &&
                    inv.chi_tiet.map((dv, idx) => (
                      <Text key={idx}>
                        - {dv.TenDV} (Thành tiền: {/* Format currency */}
                        {Number(dv.ThanhTien).toLocaleString("vi-VN")} VND)
                      </Text>
                    ))}
                </Box>
                <Text fontWeight="bold" mt={2}>
                  Tổng tiền: {Number(inv.TongTien).toLocaleString("vi-VN")} VND
                </Text>
                {/* Hiển thị Lý do khách hàng nếu có */}
                {inv.LyDoKhachH && (
                  <Box mt={2}>
                    <Text fontWeight="semibold" color="red.500">
                      Lý do khách hàng: {inv.LyDoKhachH}
                    </Text>
                  </Box>
                )}
                {inv.LyDoQly && (
                  <Box mt={2}>
                    <Text fontWeight="semibold" color="yellow.700">
                      Lý do quản lý: {inv.LyDoQly}
                    </Text>
                  </Box>
                )}
                {/* Hiển thị đánh giá nếu có, đọc từ trường danh_gia lồng ghép sau khi merge */}
                {inv.TrangThaiTT === 2 &&
                  inv.danh_gia && ( // Check TrangThaiTT and if danh_gia object exists (now merged in frontend)
                    <Box
                      mt={3}
                      p={3}
                      bg="gray.50"
                      borderRadius="md"
                      borderWidth={"1px"}
                      borderColor="yellow.200"
                    >
                      <Flex align="center" mb={1}>
                        {/* Use DiemDanhGia from the merged danh_gia object */}
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Icon
                              as={StarIcon}
                              key={i}
                              color={
                                i < inv.danh_gia.DiemDanhGia
                                  ? "yellow.400"
                                  : "gray.300" // Use DiemDanhGia
                              }
                              boxSize={5}
                            />
                          ))}
                        <Text ml={2} fontWeight="bold" color="blue.700">
                          {inv.danh_gia.DiemDanhGia}/5 {/* Use DiemDanhGia */}
                        </Text>
                      </Flex>
                      {/* Use NoiDung from the merged danh_gia object */}
                      <Text color="gray.700" fontStyle="italic">
                        &quot;{inv.danh_gia.NoiDung}&quot; {/* Use NoiDung */}
                      </Text>
                    </Box>
                  )}
                <Flex gap={3} mt={3}>
                  {inv.TrangThaiTT === 0 && (
                    <Button
                      colorScheme="blue"
                      onClick={() => handlePay(inv)}
                      size="sm"
                    >
                      Thanh toán
                    </Button>
                  )}
                  {/* Show Refund button if paid and not already refunded/requested */}
                  {(inv.TrangThaiTT === 1 || inv.TrangThaiTT === 2) &&
                    inv.TrangThaiHT === 0 && ( // Only show if paid and not pending refund
                      <Button
                        colorScheme="red"
                        onClick={() => handleRefund(inv)}
                        size="sm"
                      >
                        Hoàn tiền
                      </Button>
                    )}
                  {/* Show Rate button if paid and not yet rated */}
                  {inv.TrangThaiTT === 1 && ( // Only show Rate button if paid but not yet rated (TrangThaiTT 1)
                    <Button
                      colorScheme="yellow"
                      onClick={() => openReviewModal(inv)}
                      size="sm"
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
        onRefundSuccess={fetchInvoicesAndRatings} // Pass the new fetch function
      />
    </Box>
  );
};

export default CustomerInvoices;
