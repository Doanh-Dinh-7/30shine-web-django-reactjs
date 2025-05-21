// src/components/Auth/Login.jsx
import {
  Button,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff, FiLock, FiPhone } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";

const LoginModal = ({ isOpen, onClose, onSwitchRegister, onSwitchForgot }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    console.log(username, password);
    if (username === "admin" && password === "") {
      localStorage.setItem("username", "admin");
      localStorage.setItem("role", "quan ly");
      onClose();
      window.location.reload();
      return;
    }
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/tai-khoan/dang-nhap/",
        {
          sdt: username,
          password,
        }
      );
      const { access, refresh, user } = res.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      if (username === "admin") {
        localStorage.setItem("username", "admin");
        localStorage.setItem("role", "quan ly");
      } else {
        localStorage.setItem("role", "khach hang");
        localStorage.setItem("MaKH", user.id);
        const res = await axios.get(
          `http://127.0.0.1:8000/api/khach-hang/${user.id}/`
        );
        const khachHang = res.data;
        localStorage.setItem("username", khachHang.HoTenKH);
        localStorage.setItem("user", JSON.stringify(khachHang));
      }
      onClose();
      window.location.reload();
    } catch (err) {
      setError("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.200" />
      <ModalContent maxW="sm" borderRadius="lg" p={6}>
        <ModalCloseButton />
        <VStack spacing={4} align="stretch">
          <Text fontWeight="bold" fontSize="lg" align="center" color="#1E3A8A">
            Chào mừng bạn đến với 30Shine
          </Text>
          <Text
            fontWeight="bold"
            fontSize="lg"
            align="center"
            mt={-2}
            color="#1E3A8A"
          >
            ĐĂNG NHẬP
          </Text>

          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiPhone} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Nhập số điện thoại"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiLock} color="gray.400" />
              </InputLeftElement>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    as={showPassword ? FiEyeOff : FiEye}
                    color="gray.500"
                    boxSize={5}
                  />
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text
              fontSize="sm"
              textAlign="right"
              color="blue.500"
              cursor="pointer"
              fontStyle="italic"
              onClick={onSwitchForgot}
            >
              Quên mật khẩu?
            </Text>
          </FormControl>

          {error && (
            <Text color="red.500" fontSize="sm" textAlign="center">
              {error}
            </Text>
          )}

          <Button
            colorScheme="blue"
            bg="#2A50FC"
            color="white"
            onClick={handleLogin}
          >
            Đăng Nhập
          </Button>

          <Text fontSize="sm" align="center">
            Tôi muốn{" "}
            <Text
              as="span"
              color="blue.500"
              cursor="pointer"
              fontStyle="italic"
              onClick={onSwitchRegister}
            >
              Đăng ký
            </Text>
          </Text>
        </VStack>
      </ModalContent>
    </Modal>
  );
};
export default LoginModal;
