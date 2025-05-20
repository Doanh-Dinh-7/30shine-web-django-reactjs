import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import InvoiceEditForm from "./InvoiceEditForm";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const formatDateTime = (isoString) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  if (isNaN(date)) return "-";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const InvoiceDetailDrawer = ({ isOpen, onClose, invoice, onUpdate }) => {
  const toast = useToast();
  const [tabIndex, setTabIndex] = useState(0);

  if (!invoice) return null;

  const handleUpdate = async (formData) => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/hoa-don/${formData.MaHD}/`,
        formData
      );
      onUpdate(formData);
    } catch (error) {
      console.error("Lỗi khi cập nhật hóa đơn:", error);
      throw error; // Ném lỗi để InvoiceEditForm xử lý
    }
  };

  return (
    <Drawer isOpen={isOpen} placement="right" size="xl" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <Box bg="blue.50" px={6} py={4}>
          <DrawerHeader p={0} fontWeight="bold">
            Hóa đơn: {invoice.MaHD}
            <Text fontSize="sm" color="gray.600">
              {formatDateTime(invoice.NgayLapHD)}
            </Text>
          </DrawerHeader>
        </Box>
        <DrawerCloseButton />

        <DrawerBody p={6}>
          <InvoiceEditForm invoice={invoice} onUpdate={handleUpdate} />
        </DrawerBody>
      </DrawerBody>
    </DrawerContent>
  );
};

export default InvoiceDetailDrawer;