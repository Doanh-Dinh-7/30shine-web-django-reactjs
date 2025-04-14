// src/components/Layout/Navbar.jsx
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Badge,
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
import {
  FiHome,
  FiCalendar,
  FiDollarSign,
  FiUsers,
  FiChevronDown,
  FiBell,
  FiMessageSquare,
  FiFileText,
  FiChevronUp,
  FiMenu,
} from "react-icons/fi";
import PropTypes from "prop-types";
import { useState } from "react";
import Logo from "../../../../public/logo_30shine.png";
import LoginModal from "../Auth/LoginModal";
import RegisterModal from "../Auth/RegisterModal";
import ForgetPasswordModal from "../Auth/ForgetPasswordModal";

const NavItem = ({ icon, children, to, onClose }) => {
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
          {/* <Icon mr="2" fontSize="16" as={icon} /> */}
          {children}
        </Flex>
      )}
    </NavLink>
  );
};

NavItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

const Navbar = () => {
  const [hasNotification] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [authModal, setAuthModal] = useState(null); // "login" | "register" | "forgot"
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });
  const role = localStorage.getItem("role");

  const renderNavItems = () => {
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
                <NavItem to="/" onClose={onClose}>
                  Trang chủ
                </NavItem>
                <NavItem to="/appointments" onClose={onClose}>
                  Lịch hẹn
                </NavItem>
                <NavItem to="/services" onClose={onClose}>
                  Dịch vụ & Giá cả
                </NavItem>
                <NavItem to="/customers" onClose={onClose}>
                  Khách hàng
                </NavItem>
                <NavItem to="/feedback" onClose={onClose}>
                  Đánh giá & Phản hồi
                </NavItem>
                <NavItem to="/employees" onClose={onClose}>
                  Nhân viên
                </NavItem>
                <NavItem to="/invoices" onClose={onClose}>
                  Hoá đơn
                </NavItem>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      );
    }

    if (isTablet) {
      return (
        <>
          <NavItem to="/">Trang chủ</NavItem>
          <NavItem to="/appointments">Lịch hẹn</NavItem>
          <NavItem to="/services">Dịch vụ & Giá cả</NavItem>
          <NavItem to="/customers">Khách hàng</NavItem>
          <Popover placement="bottom-start">
            <PopoverTrigger>
              <Button
                rightIcon={<FiChevronDown />}
                variant="ghost"
                color="gray.600"
                _hover={{ bg: "blue.50", color: "blue.500" }}
              >
                Thêm
              </Button>
            </PopoverTrigger>
            <PopoverContent w="200px">
              <PopoverBody p={0}>
                <VStack align="stretch" spacing={0}>
                  <NavItem to="/feedback">Đánh giá & Phản hồi</NavItem>
                  <NavItem to="/employees">Nhân viên</NavItem>
                  <NavItem to="/invoices">Hoá đơn</NavItem>
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </>
      );
    }

    return (
      <>
        <NavItem to="/">Trang chủ</NavItem>
        <NavItem to="/appointments">Lịch hẹn</NavItem>
        <NavItem to="/services">Dịch vụ & Giá cả</NavItem>
        <NavItem to="/customers">Khách hàng</NavItem>
        <NavItem to="/feedback">Đánh giá & Phản hồi</NavItem>
        <NavItem to="/employees">Nhân viên</NavItem>
        <NavItem to="/invoices">Hoá đơn</NavItem>
      </>
    );
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
          <Flex gap="4">{renderNavItems()}</Flex>
        </Flex>

        <Flex align="center" gap="4">
          <Box position="relative">
            <IconButton
              icon={<FiBell />}
              variant="ghost"
              size="lg"
              aria-label="Thông báo"
              isRound={true}
              color={hasNotification ? "blue.500" : "gray.600"}
              bg={hasNotification ? "blue.50" : "transparent"}
              _hover={{ bg: "blue.50", color: "blue.500" }}
            />
            {hasNotification && (
              <Badge
                position="absolute"
                top="-1"
                right="-1"
                colorScheme="red"
                borderRadius="full"
                w="4"
                h="4"
                p="0"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                2
              </Badge>
            )}
          </Box>
          {role === "quan ly"? (
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
                <MenuItem>Thông tin cá nhân</MenuItem>
                <MenuItem>Đổi mật khẩu</MenuItem>
                <MenuItem color="red.500">Đăng xuất</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Flex gap={2}>
              {/* Nút nếu chưa đăng nhập */}
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
                onClick={() => setAuthModal("register")}
                _hover={{ bg: "gray.100" }}
              >
                Đăng ký
              </Button>
            </Flex>
          )}
          
          

          {/* Các modal */}
          <LoginModal
            isOpen={authModal === "login"}
            onClose={() => setAuthModal(null)}
            onSwitchRegister={() => setAuthModal("register")}
            onSwitchForgot={() => setAuthModal("forgot")}
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

export default Navbar;
