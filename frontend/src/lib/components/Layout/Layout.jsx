// src/components/Layout/Layout.jsx
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Flex direction="column" h="100vh" bg="gray.50">
      <Flex>
        <Navbar />
      </Flex>
      <Box flex="1" overflow="auto" p={4}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Layout;
