import os
import django
from datetime import datetime, timedelta, date, time
from decimal import Decimal
from random import randint, sample
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'salon.settings')
django.setup()

from django.contrib.auth.models import User
from qlKhachHang.models import KhachHang
from qlNhanVien.models import NhanVien, LichLamViec
from qlDichVu.models import DichVu
from qlHoaDon.models import HoaDon, ChiTietHoaDon
from qlLichHen.models import LichHen
from qlDanhGia.models import DanhGia

def clear_existing_data():
    """Xóa dữ liệu cũ để tránh trùng lặp"""
    print("Clearing existing data...")
    DanhGia.objects.all().delete()
    ChiTietHoaDon.objects.all().delete()
    HoaDon.objects.all().delete()
    LichHen.objects.all().delete()
    LichLamViec.objects.all().delete()
    DichVu.objects.all().delete()
    NhanVien.objects.all().delete()
    KhachHang.objects.all().delete()
    User.objects.exclude(is_superuser=True).delete()
    print("Existing data cleared.")

def create_users():
    """Tạo tài khoản người dùng"""
    users_data = [
        # Từ file tu_import_data.py
        {'username': 'nguyenanhduc', 'password': '123456789', 'email': 'duc@gmail.com'},
        {'username': 'tranbuiquocan', 'password': '123456789', 'email': 'an@gmail.com'},
        {'username': 'admin', 'password': '123456789', 'email': 'tung@gmail.com'},
        {'username': 'ngovanhai', 'password': '123456789', 'email': 'hai@gmail.com'},
        
        # Từ file hoang_import_data.py
        {'username': 'truongthaibao', 'password': '123456789', 'email': 'bao@gmail.com'},
        {'username': 'hovantruong', 'password': '123456789', 'email': 'truong@gmail.com'},
        {'username': 'nguyentruonggiang', 'password': '123456789', 'email': 'giang@gmail.com'},
        {'username': 'leducnhan', 'password': '123456789', 'email': 'nhan@gmail.com'},
        
        # Từ file huong_import_data.py
        {'username': 'phamminhhoang', 'password': '123456789', 'email': 'hoang@gmail.com'},
        {'username': 'nguyenvananh', 'password': '123456789', 'email': 'anh@gmail.com'},
        {'username': 'tranthithuy', 'password': '123456789', 'email': 'thuy@gmail.com'},
        {'username': 'levanhung', 'password': '123456789', 'email': 'hung@gmail.com'},
        
        # Từ file kien_import_data.py
        {'username': 'nguyentruonggiang', 'password': '123456789', 'email': 'giang@gmail.com'},
        {'username': 'hoangvananh', 'password': '123456789', 'email': 'nhan@gmail.com'},
        {'username': 'nguyenhoangsang', 'password': '123456789', 'email': 'sang@gmail.com'},
        {'username': 'ngovancuong', 'password': '123456789', 'email': 'cuong@gmail.com'},
    ]
    
    # Loại bỏ trùng lặp
    unique_users = {user['username']: user for user in users_data}.values()
    
    created_users = []
    for user_data in unique_users:
        user, created = User.objects.get_or_create(
            username=user_data['username'],
            defaults={
                'email': user_data['email'],
            }
        )
        if created:
            user.set_password(user_data['password'])
            user.save()
            print(f"Created user {user_data['username']}")
        else:
            print(f"User {user_data['username']} already exists")
        created_users.append(user)
    
    return created_users

def create_khach_hang(users):
    """Tạo khách hàng"""
    khach_hang_data = [
        # Từ file tu_import_data.py
        {
            'user': next(u for u in users if u.username == 'nguyenanhduc'),
            'HoTenKH': 'Nguyễn Anh Đức',
            'SDT': '0914555787',
            'Email': 'ducg@gmail.com',
            'DiaChi': '22 Cao Bá Đạt - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
            'AnhDaiDien': 'https://res.cloudinary.com/de3vts9dv/image/upload/v1748229683/ekwowlx8ouxttuyf4yji.jpg'
        },
        {
            'user': next(u for u in users if u.username == 'tranbuiquocan'),
            'HoTenKH': 'Trần Bùi Quốc An',
            'SDT': '0914345778',
            'Email': 'an@gmail.com',
            'DiaChi': '16 Lương Văn Can - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
            'AnhDaiDien': 'https://res.cloudinary.com/de3vts9dv/image/upload/v1748229875/xv25z1dbgornnprvmry7.jpg'
        },
        
        # Từ file hoang_import_data.py
        {
            'user': next(u for u in users if u.username == 'nguyentruonggiang'),
            'HoTenKH': 'Nguyễn Trường Giang',
            'SDT': '0914309797',
            'Email': 'giang@gmail.com',
            'DiaChi': '04 Mỹ An 7 - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
            'AnhDaiDien': 'https://res.cloudinary.com/de3vts9dv/image/upload/v1748193677/xv4wywqna7ji686plj8p.jpg'
        },
        {
            'user': next(u for u in users if u.username == 'leducnhan'),
            'HoTenKH': 'Lê Đức Nhân',
            'SDT': '0914303897',
            'Email': 'nhan@gmail.com',
            'DiaChi': '14 Mỹ An 3 - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
            'AnhDaiDien': 'https://res.cloudinary.com/de3vts9dv/image/upload/v1748193646/k1ymuierlisa4dzk3pg8.jpg'
        },
        
        # Từ file huong_import_data.py
        {
            'user': next(u for u in users if u.username == 'phamminhhoang'),
            'HoTenKH': 'Phạm Minh Hoàng',
            'SDT': '0987654321',
            'Email': 'hoang@gmail.com',
            'DiaChi': '123 Nguyễn Văn Linh - Hải Châu - Đà Nẵng',
            'AnhDaiDien': 'https://res.cloudinary.com/due447rz2/image/upload/v1748267513/phamminhhoang_awlkwu.jpg'
        },
        {
            'user': next(u for u in users if u.username == 'nguyenvananh'),
            'HoTenKH': 'Nguyễn Văn Anh',
            'SDT': '0987654322',
            'Email': 'anh@gmail.com',
            'DiaChi': '456 Lê Duẩn - Thanh Khê - Đà Nẵng',
            'AnhDaiDien': 'https://res.cloudinary.com/due447rz2/image/upload/v1748267588/vananh_poao46.jpg'
        },
        
        # Từ file kien_import_data.py
        {
            'user': next(u for u in users if u.username == 'nguyentruonggiang'),
            'HoTenKH': 'Hoàng Văn Anh',
            'SDT': '0914555797',
            'Email': 'anhg@gmail.com',
            'DiaChi': '04 An Thượng - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
            'AnhDaiDien': 'https://res.cloudinary.com/dikvlwfc5/image/upload/v1748256048/ac3snnvtnqglzitpo3ru.jpg'
        },
        {
            'user': next(u for u in users if u.username == 'hoangvananh'),
            'HoTenKH': 'Hoàng Văn Anh',
            'SDT': '0914303897',
            'Email': 'nhan@gmail.com',
            'DiaChi': '14 An Thượng 3 - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
            'AnhDaiDien': 'https://res.cloudinary.com/dikvlwfc5/image/upload/v1748256254/nsw8ptkllvtkp08wzibm.jpg'
        }
    ]
    
    # Loại bỏ trùng lặp dựa trên username
    unique_khach_hang = {}
    for kh in khach_hang_data:
        key = kh['user'].username
        if key not in unique_khach_hang:
            unique_khach_hang[key] = kh
    
    created_khach_hang = []
    for kh_data in unique_khach_hang.values():
        kh, created = KhachHang.objects.get_or_create(
            user=kh_data['user'],
            defaults={
                'HoTenKH': kh_data['HoTenKH'],
                'SDT': kh_data['SDT'],
                'Email': kh_data['Email'],
                'DiaChi': kh_data['DiaChi'],
                'AnhDaiDien': kh_data['AnhDaiDien']
            }
        )
        if created:
            print(f"Created KhachHang for user {kh_data['user'].username}")
        else:
            print(f"KhachHang for user {kh_data['user'].username} already exists")
        created_khach_hang.append(kh)
    
    return created_khach_hang

