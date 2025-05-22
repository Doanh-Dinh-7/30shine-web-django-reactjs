import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  IconButton,
  Text,
  Box,
  Badge,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FiBell, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useNotifications } from "./useNotifications";
import { useState } from "react";

const NotificationItem = ({ notification, onClick }) => {
  const { id, time, message, isRead, type } = notification;

  // Function to format the time string
  const formatTime = (timeString) => {
    if (!timeString) return "Vừa xong";
    try {
      const date = new Date(timeString);
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return "Thời gian không hợp lệ";
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    } catch (error) {
      console.error("Error formatting time:", error);
      return "Lỗi định dạng thời gian";
    }
  };

  const formattedTime = formatTime(time);

  return (
    <Box
      w="full"
      p="3"
      bg={!isRead ? "blue.50" : "white"}
      _hover={{ bg: "gray.50" }}
      cursor="pointer"
      onClick={() => onClick(id)}
      position="relative"
    >
      <Box>
        <Text fontSize="sm" noOfLines={2}>
          <Text as="span" fontWeight="medium">
            {type === "appointment"
              ? "Lịch hẹn mới"
              : type === "rating"
              ? "Đánh giá mới"
              : "Thông báo"}
          </Text>{" "}
          {message || "Không có nội dung"}
        </Text>
        <Text fontSize="xs" color="gray.500" mt="1">
          {formattedTime}
        </Text>
      </Box>
      {!isRead && (
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
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isRead: PropTypes.bool.isRequired,
    time: PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.string,
    ratingId: PropTypes.number,
    appointmentId: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

const NotificationPopover = () => {
  const navigate = useNavigate();
  const { notifications, hasUnread, markAsRead } = useNotifications();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");

  const handleNotificationClick = (notificationId) => {
    markAsRead(notificationId);
    onClose();
    const clickedNotification = notifications.find(
      (n) => n.id === notificationId
    );
    console.log(clickedNotification.type);

    if (clickedNotification) {
      if (
        clickedNotification.type === "appointment" ||
        clickedNotification.appointmentId
      ) {
        navigate("/appointments");
      } else if (
        clickedNotification.type === "rating" ||
        clickedNotification.ratingId
      ) {
        navigate("/feedback");
      } else {
        console.log(
          "Clicked on a notification with no specific navigation path.",
          clickedNotification
        );
      }
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return notification.message?.toLowerCase().includes(lowerSearchTerm);
  });

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
              {notifications.filter((n) => !n.isRead).length}
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
              <Input
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Box>
          <VStack
            align="stretch"
            spacing="0"
            maxH="400px"
            overflowY="auto"
            divider={<Box borderBottom="1px" borderColor="gray.100" />}
          >
            {[...filteredNotifications].reverse().map((notification) => (
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
