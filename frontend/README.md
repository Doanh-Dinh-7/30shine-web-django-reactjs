# Frontend Ứng dụng quản lý tiệm tóc 30Shine

Đây là repository chứa mã nguồn frontend cho ứng dụng quản lý tiệm tóc 30Shine.

Frontend được xây dựng bằng React với Vite, sử dụng Chakra UI cho giao diện và kết nối với backend Django.

## Mục lục

- [Frontend Ứng dụng quản lý tiệm tóc 30Shine](#frontend-ứng-dụng-quản-lý-tiệm-tóc-30shine)
  - [Mục lục](#mục-lục)
  - [1. Yêu cầu hệ thống](#1-yêu-cầu-hệ-thống)
  - [2. Cài đặt](#2-cài-đặt)
  - [3. Cách chạy dự án](#3-cách-chạy-dự-án)
  - [4. Cấu trúc thư mục chính](#4-cấu-trúc-thư-mục-chính)
  - [5. Các công nghệ sử dụng](#5-các-công-nghệ-sử-dụng)

---

## 1. Yêu cầu hệ thống

-   Node.js (phiên bản LTS khuyến nghị)
-   npm hoặc yarn hoặc pnpm (Trình quản lý gói)

## 2. Cài đặt

1.  Clone repository về máy của bạn.
2.  Di chuyển vào thư mục frontend:
    ```bash
    cd frontend
    ```
3.  Cài đặt các dependencies:
    ```bash
    npm install
    # hoặc yarn install
    # hoặc pnpm install
    ```

## 3. Cách chạy dự án

1.  Đảm bảo bạn đang ở trong thư mục `frontend`.
2.  Chạy lệnh sau để khởi động server dev:
    ```bash
    npm run dev
    # hoặc yarn dev
    # hoặc pnpm dev
    ```
3.  Ứng dụng sẽ chạy trên trình duyệt tại địa chỉ `http://localhost:5173/` (hoặc cổng khác nếu 5173 đã được sử dụng).

## 4. Cấu trúc thư mục chính

-   `public/`: Chứa các file tĩnh (như index.html, favicon, ...).
-   `src/`: Mã nguồn chính của ứng dụng.
    -   `assets/`: Chứa hình ảnh, font, ...
    -   `components/`: Các component UI tái sử dụng.
    -   `lib/`: Chứa hooks, utils, context, logic dùng chung, ...
        -   `components/Notification/`: Logic và component liên quan đến thông báo.
        -   `hooks/`: Các custom React hooks.
        -   `utils/`: Các hàm tiện ích.
    -   `pages/`: Các trang chính của ứng dụng (Dashboard, Customers, Services, ...).
    -   `routes/`: Định nghĩa các tuyến đường (routing).
    -   `theme/`: Cấu hình theme cho Chakra UI.
    -   `App.jsx`: Component gốc của ứng dụng.
    -   `main.jsx`: Điểm khởi đầu của ứng dụng (render root).

## 5. Các công nghệ sử dụng

-   **React:** Thư viện JavaScript cho xây dựng giao diện người dùng.
-   **Vite:** Công cụ build frontend nhanh.
-   **Chakra UI:** Thư viện component UI đơn giản, module và dễ tùy chỉnh.
-   **React Router DOM:** Quản lý routing trong ứng dụng React.
-   **Axios:** Client HTTP để gọi API backend.
-   **Websocket:** Kết nối realtime cho thông báo.
-   **date-fns:** Thư viện xử lý ngày giờ.
-   **React Icons:** Thư viện icon.
-   **Recharts:** Thư viện biểu đồ.

---