def create_nhan_vien(users):
    """Tạo nhân viên"""
    nhan_vien_data = [
        # Từ file tu_import_data.py
        {
            'user': next(u for u in users if u.username == 'admin'),
            'HoTenNV': 'Nguyễn Thanh Tùng',
            'SDT': '0387631548',
            'DiaChi': '03 Nguyễn Trương Văn - Hòa Cường Nam - Hải Châu - Đà Nẵng',
            'GioiTinh': 'Nam'
        },
        {
            'user': next(u for u in users if u.username == 'ngovanhai'),
            'HoTenNV': 'Ngô Văn Hải',
            'SDT': '091851555',
            'DiaChi': '15 Nam Kỳ Khởi Nghĩa - Hải Châu - Đà Nẵng',
            'GioiTinh': 'Nam'
        },
        
        # Từ file hoang_import_data.py
        {
            'user': next(u for u in users if u.username == 'truongthaibao'),
            'HoTenNV': 'Trương Thái Bảo',
            'SDT': '0914306897',
            'DiaChi': '03 Nguyễn Văn Linh - Hòa Cường Nam - Hải Châu - Đà Nẵng',
            'GioiTinh': 'Nam'
        },
        {
            'user': next(u for u in users if u.username == 'hovantruong'),
            'HoTenNV': 'Hồ Văn Trường',
            'SDT': '0914306557',
            'DiaChi': '33 Mỹ An 1 - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
            'GioiTinh': 'Nam'
        },
        
        # Từ file huong_import_data.py
        {
            'user': next(u for u in users if u.username == 'tranthithuy'),
            'HoTenNV': 'Trần Thị Thủy',
            'SDT': '0987654323',
            'DiaChi': '789 Ngô Quyền - Sơn Trà - Đà Nẵng',
            'GioiTinh': 'Nữ'
        },
        {
            'user': next(u for u in users if u.username == 'levanhung'),
            'HoTenNV': 'Lê Văn Hùng',
            'SDT': '0987654324',
            'DiaChi': '321 Trần Phú - Hải Châu - Đà Nẵng',
            'GioiTinh': 'Nam'
        },
        
        # Từ file kien_import_data.py
        {
            'user': next(u for u in users if u.username == 'nguyenhoangsang'),
            'HoTenNV': 'Nguyễn Hoàng Sang',
            'SDT': '091431237',
            'DiaChi': '03 Nguyễn Hoàng - Hòa Cường Nam - Hải Châu - Đà Nẵng',
            'GioiTinh': 'Nam'
        },
        {
            'user': next(u for u in users if u.username == 'ngovancuong'),
            'HoTenNV': 'Ngô Văn Cường',
            'SDT': '091851557',
            'DiaChi': '33 Mỹ An 5 - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
            'GioiTinh': 'Nam'
        }
    ]
    
    # Loại bỏ trùng lặp dựa trên username
    unique_nhan_vien = {}
    for nv in nhan_vien_data:
        key = nv['user'].username
        if key not in unique_nhan_vien:
            unique_nhan_vien[key] = nv
    
    created_nhan_vien = []
    for nv_data in unique_nhan_vien.values():
        nv, created = NhanVien.objects.get_or_create(
            user=nv_data['user'],
            defaults={
                'HoTenNV': nv_data['HoTenNV'],
                'SDT': nv_data['SDT'],
                'DiaChi': nv_data['DiaChi'],
                'GioiTinh': nv_data['GioiTinh']
            }
        )
        if created:
            print(f"Created NhanVien for user {nv_data['user'].username}")
        else:
            print(f"NhanVien for user {nv_data['user'].username} already exists")
        created_nhan_vien.append(nv)
    
    return created_nhan_vien

def create_dich_vu():
    """Tạo dịch vụ"""
    dich_vu_data = [
        # Từ file tu_import_data.py
        {
            'TenDV': 'Cắt tóc cơ bản',
            'MoTa': 'Cắt tóc cơ bản cho nam và nữ',
            'GiaTien': Decimal('300000.00'),
            'ThoiGianLamDV': 30,
            'AnhDaiDien': 'https://res.cloudinary.com/de3vts9dv/image/upload/v1748229926/aipjkunvaqdmqncrwvb8.jpg'
        },
        {
            'TenDV': 'Massage vai gáy',
            'MoTa': 'Massage vai gáy cho nam và nữ',
            'GiaTien': Decimal('150000.00'),
            'ThoiGianLamDV': 45,
            'AnhDaiDien': 'https://res.cloudinary.com/de3vts9dv/image/upload/v1748229775/joy2reofeuaiyqjqdmbc.jpg'
        },
        
        # Từ file hoang_import_data.py
        {
            'TenDV': 'Nhuộm tóc (Tẩy)',
            'MoTa': 'Tẩy tóc và nhuộm những màu tóc tẩy hot trend 2025',
            'GiaTien': Decimal('500000'),
            'ThoiGianLamDV': 120,
            'AnhDaiDien': 'https://res.cloudinary.com/de3vts9dv/image/upload/v1748192502/mi2twthc5sdqboc50msr.jpg'
        },
        {
            'TenDV': 'Gội đầu dưỡng sinh',
            'MoTa': 'Bao gồm gội đầu bằng dầu gội chuyên dụng, đắp mặt nạ, hút mụn',
            'GiaTien': Decimal('150000'),
            'ThoiGianLamDV': 30,
            'AnhDaiDien': 'https://res.cloudinary.com/de3vts9dv/image/upload/v1748194666/ydefmyvjcz2cxadle2ah.jpg'
        },
        
        # Từ file huong_import_data.py
        {
            'TenDV': 'Cắt tóc nam cao cấp',
            'MoTa': 'Cắt tóc nam với kỹ thuật hiện đại, tạo kiểu theo xu hướng mới nhất',
            'GiaTien': Decimal('200000.00'),
            'ThoiGianLamDV': 45,
            'AnhDaiDien': 'https://res.cloudinary.com/due447rz2/image/upload/v1748267199/cat_toc_nam_arm11c.jpg'
        },
        {
            'TenDV': 'Uốn tóc nam',
            'MoTa': 'Uốn tóc với công nghệ mới, giữ nếp lâu, không hại tóc',
            'GiaTien': Decimal('800000.00'),
            'ThoiGianLamDV': 180,
            'AnhDaiDien': 'https://res.cloudinary.com/due447rz2/image/upload/v1748267295/uon_toc_nam_c0fvyu.jpg'
        },
        
        # Từ file kien_import_data.py
        {
            'TenDV': 'Ép Side',
            'MoTa': 'Ép Side tóc cho nam, tạo kiểu gọn gàng',
            'GiaTien': Decimal('300000.00'),
            'ThoiGianLamDV': 30,
            'AnhDaiDien': 'https://res.cloudinary.com/dikvlwfc5/image/upload/v1748265703/zrxhgngxru9iimtpzkc2.jpg'
        },
        {
            'TenDV': 'Baby Light',
            'MoTa': 'Nhuộm tóc highlight tạo hiệu ứng tự nhiên',
            'GiaTien': Decimal('150000.00'),
            'ThoiGianLamDV': 45,
            'AnhDaiDien': 'https://res.cloudinary.com/dikvlwfc5/image/upload/v1748265878/ctdfdvmzmwbvwtjobevz.jpg'
        }
    ]
    
    created_dich_vu = []
    for dv_data in dich_vu_data:
        dv, created = DichVu.objects.get_or_create(
            TenDV=dv_data['TenDV'],
            defaults={
                'MoTa': dv_data['MoTa'],
                'GiaTien': dv_data['GiaTien'],
                'ThoiGianLamDV': dv_data['ThoiGianLamDV'],
                'AnhDaiDien': dv_data['AnhDaiDien']
            }
        )
        if created:
            print(f"Created DichVu: {dv_data['TenDV']}")
        else:
            print(f"DichVu {dv_data['TenDV']} already exists")
        created_dich_vu.append(dv)
    
    return created_dich_vu

