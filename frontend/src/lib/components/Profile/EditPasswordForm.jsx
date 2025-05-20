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

const EditPasswordForm = ({ onCancel, onSave }) => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = () => {
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("Mật khẩu mới không khớp.");
      return;
    }
    onSave(form);
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
        <Button colorScheme="blue" onClick={handleSubmit}>
          Lưu
        </Button>
      </Flex>
    </Box>
  );
};

export default EditPasswordForm;
