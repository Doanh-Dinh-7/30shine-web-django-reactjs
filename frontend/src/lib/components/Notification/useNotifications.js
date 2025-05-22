import { useState, useCallback, useEffect } from "react";

const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    type: "appointment",
    customerName: "Nguyễn Hoàng",
    message: "đã đặt lịch hẹn lúc 8:00 ngày 27/04/2025",
    time: "5 phút trước",
    isRead: false,
  },
  {
    id: "2",
    type: "rating",
    customerName: "Lê Đức Kiên",
    message: "đã đánh giá 5 sao cho dịch vụ",
    time: "10 phút trước",
    isRead: false,
  },
  {
    id: "3",
    type: "appointment",
    customerName: "Trần Văn Nam",
    message: "đã hủy lịch hẹn lúc 15:30 ngày 26/04/2025",
    time: "15 phút trước",
    isRead: true,
  },
  {
    id: "4",
    type: "rating",
    customerName: "Phạm Thị Hương",
    message: "đã đánh giá 4 sao và bình luận về dịch vụ",
    time: "30 phút trước",
    isRead: false,
  },
  {
    id: "5",
    type: "appointment",
    customerName: "Nguyễn Văn An",
    message: "đã thay đổi lịch hẹn sang 10:00 ngày 28/04/2025",
    time: "1 giờ trước",
    isRead: true,
  },
  {
    id: "6",
    type: "rating",
    customerName: "Lê Thị Bình",
    message: "đã đánh giá 5 sao và để lại lời khen cho nhân viên",
    time: "2 giờ trước",
    isRead: false,
  },
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [hasUnread, setHasUnread] = useState(false);

  // Kiểm tra thông báo chưa đọc
  useEffect(() => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    setHasUnread(unreadCount > 0);
  }, [notifications]);

  // Đánh dấu thông báo đã đọc
  const markAsRead = useCallback((notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  }, []);

  // Đánh dấu tất cả là đã đọc
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  }, []);

  // Thêm thông báo mới
  const addNotification = useCallback((notification) => {
    setNotifications((prev) => [
      {
        id: Date.now().toString(),
        isRead: false,
        time: "Vừa xong",
        ...notification,
      },
      ...prev,
    ]);
  }, []);

  // Xóa thông báo
  const removeNotification = useCallback((notificationId) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId)
    );
  }, []);

  return {
    notifications,
    hasUnread,
    markAsRead,
    markAllAsRead,
    addNotification,
    removeNotification,
  };
};

export function useNotificationWebSocket(onMessage) {
  useEffect(() => {
    // Địa chỉ WebSocket backend (có thể cần sửa lại cho đúng)
    const ws = new WebSocket("ws://localhost:8000/ws/notification/");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Gọi callback khi có message mới
      if (onMessage) onMessage(data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    // Cleanup khi component unmount
    return () => {
      ws.close();
    };
  }, [onMessage]);
}
