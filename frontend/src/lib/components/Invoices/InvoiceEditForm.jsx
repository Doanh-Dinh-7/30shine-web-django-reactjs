import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  HStack,
  useToast
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const InvoiceEditForm = ({ invoice, onUpdate }) => {
  const [formData, setFormData] = useState(invoice || {});
  const toast = useToast();

  useEffect(() => {
    setFormData(invoice || {});
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (index, field, value) => {
    const updatedDichVu = [...(formData.DichVu || [])];
    updatedDichVu[index][field] = value;
    setFormData((prev) => ({ ...prev, DichVu: updatedDichVu }));
  };

  const handleAddService = () => {
    setFormData((prev) => ({
      ...prev,
      DichVu: [...(prev.DichVu || []), { tenDichVu: "", soLuong: 1 }]
    }));
  };

  const handleRemoveService = (index) => {
    const updatedDichVu = (formData.DichVu || []).filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, DichVu: updatedDichVu }));
  };

  const handleSubmit = () => {
    // Validate dịch vụ
    const hasInvalidService = (formData.DichVu || []).some(
      (dv) => !dv.tenDichVu.trim() || dv.soLuong < 1
    );
    if (hasInvalidService) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập đầy đủ tên dịch vụ và số lượng hợp lệ!",
        status: "error",
        duration: 3000,
        isClosable: true
      });
      return;
    }
    onUpdate(formData);
  };

  return (
    <VStack spacing={5} align="stretch">
      <FormControl isRequired>
        <FormLabel>Họ tên khách hàng</FormLabel>
        <Input name="HoTenKH" value={formData.HoTenKH || ""} onChange={handleChange} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Mã khách hàng</FormLabel>
        <Input name="MaKH" value={formData.MaKH || ""} onChange={handleChange} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Dịch vụ khách hàng sử dụng</FormLabel>
        <VStack spacing={3} align="stretch">
          {(formData.DichVu || []).map((dv, index) => (
            <HStack key={index} spacing={3}>
              <Input
                placeholder="Tên dịch vụ"
                value={dv.tenDichVu}
                onChange={(e) => handleServiceChange(index, "tenDichVu", e.target.value)}
              />
              <Input
                placeholder="Số lượng"
                type="number"
                min={1}
                maxW="100px"
                value={dv.soLuong}
                onChange={(e) => handleServiceChange(index, "soLuong", e.target.value)}
              />
              {formData.DichVu.length > 1 && (
                <Button size="sm" colorScheme="red" variant="ghost" onClick={() => handleRemoveService(index)}>
                  -
                </Button>
              )}
            </HStack>
          ))}
          <Button size="sm" variant="outline" colorScheme="blue" onClick={handleAddService}>
            + Thêm dịch vụ
          </Button>
        </VStack>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Giá tiền</FormLabel>
        <Input name="GiaTien" value={formData.GiaTien || ""} onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Chiết khấu</FormLabel>
        <Input name="ChietKhau" value={formData.ChietKhau || ""} onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Nội dung</FormLabel>
        <Input name="NoiDung" value={formData.NoiDung || ""} onChange={handleChange} />
      </FormControl>

      <Button colorScheme="blue" onClick={handleSubmit}>
        Lưu
      </Button>
    </VStack>
  );
};

export default InvoiceEditForm;
