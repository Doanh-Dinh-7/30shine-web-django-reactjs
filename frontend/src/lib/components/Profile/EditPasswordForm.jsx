import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const EditPasswordForm = ({ onCancel, onSave }) => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("Mật khẩu mới không khớp.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("access");
      await axios.post(
        "http://127.0.0.1:8000/api/tai-khoan/doi-mat-khau/",
        {
          old_password: form.oldPassword,
          new_password: form.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      onSave();
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Đổi mật khẩu thất bại. Vui lòng thử lại.");
      }
    }
  };

  return (
    <Box
      bg="white"
      borderRadius="xl"
      p={6}
      flex={1}
      boxShadow="md"
      minW="350px"
    >
      <Flex align="center" mb={4} gap={2}>
        <span role="img" aria-label="password">
          🔒
        </span>
        <Heading size="md">Đổi mật khẩu</Heading>
      </Flex>
      <FormControl mb={3} isInvalid={!!error && !form.oldPassword}>
        <FormLabel>Mật khẩu cũ</FormLabel>
        <Input
          name="oldPassword"
          type="password"
          value={form.oldPassword}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mb={3} isInvalid={!!error && !form.newPassword}>
        <FormLabel>Mật khẩu mới</FormLabel>
        <Input
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl mb={3} isInvalid={!!error && !form.confirmPassword}>
        <FormLabel>Xác nhận mật khẩu mới</FormLabel>
        <Input
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
      <Flex gap={3} mt={4}>
        <Button variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button colorScheme="blue" onClick={handleSubmit} isLoading={loading}>
          Lưu
        </Button>
      </Flex>
    </Box>
  );
};

export default EditPasswordForm;
