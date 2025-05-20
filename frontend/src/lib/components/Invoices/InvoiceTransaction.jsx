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
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

const InvoiceTransaction = ({ invoice, onUpdate }) => {
  const [mode, setMode] = useState("payment");
  const [soTienThanhToan, setSoTienThanhToan] = useState(invoice?.SoTienThanhToan || invoice?.TongTien || "");
  const [hinhThucThanhToan, setHinhThucThanhToan] = useState(invoice?.HinhThucThanhToan || "Chuyển khoản NH");
  const [ghiChu, setGhiChu] = useState(invoice?.GhiChu || "");
  const [lyDoKhachH, setLyDoKhachH] = useState(invoice?.LyDoKhachH || "");
  const [soTienHoan, setSoTienHoan] = useState(invoice?.TongTien || "");
  const [hinhThucHoan, setHinhThucHoan] = useState(invoice?.HinhThucHoan || "Chuyển khoản NH");
  const [lyDoQly, setLyDoQly] = useState(invoice?.LyDoQly || "");
  const [trangThaiHoanTien, setTrangThaiHoanTien] = useState(invoice?.TrangThaiHT !== undefined ? invoice.TrangThaiHT : "");
  const toast = useToast();

  useEffect(() => {
    setSoTienThanhToan(invoice?.SoTienThanhToan || invoice?.TongTien || "");
    setHinhThucThanhToan(invoice?.HinhThucThanhToan || "Chuyển khoản NH");
    setGhiChu(invoice?.GhiChu || "");
    setLyDoKhachH(invoice?.LyDoKhachH || "");
    setSoTienHoan(invoice?.TongTien || "");
    setHinhThucHoan(invoice?.HinhThucHoan || "Chuyển khoản NH");
    setLyDoQly(invoice?.LyDoQly || "");
    setTrangThaiHoanTien(invoice?.TrangThaiHT !== undefined ? invoice.TrangThaiHT : "");
  }, [invoice]);

  const handleSubmit = async () => {
    if (mode === "payment") {
      if (!soTienThanhToan || isNaN(parseFloat(soTienThanhToan))) {
        toast({
          title: "Lỗi",
          description: "Số tiền thanh toán không hợp lệ.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      try {
        const updatedData = {
          ...invoice,
          SoTienThanhToan: soTienThanhToan,
          HinhThucThanhToan: hinhThucThanhToan,
          GhiChu: ghiChu,
          TrangThaiTT: 1,
        };
        await axios.put(`http://127.0.0.1:8000/api/hoa-don/${invoice.MaHD}/`, updatedData);
        onUpdate(updatedData);
        toast({
          title: "Cập nhật thanh toán thành công",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Lỗi",
          description: "Không thể cập nhật thanh toán.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      if (trangThaiHoanTien === "" || !soTienHoan || isNaN(parseFloat(soTienHoan))) {
        toast({
          title: "Lỗi",
          description: "Vui lòng chọn trạng thái hoàn tiền và nhập số tiền hợp lệ.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      try {
        const updatedData = {
          ...invoice,
          TrangThaiHT: Number(trangThaiHoanTien),
          YeuCauHoanTien: true,
          SoTienHoan: soTienHoan,
          HinhThucHoan: hinhThucHoan,
          LyDoKhachH: lyDoKhachH,
          LyDoQly: lyDoQly,
        };
        await axios.put(`http://127.0.0.1:8000/api/hoa-don/${invoice.MaHD}/`, updatedData);
        onUpdate(updatedData);
        toast({
          title: "Cập nhật hoàn tiền thành công",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          title: "Lỗi",
          description: "Không thể cập nhật hoàn tiền.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
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
              type="number"
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
            <Input value={soTienHoan} onChange={(e) => setSoTienHoan(e.target.value)} type="number" />
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

      <Button colorScheme="blue" onClick={handleSubmit}>Lưu</Button>
    </VStack>
  );
};

export default InvoiceTransaction;