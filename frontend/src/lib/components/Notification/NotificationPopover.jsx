import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  IconButton,
  VStack,
  Text,
  Box,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from "@chakra-ui/react";
import { FiBell, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useNotifications } from "./useNotifications";

const NotificationItem = ({ notification, onClick }) => {
  return (
    <Box
      w="full"
      p="3"
      bg={!notification.isRead ? "blue.50" : "white"}
      _hover={{ bg: "gray.50" }}
      cursor="pointer"
      onClick={() => onClick(notification)}
      position="relative"
    >
      <Box>
        <Text fontSize="sm" noOfLines={2}>
          <Text as="span" fontWeight="medium">
            Khách hàng {notification.customerName}
          </Text>{" "}
          {notification.message}
        </Text>
        <Text fontSize="xs" color="gray.500" mt="1">
          {notification.time}
        </Text>
      </Box>
      {!notification.isRead && (
        <Badge 
          colorScheme="red" 
          borderRadius="full"
          position="absolute"
          top="3"
          right="3"
        />
      )}
    </Box>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["appointment", "rating"]).isRequired,
    customerName: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    isRead: PropTypes.bool.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

const NotificationPopover = () => {
  const navigate = useNavigate();
  const { notifications, hasUnread, markAsRead } = useNotifications();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    onClose();
    if (notification.type === "appointment") {
      navigate("/appointments");
    } else if (notification.type === "rating") {
      navigate("/feedback");
    }
  };

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      placement="bottom-end"
    >
      <PopoverTrigger>
        <Box position="relative">
          <IconButton
            icon={<FiBell />}
            variant="ghost"
            size="lg"
            aria-label="Thông báo"
            isRound={true}
            color={hasUnread ? "blue.500" : "gray.600"}
            bg={hasUnread ? "blue.50" : "transparent"}
            _hover={{ bg: "blue.50", color: "blue.500" }}
          />
          {hasUnread && (
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
              {notifications.filter(n => !n.isRead).length}
            </Badge>
          )}
        </Box>
      </PopoverTrigger>
      <PopoverContent w="400px" maxH="500px" overflow="hidden">
        <PopoverBody p="0">
          <Box p="3" borderBottom="1px" borderColor="gray.200">
            <Text fontSize="lg" fontWeight="medium" mb="2">
              Thông Báo
            </Text>
            <InputGroup size="sm">
              <InputLeftElement pointerEvents="none">
                <FiSearch color="gray.300" />
              </InputLeftElement>
              <Input placeholder="Tìm kiếm..." />
            </InputGroup>
          </Box>
          <VStack
            align="stretch"
            spacing="0"
            maxH="400px"
            overflowY="auto"
            divider={<Box borderBottom="1px" borderColor="gray.100" />}
          >
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={handleNotificationClick}
              />
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover; 