import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  HStack,
  Radio,
  RadioGroup,
  Text
} from "@chakra-ui/react";
import { useState } from "react";

const InvoiceTransaction = ({ invoice, onUpdate }) => {
  const [mode, setMode] = useState("payment"); // "payment" or "refund"

  // Payment fields
  const [soTienTT, setSoTienTT] = useState(invoice?.TongTien || "");
  const [hinhThucTT, setHinhThucTT] = useState("Chuyển khoản NH");
  const [ghiChu, setGhiChu] = useState(invoice?.NoiDung || "");

  // Refund fields
  const [lyDoKhachH, setLyDoKhachH] = useState("");
  const [soTienHoan, setSoTienHoan] = useState(invoice.TongTien || "");
  const [hinhThucHoan, setHinhThucHoan] = useState("Chuyển khoản NH");
  const [lyDoQly, setLyDoQly] = useState("");

  const handleSubmit = () => {
    if (mode === "payment") {
      onUpdate({
        ...invoice,
        TongTien: soTienTT,
        HinhThucThanhToan: hinhThucTT,
        NoiDung: ghiChu,
        TrangThaiTT: "đã thanh toán"
      });
    } else {
      onUpdate({
        ...invoice,
        TrangThaiHT: "đã hoàn",
        YeuCauHoanTien: true,
        SoTienHoan: soTienHoan,
        HinhThucHoan: hinhThucHoan,
        LyDoKhachH: lyDoKhachH,
        LyDoQly: lyDoQly
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
            <Input value={soTienTT} onChange={(e) => setSoTienTT(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Hình thức thanh toán</FormLabel>
            <Input value={hinhThucTT} onChange={(e) => setHinhThucTT(e.target.value)} />
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
        </>
      )}

      <Button colorScheme="blue" onClick={handleSubmit}>Lưu</Button>
    </VStack>
  );
};

export default InvoiceTransaction;