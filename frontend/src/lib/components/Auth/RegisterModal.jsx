// src/components/Auth/Register.jsx
import {
  Button,
  FormControl,
  Input,
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff, FiLock, FiPhone, FiUser } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const RegisterModal = ({ isOpen, onClose, onSwitchLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [sdt, setSdt] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    if (!username || !password || !confirm || !sdt) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (password.length < 8) {
      setError("Mật khẩu phải từ 8 ký tự trở lên");
      return;
    }
    if (password !== confirm) {
      setError("Mật khẩu nhập lại không khớp");
      return;
    }
    try {
      await axios.post("http://localhost:8000/api/tai-khoan/dang-ky/", {
        username,
        password,
        sdt,
      });
      onSwitchLogin();
    } catch (err) {
      setError(err.response?.data?.detail || "Đăng ký thất bại");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.200" />
      <ModalContent maxW="sm" borderRadius="lg" p={6}>
        <ModalCloseButton />
        <VStack spacing={4} align="stretch">
          <Text fontWeight="bold" fontSize="lg" align="center" color="#1E3A8A">
            ĐĂNG KÝ
          </Text>

          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiUser} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Tên người dùng"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>
            <Text fontSize="xs" color="gray.500" fontStyle="italic">
              Ví dụ: Nguyễn Văn A =={">"} nguyenvanA
            </Text>
          </FormControl>

          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiPhone} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Số điện thoại"
                value={sdt}
                onChange={(e) => setSdt(e.target.value)}
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
            <Text fontSize="xs" color="gray.500" fontStyle="italic">
              Sử dụng 8 ký tự trở lên
            </Text>
          </FormControl>

          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiLock} color="gray.400" />
              </InputLeftElement>
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              <InputRightElement>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  <Icon
                    as={showConfirm ? FiEyeOff : FiEye}
                    color="gray.500"
                    boxSize={5}
                  />
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {error && (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}

          <Button
            colorScheme="blue"
            bg="#2A50FC"
            color="white"
            onClick={handleRegister}
          >
            Tạo tài khoản
          </Button>

          <Text
            fontSize="sm"
            color="blue.500"
            cursor="pointer"
            fontStyle="italic"
            onClick={onSwitchLogin}
          >
            &lt; Quay lại đăng nhập
          </Text>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

RegisterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSwitchLogin: PropTypes.func.isRequired,
};

export default RegisterModal;