def create_lich_lam_viec(nhan_vien):
    """Tạo lịch làm việc"""
    # Kết hợp dữ liệu từ tất cả các file
    lich_lam_viec_data = []
    
    # Từ file tu_import_data.py
    lich_lam_viec_data.extend([
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Nguyễn Thanh Tùng'), '2025-06-02', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Nguyễn Thanh Tùng'), '2025-06-03', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Nguyễn Thanh Tùng'), '2025-06-04', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Nguyễn Thanh Tùng'), '2025-06-05', '08:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Nguyễn Thanh Tùng'), '2025-06-06', '12:00', '20:30'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Nguyễn Thanh Tùng'), '2025-06-09', '13:00', '19:30'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Nguyễn Thanh Tùng'), '2025-06-10', '08:00', '19:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Nguyễn Thanh Tùng'), '2025-06-11', '08:00', '21:30'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Nguyễn Thanh Tùng'), '2025-06-12', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Nguyễn Thanh Tùng'), '2025-06-13', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Nguyễn Thanh Tùng'), '2025-06-16', '08:00', '20:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Nguyễn Thanh Tùng'), '2025-06-17', '08:00', '21:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Nguyễn Thanh Tùng'), '2025-06-18', '08:00', '20:30'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Ngô Văn Hải'), '2025-06-02', '08:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Ngô Văn Hải'), '2025-06-03', '08:00', '18:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Ngô Văn Hải'), '2025-06-05', '08:00', '21:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Ngô Văn Hải'), '2025-06-06', '17:00', '20:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Ngô Văn Hải'), '2025-06-09', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Ngô Văn Hải'), '2025-06-10', '08:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Ngô Văn Hải'), '2025-06-11', '12:00', '21:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Ngô Văn Hải'), '2025-06-12', '08:00', '20:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Ngô Văn Hải'), '2025-06-13', '08:00', '21:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Ngô Văn Hải'), '2025-06-16', '17:00', '21:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Ngô Văn Hải'), '2025-06-17', '08:00', '20:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Ngô Văn Hải'), '2025-06-18', '08:00', '19:30'),
    ])
    
    # Từ file hoang_import_data.py
    lich_lam_viec_data.extend([
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-02', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-03', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-04', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-05', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-06', '08:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-07', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-08', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-09', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-10', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-11', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-12', '08:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-13', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-14', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-15', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-16', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-17', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-18', '08:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-19', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-20', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-21', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trương Thái Bảo'), '2025-06-22', '08:00', '12:00'),
        
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-02', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-03', '08:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-04', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-05', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-06', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-07', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-08', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-09', '08:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-10', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-11', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-12', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-13', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-14', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-15', '08:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-16', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-17', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-18', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-19', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-20', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-21', '08:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Hồ Văn Trường'), '2025-06-22', '12:00', '17:00'),
    ])
    
    # Từ file huong_import_data.py
    lich_lam_viec_data.extend([
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-02', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-03', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-04', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-05', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-06', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-07', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-08', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-09', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-10', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-11', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-12', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-13', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-14', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-15', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-16', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-17', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-18', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-19', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-20', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-21', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Trần Thị Thủy'), '2025-06-22', '08:00', '12:00'),
        # NV2
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-02', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-03', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-04', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-05', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-06', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-07', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-08', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-09', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-10', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-11', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-12', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-13', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-14', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-15', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-16', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-17', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-18', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-19', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-20', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-21', '12:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Lê Văn Hùng'), '2025-06-22', '17:00', '22:00'),
    ])
    
    # Từ file kien_import_data.py
    lich_lam_viec_data.extend([
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Nguyễn Hoàng Sang'), '2025-06-02', '08:00', '18:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Nguyễn Hoàng Sang'), '2025-06-03', '08:00', '19:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Nguyễn Hoàng Sang'), '2025-06-04', '08:00', '20:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Nguyễn Hoàng Sang'), '2025-06-05', '08:00', '20:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Nguyễn Hoàng Sang'), '2025-06-06', '08:00', '20:30'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Ngô Văn Cường'), '2025-06-02', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Ngô Văn Cường'), '2025-06-03', '08:00', '17:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Ngô Văn Cường'), '2025-06-04', '17:00', '22:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Ngô Văn Cường'), '2025-06-05', '08:00', '12:00'),
        (next(nv for nv in nhan_vien if nv.HoTenNV == 'Ngô Văn Cường'), '2025-06-06', '12:00', '17:00'),
    ])

    created_lich_lam_viec = []
    for nv, ngay_str, gio_bd_str, gio_kt_str in lich_lam_viec_data:
        try:
            ngay = datetime.strptime(ngay_str, '%Y-%m-%d').date()
            gio_bat_dau = datetime.strptime(gio_bd_str, '%H:%M').time()
            gio_ket_thuc = datetime.strptime(gio_kt_str, '%H:%M').time()

            llv_obj, created = LichLamViec.objects.get_or_create(
                MaNV=nv,
                NgayLam=ngay,
                GioBatDau=gio_bat_dau,
                GioKetThuc=gio_ket_thuc
            )
            if created:
                print(f"Created LichLamViec for {nv.HoTenNV} on {ngay} from {gio_bat_dau} to {gio_ket_thuc}")
            else:
                print(f"LichLamViec for {nv.HoTenNV} on {ngay} from {gio_bat_dau} to {gio_ket_thuc} already exists")
            created_lich_lam_viec.append(llv_obj)
        except Exception as e:
            print(f"Error creating LichLamViec for {nv.HoTenNV}: {e}")
    
    return created_lich_lam_viec

