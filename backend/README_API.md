# Backend API cho ứng dụng quản lý tiệm tóc 30Shine

Đây là tài liệu hướng dẫn cài đặt, chạy và sử dụng các API của hệ thống backend.

## Mục lục

1.  [Yêu cầu hệ thống](#1-yêu-cầu-hệ-thống)
2.  [Cài đặt](#2-cài-đặt)
3.  [Thiết lập Cơ sở dữ liệu](#3-thiết-lập-cơ-sở-dữ-liệu)
4.  [Tạo dữ liệu mẫu](#4-tạo-dữ-liệu-mẫu)
5.  [Chạy Server (hỗ trợ WebSocket realtime)](#5-chạy-server-hỗ-trợ-websocket-realtime)
6.  [WebSocket Thông báo realtime](#6-websocket-thông-báo-realtime)
7.  [Danh sách API Endpoints](#7-danh-sách-api-endpoints)

---

## 1. Yêu cầu hệ thống

- Python 3.x
- pip (Trình quản lý gói của Python)

## 2. Cài đặt

1.  Clone repository về máy của bạn.
2.  Di chuyển vào thư mục backend:
    ```bash
    cd backend/salon
    ```
3.  (Khuyến nghị) Tạo và kích hoạt môi trường ảo:

    ```bash
    # Tạo môi trường ảo (chỉ cần làm lần đầu)
    python -m venv venv

    # Kích hoạt môi trường ảo
    # Trên Windows
    .\venv\Scripts\activate
    # Trên macOS/Linux
    source venv/bin/activate
    ```

4.  Cài đặt các dependencies cần thiết:
    ```bash
    pip install -r requirements.txt
    ```
5.  Cài đặt Daphne (nếu chưa có), cần cho WebSocket:
    ```bash
    pip install daphne
    ```

## 3. Thiết lập Cơ sở dữ liệu

1.  Đảm bảo bạn đang ở trong thư mục `backend/salon` và môi trường ảo đã được kích hoạt.
2.  Tạo các migration scripts:
    ```bash
    python manage.py makemigrations
    ```
3.  Áp dụng các migration để tạo bảng trong cơ sở dữ liệu:
    ```bash
    python manage.py migrate
    ```
4.  (Tùy chọn) Tạo Superuser để truy cập trang admin:
    ```bash
    python manage.py createsuperuser
    ```
    Làm theo hướng dẫn trên màn hình.

## 4. Tạo dữ liệu mẫu

Để điền dữ liệu giả vào database cho mục đích phát triển và thử nghiệm, bạn có thể sử dụng script tạo dữ liệu mẫu.

1.  (Nếu cần) Xóa cơ sở dữ liệu hiện tại (lưu ý: thao tác này sẽ xóa TOÀN BỘ dữ liệu):
    ```bash
    # Đảm bảo bạn đang ở trong thư mục backend/salon
    # Trên Windows
    del db.sqlite3
    # Trên macOS/Linux
    rm db.sqlite3
    ```
2.  Thực hiện lại bước 3. Thiết lập Cơ sở dữ liệu để tạo database rỗng mới.
3.  Chạy script tạo dữ liệu mẫu:
    ```bash
    python create_sample_data.py
    ```

Sau khi chạy xong, database sẽ có dữ liệu mẫu cho các model như Khách hàng, Nhân viên, Dịch vụ, Lịch hẹn, Hóa đơn, Đánh giá, Thông báo.

## 5. Chạy Server (hỗ trợ WebSocket realtime)

Để chạy server với WebSocket realtime, bạn cần sử dụng Daphne:

1.  Đảm bảo bạn đang ở trong thư mục `backend/salon` và môi trường ảo đã được kích hoạt.
2.  Chạy server bằng Daphne (mặc định cổng 8000):
    ```bash
    daphne salon.asgi:application
    ```
    Hoặc chỉ định cổng khác (ví dụ 8001):
    ```bash
    daphne -p 8001 salon.asgi:application
    ```

> **Lưu ý quan trọng:** KHÔNG dùng `python manage.py runserver` nếu bạn muốn sử dụng và kiểm thử chức năng WebSocket realtime, vì `runserver` mặc định không hỗ trợ ASGI.

Server sẽ chạy tại địa chỉ `http://localhost:8000/` (hoặc cổng bạn đã chỉ định).

## 6. WebSocket Thông báo realtime

Backend hỗ trợ gửi thông báo realtime tới các client kết nối WebSocket.

- **Endpoint:**
  - `ws://localhost:8000/ws/thongbao/` (Thay 8000 bằng cổng bạn đang chạy server)
- **Cách sử dụng:**
  - Client (frontend hoặc công cụ test như Postman/WebSocket client) kết nối tới endpoint trên.
  - Khi có các sự kiện như đặt lịch hẹn mới, huỷ lịch hẹn, hoặc đánh giá mới, server sẽ gửi thông báo qua kết nối WebSocket tới tất cả các client đang kết nối.
  - Định dạng thông báo nhận được:
    ```json
    {
      "message": "Nội dung thông báo tiếng Việt có dấu và emoji ⭐"
    }
    ```
  - Thông báo được mã hóa UTF-8.

## 7. Danh sách API Endpoints

Dưới đây là danh sách các API endpoint chính mà backend cung cấp. Các API tuân thủ chuẩn RESTful.

**Lưu ý:** Hầu hết các API yêu cầu xác thực. Vui lòng đảm bảo bạn đã đăng nhập và gửi kèm token xác thực trong header (ví dụ: `Authorization: Bearer <your_token>`) trừ các endpoint đăng ký/đăng nhập.

### 7.1. Tài khoản (`/api/tai-khoan/`)

- `POST /api/tai-khoan/dang-ky/`: Đăng ký tài khoản mới.
  - Body: `{"username": "user1", "sdt": "0123456789", "password": "123456"}`
  - Tạo user và KhachHang với thông tin ban đầu.
- `POST /api/tai-khoan/dang-nhap/`: Đăng nhập và nhận token.
  - Body: `{"username": "user1", "password": "123456"}`
- `POST /api/tai-khoan/doi-mat-khau/`: Đổi mật khẩu tài khoản hiện tại.
  - Body: `{"old_password": "123456", "new_password": "654321"}`
- `GET /api/tai-khoan/profile/`: Lấy thông tin profile của tài khoản hiện tại.
- `PUT /api/tai-khoan/profile/`: Cập nhật thông tin profile.
  - Body ví dụ: `{"email": "user1@example.com", "first_name": "A", "last_name": "B"}`

### 7.2. Dashboard (`/api/tai-khoan/`)

- `GET /api/tai-khoan/dashboard-revenue/`: Thống kê doanh thu.
- `GET /api/tai-khoan/dashboard-top-services/`: Top dịch vụ.
- `GET /api/tai-khoan/dashboard-appointments/`: Thống kê lịch hẹn.
- `GET /api/tai-khoan/dashboard-revenue-by-month/`: Doanh thu theo tháng.

### 7.3. Khách hàng (`/api/khach-hang/`)

- `GET /api/khach-hang/`: Lấy danh sách khách hàng.
- `POST /api/khach-hang/`: Thêm khách hàng mới.
  - Body: `{"user": {"username": "kh1", "password": "123456"}, "HoTenKH": "Nguyễn Văn A", "SDT": "0123456789", "Email": "kh1@example.com", "DiaChi": "Hà Nội"}`
- `GET /api/khach-hang/{MaKH}/`: Xem chi tiết khách hàng theo ID.
- `PUT /api/khach-hang/{MaKH}/`: Sửa thông tin khách hàng theo ID.
  - Body ví dụ: `{"HoTenKH": "Nguyễn Văn A", "SDT": "0123456789", "Email": "kh1@example.com", "DiaChi": "Hà Nội"}`
- `DELETE /api/khach-hang/{MaKH}/`: Xóa khách hàng theo ID.

### 7.4. Nhân viên (`/api/nhan-vien/`)

- `GET /api/nhan-vien/`: Lấy danh sách nhân viên.
- `POST /api/nhan-vien/`: Thêm nhân viên mới.
  - Body: `{"user": {"username": "nv1", "email": "nv1@example.com", "password": "123456"}, "HoTenNV": "Trần Văn B", "SDT": "0987654321", "DiaChi": "Hà Nội", "GioiTinh": "Nam"}`
- `GET /api/nhan-vien/{MaNV}/`: Xem chi tiết nhân viên theo ID.
- `PUT /api/nhan-vien/{MaNV}/`: Sửa thông tin nhân viên theo ID.
- `DELETE /api/nhan-vien/{MaNV}/`: Xóa nhân viên theo ID.

### 7.5. Lịch làm việc Nhân viên (`/api/nhan-vien/lich-lam-viec/`)

- `GET /api/nhan-vien/lich-lam-viec/`: Lấy danh sách lịch làm việc.
- `POST /api/nhan-vien/lich-lam-viec/`: Thêm lịch làm việc mới.
  - Body: `{"MaNV": 1, "NgayLam": "2024-06-01", "GioBatDau": "8:00", "GioKetThuc": "12:00"}`
- `GET /api/nhan-vien/lich-lam-viec/{MaLLV}/`: Xem chi tiết lịch làm việc theo ID.
- `PUT /api/nhan-vien/lich-lam-viec/{MaLLV}/`: Sửa lịch làm việc theo ID.
- `DELETE /api/nhan-vien/lich-lam-viec/{MaLLV}/`: Xóa lịch làm việc theo ID.

### 7.6. Dịch vụ (`/api/dich-vu/`)

- `GET /api/dich-vu/`: Lấy danh sách dịch vụ.
- `POST /api/dich-vu/`: Thêm dịch vụ mới.
  - Body: `{"TenDV": "Cắt tóc", "MoTa": "Cắt tóc nam", "GiaTien": 100000, "ThoiGianLamDV": 30}`
- `GET /api/dich-vu/{MaDV}/`: Xem chi tiết dịch vụ theo ID.
- `PUT /api/dich-vu/{MaDV}/`: Sửa thông tin dịch vụ theo ID.
- `DELETE /api/dich-vu/{MaDV}/`: Xóa dịch vụ theo ID.
- `GET /api/dich-vu/dichvu_kem_danhgia/`: Lấy danh sách dịch vụ kèm danh sách đánh giá liên quan.

### 7.7. Hóa đơn (`/api/hoa-don/`)

- `GET /api/hoa-don/`: Lấy danh sách hóa đơn.
- `POST /api/hoa-don/`: Thêm hóa đơn mới (kèm chi tiết hóa đơn).
  - Body: `{"MaKH": 1, "TongTien": 300000, "TrangThaiTT": "Đã thanh toán", "GhiChu": "Khách thanh toán tiền mặt", "chi_tiet": [{"MaDV": 2, "ThanhTien": 200000, "SoLuong": 1}, {"MaDV": 3, "ThanhTien": 100000, "SoLuong": 1}]}`
- `GET /api/hoa-don/{id}/`: Xem chi tiết hóa đơn theo ID.
- `PUT /api/hoa-don/{id}/`: Sửa hóa đơn theo ID.
- `DELETE /api/hoa-don/{id}/`: Xóa hóa đơn theo ID.

### 7.8. Lịch hẹn (`/api/lich-hen/`)

- `GET /api/lich-hen/`: Lấy danh sách lịch hẹn.
- `POST /api/lich-hen/`: Thêm lịch hẹn mới.
  - Body: `{"MaKH": 1, "MaDV": 2, "NgayDatLich": "2024-06-01", "GioDatLich": "09:00:00", "TrangThai": "Chờ xác nhận"}`
- `GET /api/lich-hen/{MaLH}/`: Xem chi tiết lịch hẹn theo ID.
- `PUT /api/lich-hen/{MaLH}/`: Sửa lịch hẹn theo ID.
- `DELETE /api/lich-hen/{MaLH}/`: Xóa lịch hẹn theo ID.

### 7.9. Thông báo (`/api/thong-bao/`)

- `GET /api/thong-bao/`: Lấy danh sách thông báo.
- `POST /api/thong-bao/`: Thêm thông báo mới.
  - Body: `{"MaNV": 1, "LoaiThongBao": "Khuyến mãi", "NoiDung": "Giảm giá 50% cho dịch vụ mới"}`
- `GET /api/thong-bao/{MaTB}/`: Xem chi tiết thông báo theo ID.
- `PUT /api/thong-bao/{MaTB}/`: Sửa thông báo theo ID. (Có thể dùng để cập nhật `LoaiThongBao` khi đọc)
- `DELETE /api/thong-bao/{MaTB}/`: Xóa thông báo theo ID.

### 7.10. Đánh giá (`/api/danh-gia/`)

- `GET /api/danh-gia/`: Lấy danh sách đánh giá.
- `POST /api/danh-gia/`: Thêm đánh giá mới.
  - Body: `{"MaKH": 1, "NoiDung": "Rất hài lòng!", "DiemDanhGia": 5, "MaDV": 1, "MaHD": 3}`
- `GET /api/danh-gia/{MaDG}/`: Xem chi tiết đánh giá theo ID.
- `PUT /api/danh-gia/{MaDG}/`: Sửa đánh giá theo ID.
- `DELETE /api/danh-gia/{MaDG}/`: Xóa đánh giá theo ID.

---
