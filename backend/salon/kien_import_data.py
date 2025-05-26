import os
import django
from datetime import datetime, timedelta, date
from decimal import Decimal
from random import randint, sample
from django.utils import timezone  # Import timezone để xử lý múi giờ

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'salon.settings')  # Đổi 'salon' nếu tên project khác
django.setup()

from django.contrib.auth.models import User
from qlKhachHang.models import KhachHang
from qlNhanVien.models import NhanVien, LichLamViec
from qlDichVu.models import DichVu
from qlHoaDon.models import HoaDon, ChiTietHoaDon
from qlLichHen.models import LichHen
from qlDanhGia.models import DanhGia

def create_sample_data():
    # Create Users
    users = [
        {'username': 'nguyentruonggiang', 'password': 'hoang12345', 'email': 'giang@gmail.com'},
        {'username': 'leducnhan', 'password': 'hoang12345', 'email': 'nhan@gmail.com'},
        {'username': 'truongthaibao', 'password': 'hoang12345', 'email': 'bao@gmail.com'},
        {'username': 'hovantruong', 'password': 'hoang12345', 'email': 'truong@gmail.com'},
    ]

    created_users = []
    for user_data in users:
        # Check if user already exists
        if User.objects.filter(username=user_data['username']).exists():
            user = User.objects.get(username=user_data['username'])
            print(f"User {user_data['username']} already exists, skipping creation.")
        else:
            user = User.objects.create_user(
                username=user_data['username'],
                password=user_data['password'],
                email=user_data['email']
            )
            print(f"Created user {user_data['username']}.")
        created_users.append(user)

    # Create KhachHang
    khach_hang = [
        {
            'user': created_users[0],
            'HoTenKH': 'Hoàng Văn Anh',
            'SDT': '0914555797',
            'Email': 'anhg@gmail.com',
            'DiaChi': '04 An Thượng - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
            'AnhDaiDien': 'https://res.cloudinary.com/dikvlwfc5/image/upload/v1748256048/ac3snnvtnqglzitpo3ru.jpg'
        },
        {
            'user': created_users[1],
            'HoTenKH': 'Lê Đức Nhân',
            'SDT': '0914303897',
            'Email': 'nhan@gmail.com',
            'DiaChi': '14 An Thượng 3 - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
            'AnhDaiDien': 'https://res.cloudinary.com/dikvlwfc5/image/upload/v1748256254/nsw8ptkllvtkp08wzibm.jpg'
        }
    ]

    created_khach_hang = []
    for kh in khach_hang:
        
        # Check if KhachHang already exists for this user
        if KhachHang.objects.filter(user=kh['user']).exists():
            customer = KhachHang.objects.get(user=kh['user'])
            print(f"KhachHang for user {kh['user'].username} already exists, skipping creation.")
        else:
            customer = KhachHang.objects.create(**kh)
            print(f"Created KhachHang for user {kh['user'].username}.")
        created_khach_hang.append(customer)

    # Create NhanVien
    nhan_vien = [
        {
            'user': created_users[2],
            'HoTenNV': 'Nguyễn Hoàng Sang',
            'SDT': '091431237',
            'DiaChi': '03 Nguyễn Hoàng - Hòa Cường Nam - Hải Châu - Đà Nẵng',
            'GioiTinh': 'Nam'
        },
        {
            'user': created_users[3],
            'HoTenNV': 'Ngô Văn Cường',
            'SDT': '091851557',
            'DiaChi': '33 Mỹ An 5 - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
            'GioiTinh': 'Nam'
        }
    ]

    created_nhan_vien = []
    for nv in nhan_vien:
        # Check if NhanVien already exists for this user
        if NhanVien.objects.filter(user=nv['user']).exists():
            staff = NhanVien.objects.get(user=nv['user'])
            print(f"NhanVien for user {nv['user'].username} already exists, skipping creation.")
        else:
            staff = NhanVien.objects.create(**nv)
            print(f"Created NhanVien for user {nv['user'].username}.")
        created_nhan_vien.append(staff)

    # Create DichVu
    dich_vu = [
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
    for dv in dich_vu:
        service = DichVu.objects.create(**dv)
        created_dich_vu.append(service)

    # Create LichLamViec: nhập dữ liệu cụ thể (3 tuần)
    lich_lam_viec_data = [
        (1, '2025-06-02', '08:00', '18:00'),
        (1, '2025-06-03', '08:00', '19:00'),
        (1, '2025-06-04', '08:00', '20:00'),
        (1, '2025-06-05', '08:00', '20:00'),
        (1, '2025-06-06', '08:00', '20:30'),
        (1, '2025-06-09', '08:00', '19:00'),
        (1, '2025-06-10', '08:00', '19:00'),
        (1, '2025-06-11', '08:00', '20:00'),
        (1, '2025-06-12', '08:00', '20:00'),
        (1, '2025-06-13', '08:00', '21:00'),
        (1, '2025-06-16', '08:00', '20:00'),
        (1, '2025-06-17', '08:00', '21:00'),
        (1, '2025-06-18', '08:00', '20:30'),
        (2, '2025-06-02', '08:00', '17:00'),
        (2, '2025-06-03', '08:00', '18:00'),
        (2, '2025-06-05', '08:00', '21:00'),
        (2, '2025-06-06', '08:00', '20:00'),
        (2, '2025-06-09', '17:00', '22:00'),
        (2, '2025-06-10', '08:00', '20:00'),
        (2, '2025-06-11', '08:00', '21:00'),
        (2, '2025-06-12', '08:00', '20:00'),
        (2, '2025-06-13', '08:00', '21:00'),
        (2, '2025-06-16', '08:00', '21:00'),
        (2, '2025-06-17', '08:00', '20:00'),
        (2, '2025-06-18', '08:00', '19:30'),
    ]

    lich_lam_viec = []
    for manv, ngay_str, gio_bd_str, gio_kt_str in lich_lam_viec_data:
        nv_obj = created_nhan_vien[manv - 1]
        llv = LichLamViec.objects.create(
        MaNV=nv_obj,
        NgayLam=datetime.strptime(ngay_str, '%Y-%m-%d').date(),
        GioBatDau=datetime.strptime(gio_bd_str, '%H:%M').time(),
        GioKetThuc=datetime.strptime(gio_kt_str, '%H:%M').time()
    )
    lich_lam_viec.append(llv)


    # Create LichHen
    today = timezone.now().date()

    lich_hen = []
    gio_bat_dau_list = ['08:30', '10:30', '12:00', '14:40', '16:20']
    ghi_chu_list = [
        "Cắt tóc và tư vấn kiểu mới",
        "Nhuộm tóc màu thời trang",
        "Cắt tóc, gội đầu",
        "Tư vấn chăm sóc tóc",
        "Cắt tóc, tạo kiểu"
    ]
    for i in range(5):
        kh = created_khach_hang[i % len(created_khach_hang)]
        dv = created_dich_vu[i % len(created_dich_vu)]
        llv = lich_lam_viec[(i * 2) % len(lich_lam_viec)]
        ngay = today + timedelta(days=i)
        gio = datetime.strptime(gio_bat_dau_list[i], '%H:%M').time()
        trang_thai = randint(0, 1)
        ghi_chu = ghi_chu_list[i]
        
        lh = LichHen.objects.create(
            MaKH=kh,
            MaDV=dv,
            MaLLV=llv,
            NgayDatLich=ngay,
            GioDatLich=gio,
            GioKhachDen=gio,
            TrangThai=trang_thai,
            GhiChu=ghi_chu
        )
        lich_hen.append(lh)

    # Create HoaDon and ChiTietHoaDon
    hoa_don_data = [
        {
            'MaHD': 1, 'MaKH': 1, 'TongTien': Decimal('300000.00'), 
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 25, 10, 0)), 
            'SoTienThanhToan': Decimal('180000.00'), 'HinhThucThanhToan': 1, 'TrangThaiTT': 0, 'TrangThaiHT': 0, 
            'GhiChu': 'Khách hàng thường xuyên, cắt tóc và gội đầu',
            'chi_tiet': [
                {'MaDV': 1, 'ThanhTien': Decimal('300000.00'), 'SoLuong': 1}
            ]
        },
        {
            'MaHD': 2, 'MaKH': 1, 'TongTien': Decimal('150000.00'), 
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 25, 12, 0)), 
            'SoTienThanhToan': Decimal('580000.00'), 'HinhThucThanhToan': 0, 'TrangThaiTT': 1, 'TrangThaiHT': 0, 
            'GhiChu': 'Nhuộm màu nâu hạt dẻ, gội sạch',
            'chi_tiet': [
                {'MaDV': 2, 'ThanhTien': Decimal('150000.00'), 'SoLuong': 1}
            ]
        },
        {
            'MaHD': 3, 'MaKH': 2, 'TongTien': Decimal('300000.00'), 
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 25, 14, 0)), 
            'SoTienThanhToan': Decimal('300000.00'), 'HinhThucThanhToan': 1, 'TrangThaiTT': 1, 'TrangThaiHT': 1, 
            'GhiChu': 'Nhuộm tóc và cắt tóc nữ',
            'chi_tiet': [
                {'MaDV': 1, 'ThanhTien': Decimal('300000.00'), 'SoLuong': 1}
            ]
        },
        {
            'MaHD': 4, 'MaKH': 2, 'TongTien': Decimal('300000.00'), 
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 25, 14, 0)), 
            'SoTienThanhToan': Decimal('300000.00'), 'HinhThucThanhToan': 1, 'TrangThaiTT': 1, 'TrangThaiHT': 1, 
            'GhiChu': 'Nhuộm tóc và cắt tóc nữ',
            'chi_tiet': [
                {'MaDV': 2, 'ThanhTien': Decimal('300000.00'), 'SoLuong': 1}
            ]
        },
        {
            'MaHD': 5, 'MaKH': 1, 'TongTien': Decimal('450000.00'), 
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 25, 14, 0)), 
            'SoTienThanhToan': Decimal('450000.00'), 'HinhThucThanhToan': 1, 'TrangThaiTT': 1, 'TrangThaiHT': 1, 
            'GhiChu': 'Nhuộm tóc và cắt tóc nữ',
            'chi_tiet': [
                {'MaDV': 2, 'ThanhTien': Decimal('300000.00'), 'SoLuong': 1},
                {'MaDV': 1, 'ThanhTien': Decimal('150000.00'), 'SoLuong': 1}
            ]
        },
        {
            'MaHD': 6, 'MaKH': 2, 'TongTien': Decimal('750000.00'), 
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 25, 14, 0)), 
            'SoTienThanhToan': Decimal('750000.00'), 'HinhThucThanhToan': 1, 'TrangThaiTT': 1, 'TrangThaiHT': 1, 
            'GhiChu': 'Nhuộm tóc và cắt tóc nữ',
            'chi_tiet': [
                {'MaDV': 2, 'ThanhTien': Decimal('300000.00'), 'SoLuong': 2},
                {'MaDV': 1, 'ThanhTien': Decimal('150000.00'), 'SoLuong': 1}
            ]
        },
        
        
    ]

    created_hoa_don = []
    for hd_data in hoa_don_data:
        hd = HoaDon.objects.create(
            MaHD=hd_data['MaHD'],
            MaKH=created_khach_hang[hd_data['MaKH'] - 1],
            TongTien=hd_data['TongTien'],
            NgayLapHD=hd_data['NgayLapHD'],
            SoTienThanhToan=hd_data['SoTienThanhToan'],
            HinhThucThanhToan=hd_data['HinhThucThanhToan'],
            TrangThaiTT=hd_data['TrangThaiTT'],
            TrangThaiHT=hd_data['TrangThaiHT'],
            GhiChu=hd_data['GhiChu'],
            ThoiGianThanhToan=hd_data['NgayLapHD']  # Use the same aware datetime
        )
        created_hoa_don.append(hd)
        for ct_data in hd_data['chi_tiet']:
            ChiTietHoaDon.objects.create(
                MaHD=hd,
                MaDV=created_dich_vu[ct_data['MaDV'] - 1],
                ThanhTien=ct_data['ThanhTien'],
                SoLuong=ct_data['SoLuong']
            )
    #đánh giá chi tiết
    
    danh_gias_chi_tiet = [
    {
        'MaHD': 2,
        'MaKH': created_khach_hang[0],  # MaKH = 1
        'NgayDanhGia': date(2025, 5, 26),
        'NoiDung': "Nhuộm màu đẹp, nhân viên thân thiện, sẽ quay lại.",
        'DiemDanhGia': 5,
        'MaDV': created_dich_vu[1]  # MaDV=2 trong chi_tiet của HD 2
    },
    {
        'MaHD': 3,
        'MaKH': created_khach_hang[1],  # MaKH = 2
        'NgayDanhGia': date(2025, 5, 26),
        'NoiDung': "Dịch vụ chuyên nghiệp, tóc được tạo kiểu đẹp.",
        'DiemDanhGia': 5,
        'MaDV': created_dich_vu[0]  # MaDV=1 trong chi_tiet của HD 3
    },
    {
        'MaHD': 4,
        'MaKH': created_khach_hang[1],  # MaKH = 2
        'NgayDanhGia': date(2025, 5, 27),
        'NoiDung': "Tư vấn tận tâm, cắt tóc đúng ý, hài lòng.",
        'DiemDanhGia': 4,
        'MaDV': created_dich_vu[1]  # MaDV=2 trong chi_tiet của HD 4
    },
    {
        'MaHD': 5,
        'MaKH': created_khach_hang[0],  # MaKH = 1
        'NgayDanhGia': date(2025, 5, 27),
        'NoiDung': "Dịch vụ nhanh chóng, nhân viên vui vẻ, rất hài lòng.",
        'DiemDanhGia': 5,
        'MaDV': created_dich_vu[0]  # Ví dụ dịch vụ 1
    },
    {
        'MaHD': 6,
        'MaKH': created_khach_hang[0],  # MaKH = 1
        'NgayDanhGia': date(2025, 5, 28),
        'NoiDung': "Kỹ thuật nhuộm rất tốt, kết quả vượt mong đợi.",
        'DiemDanhGia': 5,
        'MaDV': created_dich_vu[1]  # Ví dụ dịch vụ 2
    }
    ]

    for dg in danh_gias_chi_tiet:
    # Tìm đối tượng HoaDon tương ứng
        hd_obj = next((hd for hd in created_hoa_don if hd.MaHD == dg['MaHD']), None)
        if hd_obj:
            DanhGia.objects.create(
                MaKH=dg['MaKH'],
                NgayDanhGia=dg['NgayDanhGia'],
                NoiDung=dg['NoiDung'],
                DiemDanhGia=dg['DiemDanhGia'],
                MaDV=dg['MaDV'],
                MaHD=hd_obj
            )

if __name__ == '__main__':
    create_sample_data()