def create_lich_hen(khach_hang, dich_vu, lich_lam_viec):
    """Tạo lịch hẹn"""
    lich_hen_data = []

    # Từ file tu_import_data.py
    lich_hen_data.extend([
        {
            'kh_username': 'nguyenanhduc', 'dv_ten': 'Cắt tóc cơ bản', 'llv_details': ('Nguyễn Thanh Tùng', '2025-06-02', '08:00', '12:00'),
            'NgayDatLich': '2025-06-02', 'GioDatLich': '08:30', 'GioKhachDen': '08:30',
            'TrangThai': randint(0, 1), 'GhiChu': 'Tôi muốn súc bình xăng con'
        },
        {
            'kh_username': 'tranbuiquocan', 'dv_ten': 'Massage vai gáy', 'llv_details': ('Nguyễn Thanh Tùng', '2025-06-03', '12:00', '17:00'),
            'NgayDatLich': '2025-06-03', 'GioDatLich': '12:00', 'GioKhachDen': '12:00',
            'TrangThai': randint(0, 1), 'GhiChu': 'Tư vấn kiểu tóc hot trend 2025'
        },
        {
            'kh_username': 'nguyenanhduc', 'dv_ten': 'Cắt tóc cơ bản', 'llv_details': ('Nguyễn Thanh Tùng', '2025-06-04', '17:00', '22:00'),
            'NgayDatLich': '2025-06-04', 'GioDatLich': '17:30', 'GioKhachDen': '17:30',
            'TrangThai': randint(0, 1), 'GhiChu': 'Cắt tóc, gội đầu'
        },
        {
            'kh_username': 'tranbuiquocan', 'dv_ten': 'Massage vai gáy', 'llv_details': ('Nguyễn Thanh Tùng', '2025-06-05', '08:00', '17:00'),
            'NgayDatLich': '2025-06-05', 'GioDatLich': '09:00', 'GioKhachDen': '09:00',
            'TrangThai': randint(0, 1), 'GhiChu': 'Tư vấn chăm sóc tóc'
        },
        {
            'kh_username': 'nguyenanhduc', 'dv_ten': 'Cắt tóc cơ bản', 'llv_details': ('Nguyễn Thanh Tùng', '2025-06-06', '12:00', '20:30'),
            'NgayDatLich': '2025-06-06', 'GioDatLich': '13:00', 'GioKhachDen': '13:00',
            'TrangThai': randint(0, 1), 'GhiChu': 'Cắt tóc, tạo kiểu boy phố'
        },
         {
            'kh_username': 'nguyenanhduc', 'dv_ten': 'Massage vai gáy', 'llv_details': ('Nguyễn Thanh Tùng', '2025-06-09', '13:00', '19:30'),
            'NgayDatLich': '2025-06-09', 'GioDatLich': '14:00', 'GioKhachDen': '14:00',
            'TrangThai': randint(0, 1), 'GhiChu': 'Tôi muốn súc bình xăng con'
        },
        {
            'kh_username': 'tranbuiquocan', 'dv_ten': 'Cắt tóc cơ bản', 'llv_details': ('Nguyễn Thanh Tùng', '2025-06-10', '08:00', '19:00'),
            'NgayDatLich': '2025-06-10', 'GioDatLich': '09:00', 'GioKhachDen': '09:00',
            'TrangThai': randint(0, 1), 'GhiChu': 'Tư vấn kiểu tóc hot trend 2025'
        },
        {
            'kh_username': 'nguyenanhduc', 'dv_ten': 'Massage vai gáy', 'llv_details': ('Nguyễn Thanh Tùng', '2025-06-11', '08:00', '21:30'),
            'NgayDatLich': '2025-06-11', 'GioDatLich': '10:00', 'GioKhachDen': '10:00',
            'TrangThai': randint(0, 1), 'GhiChu': 'Cắt tóc, gội đầu'
        },
        {
            'kh_username': 'tranbuiquocan', 'dv_ten': 'Cắt tóc cơ bản', 'llv_details': ('Nguyễn Thanh Tùng', '2025-06-12', '12:00', '17:00'),
            'NgayDatLich': '2025-06-12', 'GioDatLich': '12:30', 'GioKhachDen': '12:30',
            'TrangThai': randint(0, 1), 'GhiChu': 'Tư vấn chăm sóc tóc'
        },
        {
            'kh_username': 'nguyenanhduc', 'dv_ten': 'Massage vai gáy', 'llv_details': ('Nguyễn Thanh Tùng', '2025-06-13', '17:00', '22:00'),
            'NgayDatLich': '2025-06-13', 'GioDatLich': '17:00', 'GioKhachDen': '17:00',
            'TrangThai': randint(0, 1), 'GhiChu': 'Cắt tóc, tạo kiểu boy phố'
        },
        {
            'kh_username': 'nguyenanhduc', 'dv_ten': 'Cắt tóc cơ bản', 'llv_details': ('Nguyễn Thanh Tùng', '2025-06-16', '08:00', '20:00'),
            'NgayDatLich': '2025-06-16', 'GioDatLich': '08:00', 'GioKhachDen': '08:00',
            'TrangThai': randint(0, 1), 'GhiChu': 'Tôi muốn súc bình xăng con'
        },
        {
            'kh_username': 'tranbuiquocan', 'dv_ten': 'Massage vai gáy', 'llv_details': ('Nguyễn Thanh Tùng', '2025-06-17', '08:00', '21:00'),
            'NgayDatLich': '2025-06-17', 'GioDatLich': '08:30', 'GioKhachDen': '08:30',
            'TrangThai': randint(0, 1), 'GhiChu': 'Tư vấn kiểu tóc hot trend 2025'
        },
        {
            'kh_username': 'nguyenanhduc', 'dv_ten': 'Cắt tóc cơ bản', 'llv_details': ('Nguyễn Thanh Tùng', '2025-06-18', '08:00', '20:30'),
            'NgayDatLich': '2025-06-18', 'GioDatLich': '09:00', 'GioKhachDen': '09:00',
            'TrangThai': randint(0, 1), 'GhiChu': 'Cắt tóc, gội đầu'
        },
        {
            'kh_username': 'nguyenanhduc', 'dv_ten': 'Massage vai gáy', 'llv_details': ('Ngô Văn Hải', '2025-06-02', '08:00', '17:00'),
            'NgayDatLich': '2025-06-02', 'GioDatLich': '10:00', 'GioKhachDen': '10:00',
            'TrangThai': randint(0, 1), 'GhiChu': 'Tư vấn chăm sóc tóc'
        },
    ])

    # Từ file hoang_import_data.py
    lich_hen_data.extend([
        {
            'kh_username': 'nguyentruonggiang', 'dv_ten': 'Nhuộm tóc (Tẩy)', 'llv_details': ('Trương Thái Bảo', '2025-06-02', '08:00', '12:00'),
            'NgayDatLich': '2025-06-02', 'GioDatLich': '09:00', 'GioKhachDen': '10:00',
            'TrangThai': 1, 'GhiChu': "Khách muốn nhuộm màu xám khói"
        },
        {
            'kh_username': 'leducnhan', 'dv_ten': 'Gội đầu dưỡng sinh', 'llv_details': ('Hồ Văn Trường', '2025-06-07', '08:00', '12:00'),
            'NgayDatLich': '2025-06-07', 'GioDatLich': '18:30', 'GioKhachDen': '20:30',
            'TrangThai': 1, 'GhiChu': "Gội đầu thư giãn"
        },
        {
            'kh_username': 'nguyentruonggiang', 'dv_ten': 'Gội đầu dưỡng sinh', 'llv_details': ('Trương Thái Bảo', '2025-06-04', '08:00', '12:00'),
            'NgayDatLich': '2025-06-04', 'GioDatLich': '10:00', 'GioKhachDen': '12:00',
            'TrangThai': 0, 'GhiChu': "Gội đầu + hút mụn"
        },
        {
            'kh_username': 'leducnhan', 'dv_ten': 'Nhuộm tóc (Tẩy)', 'llv_details': ('Hồ Văn Trường', '2025-06-09', '08:00', '17:00'),
            'NgayDatLich': '2025-06-09', 'GioDatLich': '19:00', 'GioKhachDen': '19:30',
            'TrangThai': 1, 'GhiChu': "Nhuộm màu nâu khói"
        },
        {
            'kh_username': 'nguyentruonggiang', 'dv_ten': 'Nhuộm tóc (Tẩy)', 'llv_details': ('Trương Thái Bảo', '2025-06-06', '08:00', '17:00'),
            'NgayDatLich': '2025-06-06', 'GioDatLich': '10:30', 'GioKhachDen': '12:30',
            'TrangThai': 0, 'GhiChu': "Tẩy và nhuộm bạch kim"
        },
    ])

    # Từ file huong_import_data.py
    lich_hen_data.extend([
        {
            'kh_username': 'phamminhhoang', 'dv_ten': 'Cắt tóc nam cao cấp', 'llv_details': ('Trần Thị Thủy', '2025-06-02', '12:00', '17:00'),
            'NgayDatLich': '2025-06-02', 'GioDatLich': '09:00', 'GioKhachDen': '09:00',
            'TrangThai': 1, 'GhiChu': 'Cắt tóc nam thời trang'
        },
        {
            'kh_username': 'nguyenvananh', 'dv_ten': 'Uốn tóc nam', 'llv_details': ('Lê Văn Hùng', '2025-06-03', '12:00', '17:00'),
            'NgayDatLich': '2025-06-03', 'GioDatLich': '11:00', 'GioKhachDen': '11:00',
            'TrangThai': 1, 'GhiChu': 'Uốn tóc nam kiểu mới'
        },
        {
            'kh_username': 'phamminhhoang', 'dv_ten': 'Uốn tóc nam', 'llv_details': ('Trần Thị Thủy', '2025-06-04', '17:00', '22:00'),
            'NgayDatLich': '2025-06-04', 'GioDatLich': '13:00', 'GioKhachDen': '13:00',
            'TrangThai': 0, 'GhiChu': 'Cắt tóc và tư vấn kiểu'
        },
        {
            'kh_username': 'nguyenvananh', 'dv_ten': 'Cắt tóc nam cao cấp', 'llv_details': ('Lê Văn Hùng', '2025-06-05', '08:00', '12:00'),
            'NgayDatLich': '2025-06-05', 'GioDatLich': '15:00', 'GioKhachDen': '15:00',
            'TrangThai': 1, 'GhiChu': 'Uốn tóc và chăm sóc'
        },
        {
            'kh_username': 'phamminhhoang', 'dv_ten': 'Cắt tóc nam cao cấp', 'llv_details': ('Trần Thị Thủy', '2025-06-06', '12:00', '17:00'),
            'NgayDatLich': '2025-06-06', 'GioDatLich': '16:00', 'GioKhachDen': '16:00',
            'TrangThai': 0, 'GhiChu': 'Cắt tóc, tạo kiểu nam'
        }
    ])

    # Từ file kien_import_data.py
    lich_hen_data.extend([
        {
            'kh_username': 'hoangvananh', 'dv_ten': 'Massage vai gáy', 'llv_details': ('Nguyễn Hoàng Sang', '2025-06-02', '08:00', '18:00'),
            'NgayDatLich': '2025-06-02', 'GioDatLich': '08:30', 'GioKhachDen': '08:30',
            'TrangThai': randint(0, 1), 'GhiChu': "Dịch vụ tốt, nhân viên nhiệt tình, sẽ giới thiệu bạn bè."
        },
        {
            'kh_username': 'hoangvananh', 'dv_ten': 'Cắt tóc cơ bản', 'llv_details': ('Nguyễn Hoàng Sang', '2025-06-03', '08:00', '19:00'),
            'NgayDatLich': '2025-06-03', 'GioDatLich': '09:30', 'GioKhachDen': '09:30',
            'TrangThai': randint(0, 1), 'GhiChu': "Cắt tóc đẹp, không phải chờ lâu."
        },
        {
            'kh_username': 'leducnhan', 'dv_ten': 'Massage vai gáy', 'llv_details': ('Nguyễn Hoàng Sang', '2025-06-04', '08:00', '20:00'),
            'NgayDatLich': '2025-06-04', 'GioDatLich': '12:00', 'GioKhachDen': '12:00',
            'TrangThai': randint(0, 1), 'GhiChu': "Gội đầu thư giãn, không gian sạch sẽ."
        },
        {
            'kh_username': 'leducnhan', 'dv_ten': 'Cắt tóc cơ bản', 'llv_details': ('Nguyễn Hoàng Sang', '2025-06-05', '08:00', '20:00'),
            'NgayDatLich': '2025-06-05', 'GioDatLich': '14:40', 'GioKhachDen': '14:40',
            'TrangThai': randint(0, 1), 'GhiChu': "Tạo kiểu hợp thời, giá hợp lý."
        },
        {
            'kh_username': 'hoangvananh', 'dv_ten': 'Massage vai gáy', 'llv_details': ('Nguyễn Hoàng Sang', '2025-06-06', '08:00', '20:30'),
            'NgayDatLich': '2025-06-06', 'GioDatLich': '18:20', 'GioKhachDen': '18:20',
            'TrangThai': randint(0, 1), 'GhiChu': "Nhân viên tư vấn tận tâm, sẽ quay lại lần nữa."
        }
    ])

    created_lich_hen = []
    for hen_data in lich_hen_data:
        kh_username = hen_data['kh_username']
        dv_ten = hen_data['dv_ten']
        llv_details = hen_data['llv_details']
        ngay_dat_lich_str = hen_data['NgayDatLich']
        gio_dat_lich_str = hen_data['GioDatLich']
        gio_khach_den_str = hen_data['GioKhachDen']
        trang_thai = hen_data['TrangThai']
        ghi_chu = hen_data['GhiChu']

        try:
            kh = next((kh for kh in khach_hang if kh.user.username == kh_username), None)
            dv = next((dv for dv in dich_vu if dv.TenDV == dv_ten), None)
            nv_ten, llv_ngay_str, llv_gio_bd_str, llv_gio_kt_str = llv_details
            llv_ngay = datetime.strptime(llv_ngay_str, '%Y-%m-%d').date()
            llv_gio_bd = datetime.strptime(llv_gio_bd_str, '%H:%M').time()
            llv_gio_kt = datetime.strptime(llv_gio_kt_str, '%H:%M').time()

            llv = next((llv for llv in lich_lam_viec if llv.MaNV.HoTenNV == nv_ten and llv.NgayLam == llv_ngay and llv.GioBatDau == llv_gio_bd and llv.GioKetThuc == llv_gio_kt), None)

            if not kh or not dv or not llv:
                print(f"Skipping LichHen creation: Could not find related objects for {kh_username}, {dv_ten}, {llv_details}")
                continue

            ngay_dat_lich = datetime.strptime(ngay_dat_lich_str, '%Y-%m-%d').date()
            gio_dat_lich = datetime.strptime(gio_dat_lich_str, '%H:%M').time()
            gio_khach_den = datetime.strptime(gio_khach_den_str, '%H:%M').time()

            lich_hen_obj, created = LichHen.objects.get_or_create(
                MaKH=kh,
                MaDV=dv,
                NgayDatLich=ngay_dat_lich,
                GioDatLich=gio_dat_lich,
                defaults={
                    'MaLLV': llv,
                    'GioKhachDen': gio_khach_den,
                    'TrangThai': trang_thai,
                    'GhiChu': ghi_chu
                }
            )
            if created:
                print(f"Created LichHen for {kh.HoTenKH} with {dv.TenDV} on {ngay_dat_lich} at {gio_dat_lich}")
            else:
                print(f"LichHen for {kh.HoTenKH} with {dv.TenDV} on {ngay_dat_lich} at {gio_dat_lich} already exists")
            created_lich_hen.append(lich_hen_obj)
        except Exception as e:
            print(f"Error creating LichHen for {kh_username}: {e}")

    return created_lich_hen

