import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  HStack,
  Radio,
  RadioGroup,
  Text,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const InvoiceTransaction = ({ invoice, onUpdate }) => {
  const [mode, setMode] = useState("payment"); // "payment" hoặc "refund"

  // Payment fields
  const [soTienThanhToan, setSoTienThanhToan] = useState(
    invoice?.SoTienThanhToan || invoice?.TongTien || ""
  );
  const [hinhThucThanhToan, setHinhThucThanhToan] = useState(
    invoice?.HinhThucThanhToan || "Chuyển khoản NH"
  );
  const [ghiChu, setGhiChu] = useState(invoice?.NoiDung || "");

  // Refund fields
  const [lyDoKhachH, setLyDoKhachH] = useState(invoice?.LyDoKhachH || "");
  const [soTienHoan, setSoTienHoan] = useState(invoice?.TongTien || "");
  const [hinhThucHoan, setHinhThucHoan] = useState(
    invoice?.HinhThucHoan || "Chuyển khoản NH"
  );
  const [lyDoQly, setLyDoQly] = useState(invoice?.LyDoQly || "");
  const [trangThaiHoanTien, setTrangThaiHoanTien] = useState(
    invoice?.TrangThaiHT !== undefined ? invoice.TrangThaiHT : ""
  );
  const [thoiGianThanhToan, setThoiGianThanhToan] = useState(
    invoice?.ThoiGianThanhToan || ""
  );
  const [thoiGianHoan, setThoiGianHoan] = useState(invoice?.ThoiGianHoan || "");

  useEffect(() => {
    setSoTienThanhToan(invoice?.SoTienThanhToan || invoice?.TongTien || "");
    setHinhThucThanhToan(invoice?.HinhThucThanhToan || "Chuyển khoản NH");
    setGhiChu(invoice?.NoiDung || "");
    setLyDoKhachH(invoice?.LyDoKhachH || "");
    setSoTienHoan(invoice?.TongTien || "");
    setHinhThucHoan(invoice?.HinhThucHoan || "Chuyển khoản NH");
    setLyDoQly(invoice?.LyDoQly || "");
    setTrangThaiHoanTien(
      invoice?.TrangThaiHT !== undefined ? invoice.TrangThaiHT : ""
    );
    setThoiGianThanhToan(invoice?.ThoiGianThanhToan || "");
    setThoiGianHoan(invoice?.ThoiGianHoan || "");
  }, [invoice]);

  const handleSubmit = () => {
    if (mode === "payment") {
      onUpdate({
        ...invoice,
        SoTienThanhToan: soTienThanhToan,
        HinhThucThanhToan: hinhThucThanhToan,
        NoiDung: ghiChu,
        TrangThaiTT: 1, // đã thanh toán (chưa đánh giá)
        ThoiGianThanhToan: thoiGianThanhToan || new Date().toISOString(),
      });
    } else {
      if (trangThaiHoanTien === "") {
        alert("Vui lòng chọn trạng thái đồng ý hoặc không đồng ý hoàn tiền.");
        return;
      }
      onUpdate({
        ...invoice,
        TrangThaiHT: Number(trangThaiHoanTien), // lưu dạng số
        YeuCauHoanTien: true,
        SoTienHoan: soTienHoan,
        HinhThucHoan: hinhThucHoan,
        LyDoKhachH: lyDoKhachH,
        LyDoQly: lyDoQly,
        ThoiGianHoan: thoiGianHoan || new Date().toISOString(),
      });
    }
  };

  return (
    <VStack spacing={6} align="stretch">
      <RadioGroup onChange={setMode} value={mode}>
        <HStack spacing={4}>
          <Radio value="payment">Thanh toán</Radio>
          <Radio value="refund">Hoàn tiền</Radio>
        </HStack>
      </RadioGroup>

      {mode === "payment" ? (
        <>
          <Text fontWeight="bold">Xác nhận khách đã thanh toán</Text>
          <FormControl>
            <FormLabel>Số tiền thanh toán</FormLabel>
            <Input
              value={soTienThanhToan}
              onChange={(e) => setSoTienThanhToan(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Hình thức thanh toán</FormLabel>
            <Input
              value={hinhThucThanhToan}
              onChange={(e) => setHinhThucThanhToan(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Ghi chú</FormLabel>
            <Input value={ghiChu} onChange={(e) => setGhiChu(e.target.value)} />
          </FormControl>
        </>
      ) : (
        <>
          <Text fontWeight="bold">Xác nhận hoàn tiền cho khách</Text>
          <FormControl>
            <FormLabel>Lý do khách hàng</FormLabel>
            <Input value={lyDoKhachH} onChange={(e) => setLyDoKhachH(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Số tiền hoàn lại</FormLabel>
            <Input value={soTienHoan} onChange={(e) => setSoTienHoan(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Hình thức hoàn trả</FormLabel>
            <Input value={hinhThucHoan} onChange={(e) => setHinhThucHoan(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Lý do quản lý</FormLabel>
            <Input value={lyDoQly} onChange={(e) => setLyDoQly(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Quyết định</FormLabel>
            <Select
              placeholder="Chọn trạng thái"
              value={trangThaiHoanTien}
              onChange={(e) => setTrangThaiHoanTien(e.target.value)}
            >
              <option value={2}>Đồng ý hoàn tiền</option>
              <option value={3}>Không đồng ý hoàn tiền</option>
            </Select>
          </FormControl>
        </>
      )}

      <Button colorScheme="blue" onClick={handleSubmit}>
        Lưu
      </Button>
    </VStack>
  );
};

export default InvoiceTransaction;
