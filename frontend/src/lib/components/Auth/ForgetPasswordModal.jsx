// src/components/Auth/ForgetPassword.jsx
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
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const ForgetPasswordModal = ({ isOpen, onClose, onSwitchLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [sdt, setSdt] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!sdt || !newPassword || !confirm) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (newPassword.length < 8) {
      setError("Mật khẩu phải từ 8 ký tự trở lên");
      return;
    }
    if (newPassword !== confirm) {
      setError("Mật khẩu nhập lại không khớp");
      return;
    }
    try {
      await axios.post("http://localhost:8000/api/tai-khoan/quen-mat-khau/", {
        new_password: newPassword,
        sdt: sdt,
      });
      onSwitchLogin();
    } catch (err) {
      setError(err.response?.data?.detail || "Đổi mật khẩu thất bại");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.200" />
      <ModalContent maxW="sm" borderRadius="lg" p={6}>
        <ModalCloseButton />
        <VStack spacing={4} align="stretch">
          <Text fontWeight="bold" fontSize="lg" align="center" color="#1E3A8A">
            Quên mật khẩu?
          </Text>

          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiMail} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Nhập số điện thoại"
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
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
            onClick={handleSubmit}
          >
            Tiếp tục
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

ForgetPasswordModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSwitchLogin: PropTypes.func.isRequired,
};

export default ForgetPasswordModal;