def create_hoa_don_and_chi_tiet(khach_hang, dich_vu):
    """Tạo hóa đơn và chi tiết hóa đơn"""
    hoa_don_data = []

    # Từ file tu_import_data.py
    hoa_don_data.extend([
        {
            'kh_username': 'nguyenanhduc', 'TongTien': Decimal('250000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 1, 9, 30)),
            'SoTienThanhToan': Decimal('250000.00'), 'HinhThucThanhToan': 0, 'TrangThaiTT': 1, 'TrangThaiHT': 0,
            'GhiChu': 'Khách quay lại lần đầu, cắt tóc và massage.',
            'chi_tiet': [
                {'dv_ten': 'Massage vai gáy', 'ThanhTien': Decimal('250000.00'), 'SoLuong': 1}
            ]
        },
        {
            'kh_username': 'nguyenanhduc', 'TongTien': Decimal('600000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 2, 11, 15)),
            'SoTienThanhToan': Decimal('600000.00'), 'HinhThucThanhToan': 1, 'TrangThaiTT': 0, 'TrangThaiHT': 1,
            'GhiChu': 'Cắt tóc, nhuộm highlight, gội đầu.',
            'chi_tiet': [
                {'dv_ten': 'Cắt tóc cơ bản', 'ThanhTien': Decimal('300000.00'), 'SoLuong': 1},
                {'dv_ten': 'Massage vai gáy', 'ThanhTien': Decimal('300000.00'), 'SoLuong': 1}
            ]
        },
        {
            'kh_username': 'tranbuiquocan', 'TongTien': Decimal('150000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 3, 13, 0)),
            'SoTienThanhToan': Decimal('150000.00'), 'HinhThucThanhToan': 0, 'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'GhiChu': 'Gội đầu dưỡng sinh.',
            'chi_tiet': [
                {'dv_ten': 'Massage vai gáy', 'ThanhTien': Decimal('150000.00'), 'SoLuong': 1}
            ]
        },
        {
            'kh_username': 'tranbuiquocan', 'TongTien': Decimal('450000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 4, 15, 45)),
            'SoTienThanhToan': Decimal('450000.00'), 'HinhThucThanhToan': 1, 'TrangThaiTT': 0, 'TrangThaiHT': 1,
            'GhiChu': 'Cắt tóc, tạo kiểu, massage.',
            'chi_tiet': [
                {'dv_ten': 'Cắt tóc cơ bản', 'ThanhTien': Decimal('300000.00'), 'SoLuong': 1},
                {'dv_ten': 'Massage vai gáy', 'ThanhTien': Decimal('150000.00'), 'SoLuong': 1}
            ]
        },
        {
            'kh_username': 'nguyenanhduc', 'TongTien': Decimal('300000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 5, 17, 20)),
            'SoTienThanhToan': Decimal('300000.00'), 'HinhThucThanhToan': 0, 'TrangThaiTT': 1, 'TrangThaiHT': 0,
            'GhiChu': 'Nhuộm tóc, gội đầu, tư vấn kiểu mới.',
            'chi_tiet': [
                {'dv_ten': 'Massage vai gáy', 'ThanhTien': Decimal('150000.00'), 'SoLuong': 2}
            ]
        },
        {
            'kh_username': 'tranbuiquocan', 'TongTien': Decimal('600000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 6, 19, 10)),
            'SoTienThanhToan': Decimal('600000.00'), 'HinhThucThanhToan': 1, 'TrangThaiTT': 0, 'TrangThaiHT': 1,
            'GhiChu': 'Cắt tóc, massage, tạo kiểu.',
            'chi_tiet': [
                {'dv_ten': 'Cắt tóc cơ bản', 'ThanhTien': Decimal('300000.00'), 'SoLuong': 2}
            ]
        },
    ])

    # Từ file hoang_import_data.py
    hoa_don_data.extend([
        {
            'kh_username': 'nguyentruonggiang', 'TongTien': Decimal('150000'),
            'NgayLapHD': timezone.make_aware(datetime(2024, 6, 5)),
            'SoTienThanhToan': Decimal('150000'), 'HinhThucThanhToan': 1,
            'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'dv_ten': 'Gội đầu dưỡng sinh', 'ThanhTien': Decimal('150000'), 'SoLuong': 1}
            ]
        },
        {
            'kh_username': 'leducnhan', 'TongTien': Decimal('500000'),
            'NgayLapHD': timezone.make_aware(datetime(2024, 6, 7)),
            'SoTienThanhToan': Decimal('500000'), 'HinhThucThanhToan': 0,
            'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'dv_ten': 'Nhuộm tóc (Tẩy)', 'ThanhTien': Decimal('500000'), 'SoLuong': 1}
            ]
        },
        {
            'kh_username': 'nguyentruonggiang', 'TongTien': Decimal('650000'),
            'NgayLapHD': timezone.make_aware(datetime(2024, 6, 8)),
            'SoTienThanhToan': Decimal('650000'), 'HinhThucThanhToan': 2,
            'ThoiGianThanhToan': timezone.make_aware(datetime(2024, 6, 8, 14, 0, 0)),
            'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'dv_ten': 'Nhuộm tóc (Tẩy)', 'ThanhTien': Decimal('500000'), 'SoLuong': 1},
                {'dv_ten': 'Gội đầu dưỡng sinh', 'ThanhTien': Decimal('150000'), 'SoLuong': 1}
            ]
        },
    ])

    # Từ file huong_import_data.py
    hoa_don_data.extend([
        {
            'kh_username': 'phamminhhoang', 'TongTien': Decimal('200000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 25, 10, 0)),
            'SoTienThanhToan': Decimal('200000.00'), 'HinhThucThanhToan': 1,
            'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'dv_ten': 'Cắt tóc nam cao cấp', 'ThanhTien': Decimal('200000.00'), 'SoLuong': 1}
            ]
        },
        {
            'kh_username': 'nguyenvananh', 'TongTien': Decimal('800000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 25, 12, 0)),
            'SoTienThanhToan': Decimal('800000.00'), 'HinhThucThanhToan': 0,
            'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'dv_ten': 'Uốn tóc nam', 'ThanhTien': Decimal('800000.00'), 'SoLuong': 1}
            ]
        },
        {
            'kh_username': 'phamminhhoang', 'TongTien': Decimal('1000000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 25, 14, 0)),
            'SoTienThanhToan': Decimal('1000000.00'), 'HinhThucThanhToan': 2,
            'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'dv_ten': 'Cắt tóc nam cao cấp', 'ThanhTien': Decimal('200000.00'), 'SoLuong': 1},
                {'dv_ten': 'Uốn tóc nam', 'ThanhTien': Decimal('800000.00'), 'SoLuong': 1}
            ]
        },
        {
            'kh_username': 'nguyenvananh', 'TongTien': Decimal('400000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 26, 9, 0)),
            'SoTienThanhToan': Decimal('400000.00'), 'HinhThucThanhToan': 1,
            'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'dv_ten': 'Cắt tóc nam cao cấp', 'ThanhTien': Decimal('200000.00'), 'SoLuong': 2}
            ]
        },
        {
            'kh_username': 'phamminhhoang', 'TongTien': Decimal('1600000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 26, 15, 0)),
            'SoTienThanhToan': Decimal('1600000.00'), 'HinhThucThanhToan': 0,
            'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'dv_ten': 'Uốn tóc nam', 'ThanhTien': Decimal('800000.00'), 'SoLuong': 2}
            ]
        },
        {
            'kh_username': 'nguyenvananh', 'TongTien': Decimal('600000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 27, 11, 0)),
            'SoTienThanhToan': Decimal('600000.00'), 'HinhThucThanhToan': 1,
            'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'dv_ten': 'Cắt tóc nam cao cấp', 'ThanhTien': Decimal('200000.00'), 'SoLuong': 3}
            ]
        },
        {
            'kh_username': 'phamminhhoang', 'TongTien': Decimal('2400000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 27, 16, 0)),
            'SoTienThanhToan': Decimal('2400000.00'), 'HinhThucThanhToan': 2,
            'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'dv_ten': 'Uốn tóc nam', 'ThanhTien': Decimal('800000.00'), 'SoLuong': 3}
            ]
        },
        {
            'kh_username': 'nguyenvananh', 'TongTien': Decimal('3000000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 28, 14, 0)),
            'SoTienThanhToan': Decimal('3000000.00'), 'HinhThucThanhToan': 0,
            'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'dv_ten': 'Cắt tóc nam cao cấp', 'ThanhTien': Decimal('200000.00'), 'SoLuong': 3},
                {'dv_ten': 'Uốn tóc nam', 'ThanhTien': Decimal('800000.00'), 'SoLuong': 3}
            ]
        }
    ])

    # Từ file kien_import_data.py
    hoa_don_data.extend([
        {
            'kh_username': 'hoangvananh', 'TongTien': Decimal('150000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 1, 9, 30)),
            'SoTienThanhToan': Decimal('150000.00'), 'HinhThucThanhToan': 0, 'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'dv_ten': 'Massage vai gáy', 'ThanhTien': Decimal('150000.00'), 'SoLuong': 1}
            ]
        },
        {
            'kh_username': 'hoangvananh', 'TongTien': Decimal('300000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 2, 11, 15)),
            'SoTienThanhToan': Decimal('300000.00'), 'HinhThucThanhToan': 1, 'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'dv_ten': 'Cắt tóc cơ bản', 'ThanhTien': Decimal('300000.00'), 'SoLuong': 1}
            ]
        },
         {
            'kh_username': 'leducnhan', 'TongTien': Decimal('150000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 3, 13, 0)),
            'SoTienThanhToan': Decimal('150000.00'), 'HinhThucThanhToan': 0, 'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'dv_ten': 'Massage vai gáy', 'ThanhTien': Decimal('150000.00'), 'SoLuong': 1}
            ]
        },
        {
            'kh_username': 'leducnhan', 'TongTien': Decimal('300000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 4, 15, 45)),
            'SoTienThanhToan': Decimal('300000.00'), 'HinhThucThanhToan': 1, 'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'dv_ten': 'Cắt tóc cơ bản', 'ThanhTien': Decimal('300000.00'), 'SoLuong': 1}
            ]
        },
        {
            'kh_username': 'hoangvananh', 'TongTien': Decimal('150000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 5, 17, 20)),
            'SoTienThanhToan': Decimal('150000.00'), 'HinhThucThanhToan': 0, 'TrangThaiTT': 1, 'TrangThaiHT': 1,
             'chi_tiet': [
                {'dv_ten': 'Massage vai gáy', 'ThanhTien': Decimal('150000.00'), 'SoLuong': 1}
            ]
        },
    ])

    # Từ file kien_import_data.py
    # Bổ sung dữ liệu hóa đơn được tham chiếu trong phần đánh giá của Kiên
    hoa_don_data.extend([
        {
            'kh_username': 'hoangvananh', 'TongTien': Decimal('150000.00'), # Giá tiền ước tính dựa trên Massage vai gáy
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 1, 9, 30)),
            'SoTienThanhToan': Decimal('150000.00'), 'HinhThucThanhToan': 0, 'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'dv_ten': 'Massage vai gáy', 'ThanhTien': Decimal('150000.00'), 'SoLuong': 1} # Giá tiền và số lượng ước tính
            ]
        },
        {
            'kh_username': 'hoangvananh', 'TongTien': Decimal('300000.00'), # Giá tiền ước tính dựa trên Cắt tóc cơ bản
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 2, 11, 15)),
            'SoTienThanhToan': Decimal('300000.00'), 'HinhThucThanhToan': 1, 'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'dv_ten': 'Cắt tóc cơ bản', 'ThanhTien': Decimal('300000.00'), 'SoLuong': 1} # Giá tiền và số lượng ước tính
            ]
        },
         {
            'kh_username': 'leducnhan', 'TongTien': Decimal('150000.00'), # Giá tiền ước tính
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 3, 13, 0)), # Dựa trên hoa_don_details của Đánh giá
            'SoTienThanhToan': Decimal('150000.00'), 'HinhThucThanhToan': 0, 'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'dv_ten': 'Massage vai gáy', 'ThanhTien': Decimal('150000.00'), 'SoLuong': 1} # Giá tiền và số lượng ước tính
            ]
        },
        {
            'kh_username': 'leducnhan', 'TongTien': Decimal('300000.00'), # Giá tiền ước tính
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 4, 15, 45)), # Dựa trên hoa_don_details của Đánh giá
            'SoTienThanhToan': Decimal('300000.00'), 'HinhThucThanhToan': 1, 'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'dv_ten': 'Cắt tóc cơ bản', 'ThanhTien': Decimal('300000.00'), 'SoLuong': 1} # Giá tiền và số lượng ước tính
            ]
        },
        {
            'kh_username': 'hoangvananh', 'TongTien': Decimal('150000.00'), # Giá tiền ước tính
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 5, 17, 20)), # Dựa trên hoa_don_details cuối cùng của Kiên
            'SoTienThanhToan': Decimal('150000.00'), 'HinhThucThanhToan': 0, 'TrangThaiTT': 1, 'TrangThaiHT': 1,
             'chi_tiet': [
                {'dv_ten': 'Massage vai gáy', 'ThanhTien': Decimal('150000.00'), 'SoLuong': 1} # Giá tiền và số lượng ước tính
            ]
        },
    ])

    created_hoa_don = []
    for hd_data in hoa_don_data:
        kh_username = hd_data['kh_username']
        ngay_lap_hd = hd_data['NgayLapHD']
        tong_tien = hd_data['TongTien']
        so_tien_tt = hd_data['SoTienThanhToan']
        hinh_thuc_tt = hd_data['HinhThucThanhToan']
        trang_thai_tt = hd_data['TrangThaiTT']
        trang_thai_ht = hd_data['TrangThaiHT']
        ghi_chu = hd_data.get('GhiChu', '') # Use .get to handle missing GhiChu
        thoi_gian_tt = hd_data.get('ThoiGianThanhToan', ngay_lap_hd) # Use .get and default to NgayLapHD
        chi_tiet_data = hd_data['chi_tiet']

        try:
            kh = next((kh for kh in khach_hang if kh.user.username == kh_username), None)

            if not kh:
                print(f"Skipping HoaDon creation: Could not find KhachHang for username {kh_username}")
                continue

            hoa_don_obj, created = HoaDon.objects.get_or_create(
                MaKH=kh,
                NgayLapHD=ngay_lap_hd,
                TongTien=tong_tien,
                 defaults={
                    'SoTienThanhToan': so_tien_tt,
                    'HinhThucThanhToan': hinh_thuc_tt,
                    'TrangThaiTT': trang_thai_tt,
                    'TrangThaiHT': trang_thai_ht,
                    'GhiChu': ghi_chu,
                    'ThoiGianThanhToan': thoi_gian_tt
                 }
            )
            if created:
                print(f"Created HoaDon for {kh.HoTenKH} on {ngay_lap_hd.date()}")
                created_hoa_don.append(hoa_don_obj)

                # Create ChiTietHoaDon for the new HoaDon
                for ct_data in chi_tiet_data:
                    dv_ten = ct_data['dv_ten']
                    thanh_tien = ct_data['ThanhTien']
                    so_luong = ct_data['SoLuong']

                    dv = next((dv for dv in dich_vu if dv.TenDV == dv_ten), None)
                    if dv:
                        ChiTietHoaDon.objects.create(
                            MaHD=hoa_don_obj,
                            MaDV=dv,
                            ThanhTien=thanh_tien,
                            SoLuong=so_luong
                        )
                        print(f"Created ChiTietHoaDon for HoaDon {hoa_don_obj.pk} with DichVu {dv.TenDV}")
                    else:
                        print(f"Skipping ChiTietHoaDon creation: Could not find DichVu with name {dv_ten}")
            else:
                 print(f"HoaDon for {kh.HoTenKH} on {ngay_lap_hd.date()} already exists. Skipping ChiTietHoaDon creation.")
                 # If HoaDon already exists, we assume its ChiTietHoaDon also exist or should not be duplicated
                 # You might add logic here to update ChiTietHoaDon if needed, but for simple data import, skipping is safer.

        except Exception as e:
            print(f"Error creating HoaDon or ChiTietHoaDon for {kh_username}: {e}")

    return created_hoa_don

