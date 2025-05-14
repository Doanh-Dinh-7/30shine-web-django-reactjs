# API Endpoint Backend 30Shine

## 1. Tài khoản (Đăng ký, Đăng nhập)
- `POST /api/tai-khoan/dang-ky/`
  - Body:
    ```json
    {"username": "user1", "sdt": "0123456789", "password": "123456"}
    ```
  - Khi đăng ký thành công, hệ thống sẽ tạo user và KhachHang với HoTenKH = username, SDT = sdt. Các thông tin khác có thể cập nhật sau.
- `POST /api/tai-khoan/dang-nhap/`
  - Body:
    ```json
    {"username": "user1", "password": "123456"}
    ```

## 1.1 Đổi mật khẩu
- `POST /api/tai-khoan/doi-mat-khau/`
  - Body:
    ```json
    {"old_password": "123456", "new_password": "654321"}
    ```

## 1.2 Thông tin tài khoản (profile)
- `GET /api/tai-khoan/profile/` : Lấy thông tin tài khoản
- `PUT /api/tai-khoan/profile/` : Cập nhật thông tin tài khoản
  - Body ví dụ:
    ```json
    {"email": "user1@example.com", "first_name": "A", "last_name": "B"}
    ```

---
## 2. Khách hàng
- `GET /api/khach-hang/` : Lấy danh sách khách hàng
- `POST /api/khach-hang/` : Thêm khách hàng mới
  - Body:
    ```json
    {
      "user": {"username": "kh1", "password": "123456"},
      "HoTenKH": "Nguyễn Văn A",
      "SDT": "0123456789",
      "Email": "kh1@example.com",
      "DiaChi": "Hà Nội"
    }
    ```
- `GET /api/khach-hang/{MaKH}/` : Xem chi tiết khách hàng
- `PUT /api/khach-hang/{MaKH}/` : Sửa thông tin khách hàng (có thể cập nhật Email, sẽ đồng bộ sang cả User)
  - Body ví dụ:
    ```json
    {
      "HoTenKH": "Nguyễn Văn A",
      "SDT": "0123456789",
      "Email": "kh1@example.com",
      "DiaChi": "Hà Nội"
    }
    ```
- `DELETE /api/khach-hang/{MaKH}/` : Xóa khách hàng

---
## 3. Nhân viên
- `GET /api/nhan-vien/` : Lấy danh sách nhân viên
- `POST /api/nhan-vien/` : Thêm nhân viên mới
  - Body:
    ```json
    {
      "user": {"username": "nv1", "email": "nv1@example.com", "password": "123456"},
      "HoTenNV": "Trần Văn B",
      "SDT": "0987654321",
      "DiaChi": "Hà Nội",
      "GioiTinh": "Nam"
    }
    ```
- `GET /api/nhan-vien/{MaNV}/` : Xem chi tiết nhân viên
- `PUT /api/nhan-vien/{MaNV}/` : Sửa thông tin nhân viên
- `DELETE /api/nhan-vien/{MaNV}/` : Xóa nhân viên

---
## 4. Lịch làm việc nhân viên
- `GET /api/nhan-vien/lich-lam-viec/` : Lấy danh sách lịch làm việc
- `POST /api/nhan-vien/lich-lam-viec/` : Thêm lịch làm việc mới
  - Body:
    ```json
    {"MaNV": 1, "NgayLam": "2024-06-01", "CaLam": "Sáng"}
    ```
- `GET /api/nhan-vien/lich-lam-viec/{MaLLV}/` : Xem chi tiết lịch làm việc
- `PUT /api/nhan-vien/lich-lam-viec/{MaLLV}/` : Sửa lịch làm việc
- `DELETE /api/nhan-vien/lich-lam-viec/{MaLLV}/` : Xóa lịch làm việc

---
## 5. Dịch vụ
- `GET /api/dich-vu/` : Lấy danh sách dịch vụ
- `POST /api/dich-vu/` : Thêm dịch vụ mới
  - Body:
    ```json
    {"TenDV": "Cắt tóc", "MoTa": "Cắt tóc nam", "GiaTien": 100000, "ThoiGianLamDV": 30}
    ```
- `GET /api/dich-vu/{MaDV}/` : Xem chi tiết dịch vụ
- `PUT /api/dich-vu/{MaDV}/` : Sửa dịch vụ
- `DELETE /api/dich-vu/{MaDV}/` : Xóa dịch vụ

