import {
  Avatar,
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  VStack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import PropTypes from "prop-types";
import { useState } from "react";
import Logo from "../../../../public/logo_30shine.png";
import LoginModal from "../Auth/LoginModal";
import RegisterModal from "../Auth/RegisterModal";
import ForgetPasswordModal from "../Auth/ForgetPasswordModal";
import NotificationPopover from "../Notification/NotificationPopover";

const NavItem = ({ children, to, onClose }) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        fontWeight: isActive ? "bold" : "normal",
      })}
    >
      {({ isActive }) => (
        <Flex
          align="center"
          px="4"
          py="2"
          borderRadius="md"
          role="group"
          cursor="pointer"
          bg={isActive ? "blue.50" : "transparent"}
          color={isActive ? "blue.500" : "gray.600"}
          _hover={{
            bg: "blue.50",
            color: "blue.500",
          }}
          onClick={onClose}
        >
          {children}
        </Flex>
      )}
    </NavLink>
  );
};

NavItem.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

const Navbar = ({ onOpenRegister }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [authModal, setAuthModal] = useState(null); // "login" | "register" | "forgot"
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });
  const role = localStorage.getItem("role");

  const handleOpenRegister = () => {
    if (onOpenRegister) onOpenRegister();
    else setAuthModal("register");
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    localStorage.removeItem("MaKH");
    localStorage.removeItem("user");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/";
  };

  const renderNavItems = () => {
    const navs = [
      { label: "Trang chủ", to: "/" },
      { label: "Đặt lịch hẹn", to: "/appointments" },
      { label: "Dịch vụ", to: "/services" },
    ];

    const customerNavs = [
      { label: "Trang chủ", to: "/" },
      { label: "Đặt lịch hẹn", to: "/appointments" },
      { label: "Dịch vụ", to: "/services" },
      { label: "Hoá đơn", to: "/invoices" },
    ];

    const managerNavs = [
      { label: "Trang chủ", to: "/" },
      { label: "Lịch hẹn", to: "/appointments" },
      { label: "Dịch vụ & Giá cả", to: "/services" },
      { label: "Khách hàng", to: "/customers" },
      { label: "Đánh giá & Phản hồi", to: "/feedback" },
      { label: "Nhân viên", to: "/employees" },
      { label: "Hoá đơn", to: "/invoices" },
    ];

    if (role === "quan ly") {
      // Giao diện sau khi đăng nhập cho quản lý
      if (isMobile) {
        return (
          <Popover isOpen={isOpen} onClose={onClose} placement="bottom-end">
            <PopoverTrigger>
              <Button
                leftIcon={<FiMenu />}
                variant="ghost"
                onClick={onOpen}
                color="gray.600"
                _hover={{ bg: "blue.50", color: "blue.500" }}
              >
                Menu
              </Button>
            </PopoverTrigger>
            <PopoverContent w="200px">
              <PopoverBody p={0}>
                <VStack align="stretch" spacing={0}>
                  {managerNavs.map((nav) => (
                    <NavItem key={nav.to} to={nav.to} onClose={onClose}>
                      {nav.label}
                    </NavItem>
                  ))}
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        );
      }
      if (isTablet || !isMobile) {
        return managerNavs.map((nav) => (
          <NavItem key={nav.to} to={nav.to}>
            {nav.label}
          </NavItem>
        ));
      }
    }

    if (role === "khach hang") {
      // Giao diện trước khi đăng nhập
      if (isMobile) {
        return (
          <Popover isOpen={isOpen} onClose={onClose} placement="bottom-start">
            <PopoverTrigger>
              <Button
                leftIcon={<FiMenu />}
                variant="ghost"
                onClick={onOpen}
                color="gray.600"
                _hover={{ bg: "blue.50", color: "blue.500" }}
              >
                Menu
              </Button>
            </PopoverTrigger>
            <PopoverContent w="200px">
              <PopoverBody p={0}>
                <VStack align="stretch" spacing={0}>
                  {customerNavs.map((nav) => (
                    <NavItem key={nav.to} to={nav.to} onClose={onClose}>
                      {nav.label}
                    </NavItem>
                  ))}
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        );
      }

      return customerNavs.map((nav) => (
        <NavItem key={nav.to} to={nav.to}>
          {nav.label}
        </NavItem>
      ));
    }

    // Giao diện trước khi đăng nhập
    if (isMobile) {
      return (
        <Popover isOpen={isOpen} onClose={onClose} placement="bottom-start">
          <PopoverTrigger>
            <Button
              leftIcon={<FiMenu />}
              variant="ghost"
              onClick={onOpen}
              color="gray.600"
              _hover={{ bg: "blue.50", color: "blue.500" }}
            >
              Menu
            </Button>
          </PopoverTrigger>
          <PopoverContent w="200px">
            <PopoverBody p={0}>
              <VStack align="stretch" spacing={0}>
                {navs.map((nav) => (
                  <NavItem key={nav.to} to={nav.to} onClose={onClose}>
                    {nav.label}
                  </NavItem>
                ))}
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      );
    }

    return navs.map((nav) => (
      <NavItem key={nav.to} to={nav.to}>
        {nav.label}
      </NavItem>
    ));
  };

  return (
    <Box
      w="full"
      h="16"
      borderBottom="1px"
      borderBottomColor="gray.200"
      bg="white"
    >
      <Flex h="full" mx="8" align="center" justify="space-between">
        <Flex align="center">
          <Image src={Logo} alt="30Shine" h="8" mr="8" />
        </Flex>
        {role === "quan ly" && (
          <Flex flex={1} justify="center">
            {renderNavItems()}
          </Flex>
        )}
        {role !== "quan ly" && (
          <Flex flex={1} justify="center">
            {renderNavItems()}
          </Flex>
        )}
        <Flex align="center" gap="4">
          {role === "quan ly" && <NotificationPopover />}
          {role === "quan ly" || role === "khach hang" ? (
            <Menu>
              <MenuButton
                as={Flex}
                cursor="pointer"
                _hover={{ bg: "gray.50" }}
                p={2}
                borderRadius="md"
              >
                <Flex align="center">
                  <Avatar
                    size="sm"
                    src="/placeholder.svg?height=40&width=40"
                    mr="2"
                  />
                  <Box display={{ base: "none", md: "block" }}>
                    <Text fontWeight="medium" fontSize="sm">
                      {localStorage.getItem("username")}
                    </Text>
                    <Text fontSize="xs" color="gray.500">
                      {localStorage.getItem("role") === "quan ly"
                        ? "Quản lý"
                        : "Khách hàng"}
                    </Text>
                  </Box>
                  <FiChevronDown size="1em" style={{ marginLeft: "8px" }} />
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <NavLink to={"/profile"}>Thông tin cá nhân</NavLink>
                </MenuItem>
                <MenuItem>Đổi mật khẩu</MenuItem>
                <MenuItem color="red.500" onClick={handleLogout}>
                  Đăng xuất
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Flex gap={2}>
              <Button
                bg="#2A50FC"
                color="white"
                onClick={() => setAuthModal("login")}
                _hover={{ bg: "#2A50FC" }}
              >
                Đăng nhập
              </Button>
              <Button
                variant="outline"
                borderColor="transparent"
                color="#2A50FC"
                onClick={handleOpenRegister}
                _hover={{ bg: "gray.100" }}
              >
                Đăng ký
              </Button>
            </Flex>
          )}

          <LoginModal
            isOpen={authModal === "login"}
            onClose={() => setAuthModal(null)}
            onSwitchRegister={handleOpenRegister}
            onSwitchForgot={() => setAuthModal("forgot")}
            onLoginSuccess={() => {
              localStorage.setItem("role", "quan ly");
              window.location.reload();
            }}
          />
          <RegisterModal
            isOpen={authModal === "register"}
            onClose={() => setAuthModal(null)}
            onSwitchLogin={() => setAuthModal("login")}
          />
          <ForgetPasswordModal
            isOpen={authModal === "forgot"}
            onClose={() => setAuthModal(null)}
            onSwitchLogin={() => setAuthModal("login")}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

Navbar.propTypes = {
  onScroll: PropTypes.func,
  onOpenRegister: PropTypes.func,
  activeSection: PropTypes.string,
};

export default Navbar;