def create_danh_gia(khach_hang, dich_vu, hoa_don):
    """Tạo đánh giá"""
    danh_gia_data = []

    # Từ file hoang_import_data.py
    danh_gia_data.extend([
        {
            'kh_username': 'leducnhan', 'NgayDanhGia': date(2024, 6, 7), 'NoiDung': "Trải nghiệm tuyệt vời, nhân viên nhiệt tình, làm tóc ưng ý!",
            'DiemDanhGia': 5, 'dv_ten': 'Nhuộm tóc (Tẩy)', 'hoa_don_details': ('leducnhan', timezone.make_aware(datetime(2024, 6, 7)))
        },
        {
            'kh_username': 'nguyentruonggiang', 'NgayDanhGia': date(2024, 6, 5), 'NoiDung': "Gội đầu dưỡng sinh rất thư giãn, sẽ giới thiệu bạn bè.",
            'DiemDanhGia': 4, 'dv_ten': 'Gội đầu dưỡng sinh', 'hoa_don_details': ('nguyentruonggiang', timezone.make_aware(datetime(2024, 6, 5)))
        },
        {
            'kh_username': 'leducnhan', 'NgayDanhGia': date(2024, 6, 7), 'NoiDung': "Màu tóc đẹp nhưng dịch vụ hơi chậm.",
            'DiemDanhGia': 3, 'dv_ten': 'Nhuộm tóc (Tẩy)', 'hoa_don_details': ('leducnhan', timezone.make_aware(datetime(2024, 6, 7)))
        },
        {
            'kh_username': 'nguyentruonggiang', 'NgayDanhGia': date(2024, 6, 8), 'NoiDung': "Rất ưng ý với kiểu tóc mới, cảm ơn nhân viên.",
            'DiemDanhGia': 5, 'dv_ten': 'Nhuộm tóc (Tẩy)', 'hoa_don_details': ('nguyentruonggiang', timezone.make_aware(datetime(2024, 6, 8)))
        },
        {
            'kh_username': 'leducnhan', 'NgayDanhGia': date(2024, 6, 8), 'NoiDung': "Dịch vụ gội đầu tốt, nhân viên chu đáo.",
            'DiemDanhGia': 4, 'dv_ten': 'Gội đầu dưỡng sinh', 'hoa_don_details': ('nguyentruonggiang', timezone.make_aware(datetime(2024, 6, 8)))
        },
    ])

    # Từ file huong_import_data.py
    danh_gia_data.extend([
        {
            'kh_username': 'nguyenvananh', 'NgayDanhGia': date(2025, 5, 25), 'NoiDung': 'Nhân viên phục vụ rất chuyên nghiệp và nhiệt tình.',
            'DiemDanhGia': 5, 'dv_ten': 'Cắt tóc nam cao cấp', 'hoa_don_details': ('phamminhhoang', timezone.make_aware(datetime(2025, 5, 25, 10, 0)))
        },
        {
            'kh_username': 'phamminhhoang', 'NgayDanhGia': date(2025, 5, 25), 'NoiDung': 'Chất lượng dịch vụ tốt, giá cả hợp lý.',
            'DiemDanhGia': 4, 'dv_ten': 'Uốn tóc nam', 'hoa_don_details': ('nguyenvananh', timezone.make_aware(datetime(2025, 5, 25, 12, 0)))
        },
        {
            'kh_username': 'nguyenvananh', 'NgayDanhGia': date(2025, 5, 25), 'NoiDung': 'Không gian salon rộng rãi, thoáng mát.',
            'DiemDanhGia': 5, 'dv_ten': 'Cắt tóc nam cao cấp', 'hoa_don_details': ('phamminhhoang', timezone.make_aware(datetime(2025, 5, 25, 14, 0)))
        },
        {
            'kh_username': 'phamminhhoang', 'NgayDanhGia': date(2025, 5, 26), 'NoiDung': 'Kỹ thuật viên có tay nghề cao, cắt tóc đẹp.',
            'DiemDanhGia': 5, 'dv_ten': 'Cắt tóc nam cao cấp', 'hoa_don_details': ('nguyenvananh', timezone.make_aware(datetime(2025, 5, 26, 9, 0)))
        },
        {
            'kh_username': 'nguyenvananh', 'NgayDanhGia': date(2025, 5, 26), 'NoiDung': 'Uốn tóc đẹp, giữ nếp lâu, rất hài lòng.',
            'DiemDanhGia': 4, 'dv_ten': 'Uốn tóc nam', 'hoa_don_details': ('phamminhhoang', timezone.make_aware(datetime(2025, 5, 26, 15, 0)))
        }
    ])

    # Từ file kien_import_data.py
    danh_gia_data.extend([
         {
            'kh_username': 'hoangvananh', 'NgayDanhGia': date(2025, 6, 1), 'NoiDung': "Dịch vụ tốt, nhân viên nhiệt tình, sẽ giới thiệu bạn bè.",
            'DiemDanhGia': 4, 'dv_ten': 'Massage vai gáy', 'hoa_don_details': ('hoangvananh', timezone.make_aware(datetime(2025, 6, 1, 9, 30)))
        },
        {
            'kh_username': 'hoangvananh', 'NgayDanhGia': date(2025, 6, 2), 'NoiDung': "Cắt tóc đẹp, không phải chờ lâu.",
            'DiemDanhGia': 5, 'dv_ten': 'Cắt tóc cơ bản', 'hoa_don_details': ('hoangvananh', timezone.make_aware(datetime(2025, 6, 2, 11, 15)))
        },
        {
            'kh_username': 'leducnhan', 'NgayDanhGia': date(2025, 6, 3), 'NoiDung': "Gội đầu thư giãn, không gian sạch sẽ.",
            'DiemDanhGia': 4, 'dv_ten': 'Massage vai gáy', 'hoa_don_details': ('tranbuiquocan', timezone.make_aware(datetime(2025, 6, 3, 13, 0)))
        },
        {
            'kh_username': 'leducnhan', 'NgayDanhGia': date(2025, 6, 4), 'NoiDung': "Tạo kiểu hợp thời, giá hợp lý.",
            'DiemDanhGia': 5, 'dv_ten': 'Cắt tóc cơ bản', 'hoa_don_details': ('tranbuiquocan', timezone.make_aware(datetime(2025, 6, 4, 15, 45)))
        },
        {
            'kh_username': 'hoangvananh', 'NgayDanhGia': date(2025, 6, 5), 'NoiDung': "Nhân viên tư vấn tận tâm, sẽ quay lại lần nữa.",
            'DiemDanhGia': 5, 'dv_ten': 'Massage vai gáy', 'hoa_don_details': ('nguyenanhduc', timezone.make_aware(datetime(2025, 6, 5, 17, 20)))
        }
    ])

    created_danh_gia = []
    for dg_data in danh_gia_data:
        kh_username = dg_data['kh_username']
        ngay_danh_gia = dg_data['NgayDanhGia']
        noi_dung = dg_data['NoiDung']
        diem_danh_gia = dg_data['DiemDanhGia']
        dv_ten = dg_data['dv_ten']
        hd_details = dg_data['hoa_don_details']

        try:
            kh = next((kh for kh in khach_hang if kh.user.username == kh_username), None)
            dv = next((dv for dv in dich_vu if dv.TenDV == dv_ten), None)
            hd_kh_username, hd_ngay_lap_hd_aware = hd_details

            # Find the corresponding HoaDon based on KhachHang username and exact NgayLapHD
            hd = HoaDon.objects.filter(
                MaKH__user__username=hd_kh_username,
                NgayLapHD=hd_ngay_lap_hd_aware
            ).first()

            if not kh or not dv or not hd:
                print(f"Skipping DanhGia creation: Could not find related objects for KhachHang {kh_username}, DichVu {dv_ten}, HoaDon {hd_details}")
                continue

            danh_gia_obj, created = DanhGia.objects.get_or_create(
                MaKH=kh,
                MaDV=dv,
                MaHD=hd,
                NgayDanhGia=ngay_danh_gia,
                defaults={
                    'NoiDung': noi_dung,
                    'DiemDanhGia': diem_danh_gia
                }
            )
            if created:
                print(f"Created DanhGia for {kh.HoTenKH} on {ngay_danh_gia} for HoaDon {hd.pk}")
            else:
                print(f"DanhGia for {kh.HoTenKH} on {ngay_danh_gia} for HoaDon {hd.pk} already exists")
            created_danh_gia.append(danh_gia_obj)

        except Exception as e:
            print(f"Error creating DanhGia for {kh_username}: {e}")

    return created_danh_gia

def create_all_sample_data():
    """Tạo tất cả dữ liệu mẫu"""
    clear_existing_data()

    users = create_users()
    khach_hang = create_khach_hang(users)
    nhan_vien = create_nhan_vien(users)
    dich_vu = create_dich_vu()

    lich_lam_viec = create_lich_lam_viec(nhan_vien)
    lich_hen = create_lich_hen(khach_hang, dich_vu, lich_lam_viec)
    hoa_don = create_hoa_don_and_chi_tiet(khach_hang, dich_vu)
    danh_gia = create_danh_gia(khach_hang, dich_vu, hoa_don)

    print("Sample data creation complete.")

if __name__ == '__main__':
    create_all_sample_data()