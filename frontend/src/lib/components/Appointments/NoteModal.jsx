import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const NoteModal = ({ isOpen, onClose, note, appointmentId }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ghi chú: {appointmentId}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          {note}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

NoteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  note: PropTypes.string.isRequired,
  appointmentId: PropTypes.string.isRequired,
};

export default NoteModal; 