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
  
const ForgetPasswordModal = ({ isOpen, onClose, onSwitchLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg="blackAlpha.200" />
      <ModalContent maxW="sm" borderRadius="lg" p={6}>
        <ModalCloseButton />
        <VStack spacing={4} align="stretch">
          <Text fontWeight="bold" fontSize="lg" align="center" color="#1E3A8A">Quên mật khẩu?</Text>

          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiMail} color="gray.400" />
              </InputLeftElement>
              <Input placeholder="Nhập email" />
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
              />
              <InputRightElement>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon as={showPassword ? FiEyeOff : FiEye} color="gray.500" boxSize={5} />
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text fontSize="xs" color="gray.500" fontStyle="italic">Sử dụng 8 ký tự trở lên</Text>
          </FormControl>

          <FormControl>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={FiLock} color="gray.400" />
              </InputLeftElement>
              <Input
                type={showConfirm ? "text" : "password"}
                placeholder="Nhập lại mật khẩu"
              />
              <InputRightElement>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  <Icon as={showConfirm ? FiEyeOff : FiEye} color="gray.500" boxSize={5} />
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button colorScheme="blue" bg="#2A50FC" color="white">
            Tiếp tục
          </Button>

          <Text fontSize="sm" color="blue.500" cursor="pointer" fontStyle="italic" onClick={onSwitchLogin}>
            &lt; Quay lại đăng nhập
          </Text>
        </VStack>
      </ModalContent>
    </Modal>
  );
};

export default ForgetPasswordModal;