import {
    Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerCloseButton,
    DrawerBody, Tabs, TabList, TabPanels, Tab, TabPanel, Box, Text
  } from "@chakra-ui/react";
  import { useState } from "react";
  import InvoiceEditForm from "./InvoiceEditForm";
  import InvoicePrintView from "./InvoicePrintView";
  import InvoiceTransaction from "./InvoiceTransaction";
  
  const InvoiceDetailDrawer = ({ isOpen, onClose, invoice, onUpdate }) => {
    const [tabIndex, setTabIndex] = useState(3); // Mặc định là tab "Chỉnh sửa"
  
    const now = new Date();
    const formattedTime = `${now.getHours()}:${now.getMinutes()} ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
  
    return (
      <Drawer isOpen={isOpen} placement="right" size="xl" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <Box bg="blue.50" px={6} py={4}>
            <DrawerHeader p={0} fontWeight="bold">
              Hóa đơn: {invoice.MaHD}
              <Text fontSize="sm" color="gray.600">{formattedTime}</Text>
            </DrawerHeader>
          </Box>
          <DrawerCloseButton />
  
          <DrawerBody p={0}>
            <Tabs index={tabIndex} onChange={setTabIndex} isFitted variant="enclosed-colored">
              <TabList bg="gray.50">
                <Tab>🧾 Thanh toán</Tab>
                <Tab>🖨️ Xuất hóa đơn</Tab>
                <Tab>✏️ Chỉnh sửa</Tab>
              </TabList>
  
              <TabPanels>
                <TabPanel p={6}><InvoiceTransaction invoice={invoice} onUpdate={onUpdate} /></TabPanel>
                <TabPanel p={6}><InvoicePrintView invoice={invoice} /></TabPanel>
                <TabPanel p={6}><InvoiceEditForm invoice={invoice} onUpdate={onUpdate} /></TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  };
  
  export default InvoiceDetailDrawer;
  