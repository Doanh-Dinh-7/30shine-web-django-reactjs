import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text,
  Button,
  Textarea,
  Flex,
  Box,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";
function RatingStars({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <Flex gap={1} align="center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Box
          as="span"
          key={star}
          cursor="pointer"
          fontSize="3xl"
          color={star <= (hovered || value) ? "yellow.400" : "gray.300"}
          transition="color 0.2s"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          _hover={{ transform: "scale(1.2)", color: "yellow.300" }}
        >
          ★
        </Box>
      ))}
    </Flex>
  );
}

RatingStars.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CustomerRatingModal = ({
  isOpen,
  onClose,
  onSubmit,
  value,
  onChange,
  content,
  onContentChange,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Đánh giá dịch vụ</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text mb={2}>Chọn số sao:</Text>
        <RatingStars value={value} onChange={onChange} />
        <Text mt={4} mb={2}>
          Nội dung đánh giá:
        </Text>
        <Textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          placeholder="Nhập cảm nhận của bạn..."
          rows={4}
        />
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={onSubmit}>
          Gửi đánh giá
        </Button>
        <Button variant="ghost" onClick={onClose}>
          Hủy
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

CustomerRatingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  onContentChange: PropTypes.func.isRequired,
};

export default CustomerRatingModal;
