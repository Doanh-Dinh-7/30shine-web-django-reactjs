# 30shine-web-django-reactjs

## 1. Cài đặt Backend
### 1.1. Clone dự án
```bash
git clone <repository_url>
cd backend
```

### 1.2. Tạo môi trường ảo Python
```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source .venv/bin/activate
```

### 1.3. Cài đặt thư viện Python
```bash
pip install -r requirements.txt --no-cache-dir
```

### 2.6. Khởi động backend server
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