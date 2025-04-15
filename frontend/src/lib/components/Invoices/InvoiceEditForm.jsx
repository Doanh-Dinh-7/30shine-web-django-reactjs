import {
    VStack, FormControl, FormLabel, Input, Button
  } from "@chakra-ui/react";
  import { useState, useEffect } from "react";
  
  const InvoiceEditForm = ({ invoice, onUpdate }) => {
    const [formData, setFormData] = useState(invoice);
  
    useEffect(() => {
      setFormData(invoice);
    }, [invoice]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = () => {
      onUpdate(formData);
    };
  
    return (
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Họ tên khách hàng</FormLabel>
          <Input name="HoTenKH" value={formData.HoTenKH || ""} onChange={handleChange} />
        </FormControl>
        <FormControl>
          <FormLabel>Mã khách hàng</FormLabel>
          <Input name="MaKH" value={formData.MaKH || ""} onChange={handleChange} />
        </FormControl>
        <FormControl>
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
        <Button colorScheme="blue" onClick={handleSubmit}>Lưu</Button>
      </VStack>
    );
  };
  
  export default InvoiceEditForm;
  