# 30shine-web-django-reactjs

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Tác giả:** Đinh Sỹ Quốc Doanh, Nguyễn Anh Tú, Nguyễn Hoàng, Lê Đức Kiên, Lê Nguyễn Ngọc Tú Hương.

Deployment platform Vercel: [30Shine website](https://30shine-web-django-reactjs.vercel.app)

## 1. Cấu trúc thư mục dự án

<pre>
30shine-web-django-reactjs/
├── <span style="color:#d73a49; font-weight:bold;">backend/</span>                          # <span style="color:gray;">💾 Backend Django</span>
│   ├── salon/                # Thư mục project chính (settings, urls, wsgi, asgi)
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   │
│   ├── taiKhoan/             # Đăng ký, đăng nhập, phân quyền
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── ...
│   │
│   ├── qlKhachHang/          # Quản lý khách hàng
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── ...
│   │
│   ├── qlNhanVien/           # Quản lý nhân viên
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── ...
│   │
│   ├── qlLichHen/            # Quản lý lịch hẹn, đặt lịch hẹn
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── ...
│   │
│   ├── qlThongBao/           # Quản lý thông báo
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── ...
│   │
│   ├── qlDanhGia/            # Quản lý đánh giá
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── ...
│   │
│   ├── qlSanPham/            # Quản lý sản phẩm (nếu có)
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── ...
│   │
│   ├── qlHoaDon/             # Quản lý hoá đơn, chi tiết hoá đơn
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── ...
│   │
│   ├── qlDichVu/             # Quản lý dịch vụ
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── ...
│   │
│   ├── manage.py
│   └── requirements.txt              # Thư viện Python
│
├── <span style="color:#22863a; font-weight:bold;">frontend/</span>                         # <span style="color:gray;">🖥️ Frontend React</span>
│   ├── public/                       # File tĩnh
│   │   └── assets/                   # 🖼️ Hình ảnh, font chữ chung 
│   │   
│   ├── src/
│   │   ├── images/                   # 📷 Hình ảnh, font chữ private
│   │   ├── lib/                      # 📦 Thành phần dùng chung
│   │   │   ├── <span style="color:#6f42c1; font-weight:bold;">components/</span>           # 🧩 **Component** tái sử dụng ⚠️
│   │   │   │   ├── Employees/        # Thư mục chứa component phục vụ trang Employees
│   │   │   │   └── <span style="color:#5805f0; font-weight:bold;">*Tên trang chính/</span>     <span style="color:#d73a49; font-weight:bold;"># ⚠️ CHÚ Ý/</span>
│   │   │   │ 
│   │   │   ├── service/           # Xử lý API
│   │   │   ├── router/               # Cấu hình routing
│   │   │   └── theme/                # Cấu hình giao diện
│   │   │   
│   │   ├── <span style="color:#005cc5; font-weight:bold;">pages/</span>                    # 📄 **Component trang**, trang chính của các trang quản lý ⚠️
│   │   │   ├── Employees.jsx 
│   │   │   └── <span style="color:#057aff; font-weight:bold;">*Tên trang quản lý chính.jsx</span>  <span style="color:#d73a49; font-weight:bold;"># ⚠️ CHÚ Ý</span>
│   │   │   
│   │   ├── App.jsx                   # Component gốc
│   │   ├── main.jsx                  # Điểm khởi đầu
│   │   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
</pre>

## 2. Cài đặt & Chạy Backend
### 2.1. Clone dự án
```bash
# Clone repository
https://github.com/<repository_url>
cd backend
```

### 2.2. Tạo môi trường ảo Python
```bash
# Windows
python -m venv venv
.\venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### 2.3. Cài đặt thư viện Python
```bash
pip install -r requirements.txt --no-cache-dir
```

### 2.4. Khởi tạo database & migrate
```bash
cd salon
python manage.py makemigrations
python manage.py migrate
```

### 2.5. Tạo tài khoản quản trị (superuser)
```bash
python manage.py createsuperuser
```

### 2.6. Chạy backend server
```bash
# Development
python manage.py runserver

# Bắt Websocket 
daphne salon.asgi:application
```
Backend server sẽ chạy tại: http://localhost:8000 (hoặc cổng bạn chỉ định)

### 2.7. Tham khảo API
- Xem chi tiết các endpoint và mẫu request tại file [`backend/README_API.md`](backend/README_API.md)

---

## 3. Cài đặt & Chạy Frontend
### 3.1. Cài đặt dependencies
```bash
cd frontend
npm install
```

### 3.2. Cấu hình môi trường
Tạo file `.env` trong thư mục `frontend`:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 3.3. Khởi động frontend server
```bash
# Development
npm run dev
```
Frontend server sẽ chạy tại: http://localhost:3000

## 4. Kiểm tra hệ thống
Truy cập http://localhost:3000