## 5.1 Danh sách dịch vụ kèm đánh giá
- `GET /api/dich-vu/dichvu_kem_danhgia/` : Lấy danh sách dịch vụ, mỗi dịch vụ có trường `danh_gia` là danh sách các đánh giá (bao gồm tên khách hàng)
  - Response mẫu:
    ```json
    [
      {
        "MaDV": 1,
        "TenDV": "Cắt tóc",
        "MoTa": "Cắt tóc nam",
        "GiaTien": 100000,
        "ThoiGianLamDV": 30,
        "AnhDaiDien": "...",
        "danh_gia": [
          {
            "MaDG": 1,
            "MaKH": 2,
            "ten_khach_hang": "Nguyễn Văn A",
            "NgayDanhGia": "2024-06-01",
            "NoiDung": "Rất hài lòng!",
            "DiemDanhGia": 5,
            "MaDV": 1,
            "MaHD": 3
          }
        ]
      }
    ]
    ```

---
## 6. Hóa đơn
- `GET /api/hoa-don/` : Lấy danh sách hóa đơn
- `POST /api/hoa-don/` : Thêm hóa đơn mới (kèm chi tiết hóa đơn)
  - Body:
    ```json
    {
      "MaKH": 1,
      "TongTien": 300000,
      "TrangThaiTT": "Đã thanh toán",
      "GhiChu": "Khách thanh toán tiền mặt",
      "chi_tiet": [
        {"MaDV": 2, "ThanhTien": 200000, "SoLuong": 1},
        {"MaDV": 3, "ThanhTien": 100000, "SoLuong": 1}
      ]
    }
    ```
- `GET /api/hoa-don/{id}/` : Xem chi tiết hóa đơn
- `PUT /api/hoa-don/{id}/` : Sửa hóa đơn (cập nhật lại toàn bộ chi tiết hóa đơn)
- `DELETE /api/hoa-don/{id}/` : Xóa hóa đơn

---
## 7. Lịch hẹn
- `GET /api/lich-hen/` : Lấy danh sách lịch hẹn
- `POST /api/lich-hen/` : Thêm lịch hẹn mới
  - Body:
    ```json
    {"MaKH": 1, "MaDV": 2, "NgayDatLich": "2024-06-01", "GioDatLich": "09:00:00", "TrangThai": "Chờ xác nhận"}
    ```
- `GET /api/lich-hen/{MaLH}/` : Xem chi tiết lịch hẹn
- `PUT /api/lich-hen/{MaLH}/` : Sửa lịch hẹn
- `DELETE /api/lich-hen/{MaLH}/` : Xóa lịch hẹn

---
## 8. Thông báo
- `GET /api/thong-bao/` : Lấy danh sách thông báo
- `POST /api/thong-bao/` : Thêm thông báo mới
  - Body:
    ```json
    {"MaNV": 1, "LoaiThongBao": "Khuyến mãi", "NoiDung": "Giảm giá 50% cho dịch vụ mới"}
    ```
- `GET /api/thong-bao/{MaTB}/` : Xem chi tiết thông báo
- `PUT /api/thong-bao/{MaTB}/` : Sửa thông báo
- `DELETE /api/thong-bao/{MaTB}/` : Xóa thông báo

---
## 9. Đánh giá
- `GET /api/danh-gia/` : Lấy danh sách đánh giá
- `POST /api/danh-gia/` : Thêm đánh giá mới
  - Body:
    ```json
    {"MaKH": 1, "NoiDung": "Rất hài lòng!", "DiemDanhGia": 5, "MaDV": 1, "MaHD": 3}
    ```
- `GET /api/danh-gia/{MaDG}/` : Xem chi tiết đánh giá
- `PUT /api/danh-gia/{MaDG}/` : Sửa đánh giá
- `DELETE /api/danh-gia/{MaDG}/` : Xóa đánh giá
  - Response mẫu:
    ```json
    {
      "MaDG": 1,
      "MaKH": 1,
      "ten_khach_hang": "Nguyễn Văn A",
      "NgayDanhGia": "2024-06-01",
      "NoiDung": "Rất hài lòng!",
      "DiemDanhGia": 5,
      "MaDV": 1,
      "MaHD": 3
    }
    ``` 