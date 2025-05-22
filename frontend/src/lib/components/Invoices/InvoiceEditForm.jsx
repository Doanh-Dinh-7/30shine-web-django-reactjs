import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const trangThaiTTOptions = [
  { value: 0, label: "Chưa thanh toán" },
  { value: 1, label: "Đã thanh toán" },
  { value: 2, label: "Đã đánh giá" },
];

const trangThaiHTOptions = [
  { value: 0, label: "Chưa hoàn" },
  { value: 1, label: "Đã yêu cầu hoàn" },
  { value: 2, label: "Đã hoàn" },
  { value: 3, label: "Đã từ chối" },
];

const InvoiceEditForm = ({ invoice, onUpdate }) => {
  const [formData, setFormData] = useState({
    MaKH: "",
    HoTenKH: "",
    TongTien: "0.00",
    GhiChu: "",
    LyDoKhachH: "",
    LyDoQly: "",
    TrangThaiTT: 0,
    TrangThaiHT: 0,
    chi_tiet: [{ MaDV: 1, TenDV: "", ThanhTien: "0.00", SoLuong: 1 }],
  });

  const toast = useToast();

  useEffect(() => {
    if (invoice) {
      setFormData({
        ...invoice,
        TongTien: parseFloat(invoice.TongTien || 0).toFixed(2),
        TrangThaiTT: Number(invoice.TrangThaiTT || 0),
        TrangThaiHT: Number(invoice.TrangThaiHT || 0),
        LyDoKhachH: invoice.LyDoKhachH || "",
        LyDoQly: invoice.LyDoQly || "",
        chi_tiet: invoice.chi_tiet?.length
          ? invoice.chi_tiet.map((dv, index) => ({
              MaDV: dv.MaDV || index + 1,
              TenDV: dv.TenDV || "",
              ThanhTien: parseFloat(dv.ThanhTien || 0).toFixed(2),
              SoLuong: dv.SoLuong || 1,
            }))
          : [{ MaDV: 1, TenDV: "", ThanhTien: "0.00", SoLuong: 1 }],
      });
    }
  }, [invoice]);

  // Tính toán TongTien dựa trên chi_tiet
  const calculateTotal = (chi_tiet) => {
    const total = chi_tiet.reduce((sum, dv) => {
      const thanhTien = parseFloat(dv.ThanhTien) || 0;
      const soLuong = dv.SoLuong || 1;
      return sum + thanhTien * soLuong;
    }, 0);
    return total.toFixed(2);
  };

  // Cập nhật TongTien khi chi_tiet thay đổi
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      TongTien: calculateTotal(prev.chi_tiet),
    }));
  }, [formData.chi_tiet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleServiceChange = (index, field, value) => {
    const updatedChiTiet = [...formData.chi_tiet];
    updatedChiTiet[index][field] =
      field === "SoLuong"
        ? Number(value)
        : field === "ThanhTien"
        ? parseFloat(value).toFixed(2)
        : value;
    setFormData((prev) => ({ ...prev, chi_tiet: updatedChiTiet }));
  };

  const handleAddService = () => {
    setFormData((prev) => ({
      ...prev,
      chi_tiet: [
        ...prev.chi_tiet,
        {
          MaDV: prev.chi_tiet.length + 1,
          TenDV: "",
          ThanhTien: "0.00",
          SoLuong: 1,
        },
      ],
    }));
  };

  const handleRemoveService = (index) => {
    const updatedChiTiet = formData.chi_tiet.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, chi_tiet: updatedChiTiet }));
  };

  const handleSubmit = () => {
    const hasInvalidService = formData.chi_tiet.some(
      (dv) =>
        !dv.TenDV.trim() ||
        isNaN(parseFloat(dv.ThanhTien)) ||
        parseFloat(dv.ThanhTien) <= 0 ||
        dv.SoLuong < 1
    );

    if (!formData.MaKH || !formData.HoTenKH || hasInvalidService) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ thông tin hợp lệ!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const payload = {
      ...formData,
      TongTien: parseFloat(formData.TongTien).toFixed(2),
      chi_tiet: formData.chi_tiet.map((dv) => ({
        MaDV: dv.MaDV,
        TenDV: dv.TenDV,
        ThanhTien: parseFloat(dv.ThanhTien).toFixed(2),
        SoLuong: dv.SoLuong,
      })),
    };

    try {
      onUpdate(payload);
      setFormData({
        ...formData,
        MaKH: "",
        HoTenKH: "",
        TongTien: "0.00",
        GhiChu: "",
        LyDoKhachH: "",
        LyDoQly: "",
        TrangThaiTT: 0,
        TrangThaiHT: 0,
        chi_tiet: [{ MaDV: 1, TenDV: "", ThanhTien: "0.00", SoLuong: 1 }],
      });
      toast({
        title: "Cập nhật hóa đơn thành công",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Lỗi khi cập nhật hóa đơn:", error);
      toast({
        title: "Lỗi",
        description:
          error.message || "Không thể lưu thông tin. Vui lòng thử lại.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={5} align="stretch">
      <FormControl isRequired>
        <FormLabel>Họ tên khách hàng</FormLabel>
        <Input
          name="HoTenKH"
          value={formData.HoTenKH || ""}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Mã khách hàng</FormLabel>
        <Input
          name="MaKH"
          value={formData.MaKH || ""}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Dịch vụ khách hàng sử dụng</FormLabel>
        <VStack spacing={3} align="stretch">
          {formData.chi_tiet.map((dv, index) => (
            <HStack key={index} spacing={3}>
              <Input
                placeholder="Tên dịch vụ"
                value={dv.TenDV || ""}
                onChange={(e) =>
                  handleServiceChange(index, "TenDV", e.target.value)
                }
              />
              <Input
                placeholder="Thành tiền"
                type="number"
                step="0.01"
                value={dv.ThanhTien || ""}
                onChange={(e) =>
                  handleServiceChange(index, "ThanhTien", e.target.value)
                }
              />
              <Input
                placeholder="Số lượng"
                type="number"
                min={1}
                maxW="100px"
                value={dv.SoLuong || 1}
                onChange={(e) =>
                  handleServiceChange(index, "SoLuong", e.target.value)
                }
              />
              {formData.chi_tiet.length > 1 && (
                <Button
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => handleRemoveService(index)}
                >
                  -
                </Button>
              )}
            </HStack>
          ))}
          <Button
            size="sm"
            variant="outline"
            colorScheme="blue"
            onClick={handleAddService}
          >
            + Thêm dịch vụ
          </Button>
        </VStack>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Tổng tiền</FormLabel>
        <Input
          name="TongTien"
          value={formData.TongTien || ""}
          isReadOnly
          bg="gray.100"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Ghi chú</FormLabel>
        <Input
          name="GhiChu"
          value={formData.GhiChu || ""}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Lý do khách hàng</FormLabel>
        <Input
          name="LyDoKhachH"
          value={formData.LyDoKhachH || ""}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Lý do quản lý</FormLabel>
        <Input
          name="LyDoQly"
          value={formData.LyDoQly || ""}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Trạng thái thanh toán</FormLabel>
        <Select
          name="TrangThaiTT"
          value={formData.TrangThaiTT || 0}
          onChange={handleSelectChange}
          maxW="200px"
        >
          {trangThaiTTOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Trạng thái hoàn tiền</FormLabel>
        <Select
          name="TrangThaiHT"
          value={formData.TrangThaiHT || 0}
          onChange={handleSelectChange}
          maxW="200px"
        >
          {trangThaiHTOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      </FormControl>

      <Button colorScheme="blue" onClick={handleSubmit}>
        Lưu
      </Button>
    </VStack>
  );
};

InvoiceEditForm.propTypes = {
  invoice: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default InvoiceEditForm;
