// src/components/Layout/Sidebar.jsx
import { Box, VStack, Text, Flex, Icon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FiUsers, FiCalendar, FiDollarSign } from "react-icons/fi";

const NavItem = ({ icon, children, to }) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        fontWeight: isActive ? "bold" : "normal",
        width: "100%",
      })}
    >
      {({ isActive }) => (
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          bg={isActive ? "white" : "transparent"}
          color={isActive ? "black" : "gray.600"}
          _hover={{
            bg: "white",
            color: "black",
          }}
        >
          <Icon mr="4" fontSize="16" as={icon} />
          {children}
        </Flex>
      )}
    </NavLink>
  );
};

const Sidebar = () => {
  return (
    <Box
      w="240px"
      h="full"
      borderRight="1px"
      borderRightColor="gray.200"
      bg="white"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          HRMS
        </Text>
      </Flex>
      <VStack spacing={0} align="stretch">
        <NavItem icon={FiUsers} to="/employees">
          Employees
        </NavItem>
        <NavItem icon={FiCalendar} to="/timekeeping">
          Timekeeping
        </NavItem>
        <NavItem icon={FiDollarSign} to="/payslips">
          Payslips
        </NavItem>
      </VStack>
    </Box>
  );
};

export default Sidebar;
