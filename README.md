# 30shine-web-django-reactjs

**Tác giả:** Đinh Sỹ Quốc Doanh, Nguyễn Anh Tú, Nguyễn Hoàng, Lê Đức Kiên, Lê Nguyễn Ngọc Tú Hương.

## 1. Cấu trúc thư mục dự án

<pre>
30shine-web-django-reactjs/
├── <span style="color:#d73a49; font-weight:bold;">backend/</span>                          # <span style="color:gray;">💾 Backend Django</span>
│   ├── schedule_haircut/             # Dự án chính
│   │   ├── __init__.py
│   │   ├── settings.py               # Cấu hình dự án
│   │   ├── urls.py                   # Đường dẫn chính
│   │   └── wsgi.py
│   │
│   ├── qlkhachhang/                  # App quản lý khách hàng
│   │   ├── __init__.py
│   │   ├── admin.py                  # Cấu hình admin
│   │   ├── apps.py
│   │   ├── models.py                 # Model dữ liệu
│   │   ├── serializers.py            # Chuyển đổi dữ liệu
│   │   ├── urls.py                   # API endpoints
│   │   └── views.py                  # Xử lý logic
│   │
│   ├── qlnhanvien/                   # App quản lý nhân viên
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── ....                          # các App quản lý khác
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
│   │   │   ├── controller/           # Xử lý API
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


## 2. Cài đặt Backend
### 2.1. Clone dự án
```bash
git clone <repository_url>
cd backend
```

### 2.2. Tạo môi trường ảo Python
```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source .venv/bin/activate
```

### 2.3. Cài đặt thư viện Python
```bash
pip install -r requirements.txt --no-cache-dir
```

### 2.4. Khởi động backend server
```bash
# Development
python manage.py runserver
```
Backend server sẽ chạy tại: http://localhost:5000

## 3. Cài đặt Frontend
### 3.1. Cài đặt dependencies
```bash
cd frontend
npm install
```

### 3.2. Cấu hình môi trường
Tạo file `.env` trong thư mục `frontend`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3.3. Khởi động frontend server
```bash
# Development
npm run dev
```
Frontend server sẽ chạy tại: http://localhost:3000

## 4. Kiểm tra hệ thống
Truy cập http://localhost:3000
