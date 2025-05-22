import { useState, useCallback, useEffect } from "react";
import axios from "axios";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/thong-bao/");
      const formattedNotifications = response.data.map((notification) => ({
        id: notification.MaTB,
        time: notification.ThoiGian,
        message: notification.NoiDung,
        type:
          notification.LoaiThongBao ||
          (notification.MaDG
            ? "rating"
            : notification.MaLH
            ? "appointment"
            : "other"),
        ratingId: notification.MaDG,
        appointmentId: notification.MaLH,
        isRead: notification.LoaiThongBao === "1",
      }));
      setNotifications(formattedNotifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    setHasUnread(unreadCount > 0);
  }, [notifications]);

  const markAsRead = useCallback(async (notificationId) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/thong-bao/${notificationId}/`,
        {
          LoaiThongBao: "1",
        }
      );
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  }, []);

  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: notification.MaTB,
      time: notification.ThoiGian,
      message: notification.NoiDung,
      type:
        notification.LoaiThongBao ||
        (notification.MaDG
          ? "rating"
          : notification.MaLH
          ? "appointment"
          : "other"),
      ratingId: notification.MaDG,
      appointmentId: notification.MaLH,
      isRead: notification.LoaiThongBao === "1",
    };
    setNotifications((prev) => [newNotification, ...prev]);
  }, []);

  const removeNotification = useCallback(async (notificationId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/thong-bao/${notificationId}/`
      );
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId)
      );
    } catch (error) {
      console.error("Error removing notification:", error);
    }
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
    const ws = new WebSocket("ws://127.0.0.1:8000/ws/thongbao/");

    ws.onopen = () => {
      console.log("WebSocket connected to /ws/thongbao/");
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("WebSocket message received:", data);
        if (onMessage) onMessage(data);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected from /ws/thongbao/");
    };

    return () => {
      ws.close();
    };
  }, [onMessage]);
}
