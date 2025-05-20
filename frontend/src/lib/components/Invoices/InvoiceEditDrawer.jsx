import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import InvoiceEditForm from "./InvoiceEditForm";

const InvoiceEditDrawer = ({ isOpen, onClose, invoice, onSubmit }) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <Box bg="blue.50" px={6} py={4}>
          <DrawerHeader p={0} color="black" fontWeight="semibold">
            Chỉnh sửa hóa đơn: {invoice?.MaHD}
            <Text fontSize="sm" color="gray.600">
              {invoice?.NgayLapHD
                ? new Date(invoice.NgayLapHD).toLocaleString()
                : ""}
            </Text>
          </DrawerHeader>
        </Box>
        <DrawerCloseButton />

        <DrawerBody py={6} overflow="auto" maxHeight="calc(100vh - 160px)">
          <InvoiceEditForm invoice={invoice} onUpdate={onSubmit} />
        </DrawerBody>

        
      </DrawerContent>
    </Drawer>
  );
};

InvoiceEditDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  invoice: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default InvoiceEditDrawer;