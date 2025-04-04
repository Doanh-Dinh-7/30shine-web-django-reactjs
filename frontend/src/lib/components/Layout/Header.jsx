// src/components/Layout/Header.jsx
import {
  Flex,
  InputGroup,
  Input,
  InputLeftElement,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Text,
} from "@chakra-ui/react";
import {
  FiSearch,
  FiBell,
  FiMail,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const Header = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      w="full"
      px="4"
      bg="white"
      borderBottomWidth="1px"
      borderColor="gray.200"
      h="16"
    >
      <InputGroup w="96" maxW="400px">
        <InputLeftElement pointerEvents="none">
          <FiSearch color="gray.300" />
        </InputLeftElement>
        <Input type="text" placeholder="Search..." borderRadius="md" />
      </InputGroup>

      <Flex align="center">
        <IconButton
          aria-label="Notifications"
          icon={<FiBell />}
          variant="ghost"
          mr="2"
        />
        <IconButton
          aria-label="Messages"
          icon={<FiMail />}
          variant="ghost"
          mr="4"
        />

        <Menu>
          <MenuButton>
            <Flex align="center">
              <Avatar
                size="sm"
                src="/placeholder.svg?height=40&width=40"
                mr="2"
              />
              <Box display={{ base: "none", md: "block" }}>
                <Text fontWeight="medium" fontSize="sm">
                  John Doe
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Admin
                </Text>
              </Box>
              <FiChevronDown size="1em" style={{ marginLeft: "8px" }} />
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FiUser />}>Profile</MenuItem>
            <MenuItem icon={<FiSettings />}>Settings</MenuItem>
            <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Header;
