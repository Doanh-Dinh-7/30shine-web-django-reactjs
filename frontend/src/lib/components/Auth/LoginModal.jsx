// src/components/Auth/Login.jsx
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff, FiLock, FiPhone } from "react-icons/fi";
import { useState } from "react";

const LoginModal = ({ isOpen, onClose, onSwitchRegister, onSwitchForgot }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    localStorage.setItem("role", "quan ly");
    onClose();
    window.location.reload();
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
              <Input placeholder="Nhập số điện thoại" />
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
