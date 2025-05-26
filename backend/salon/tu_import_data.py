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
    # Xóa dữ liệu cũ để tránh lỗi trùng khóa chính hoặc unique
    DanhGia.objects.all().delete()
    ChiTietHoaDon.objects.all().delete()
    HoaDon.objects.all().delete()

    # Create Users
    users = [
        {'username': 'nguyenanhduc', 'password': 'duc12345', 'email': 'duc@gmail.com'},
        {'username': 'tranbuiquocan', 'password': 'an12345', 'email': 'an@gmail.com'},
        {'username': 'nguyenthanhtung', 'password': 'tung12345', 'email': 'tung@gmail.com'},
        {'username': 'ngovanhai', 'password': 'hai12345', 'email': 'hai@gmail.com'},
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
            'HoTenKH': 'Nguyễn Anh Đức',
            'SDT': '0914555787',
            'Email': 'ducg@gmail.com',
            'DiaChi': '22 Cao Bá Đạt - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
            'AnhDaiDien': 'https://res.cloudinary.com/de3vts9dv/image/upload/v1748229683/ekwowlx8ouxttuyf4yji.jpg'
        },
        {
            'user': created_users[1],
            'HoTenKH': 'Trần Bùi Quốc An',
            'SDT': '0914345778',
            'Email': 'an@gmail.com',
            'DiaChi': '16 Lương Văn Can - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
            'AnhDaiDien': 'https://res.cloudinary.com/de3vts9dv/image/upload/v1748229875/xv25z1dbgornnprvmry7.jpg'
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
            'HoTenNV': 'Nguyễn Thanh Tùng',
            'SDT': '091431233',
            'DiaChi': '03 Nguyễn Trương Văn - Hòa Cường Nam - Hải Châu - Đà Nẵng',
            'GioiTinh': 'Nam'
        },
        {
            'user': created_users[3],
            'HoTenNV': 'Ngô Văn Hải',
            'SDT': '091851555',
            'DiaChi': '15 Nam Kỳ Khởi Nghĩa - Hải Châu - Đà Nẵng',
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
        }
    ]

    created_dich_vu = []
    for dv in dich_vu:
        service = DichVu.objects.create(**dv)
        created_dich_vu.append(service)

    # Create LichLamViec: nhập dữ liệu cụ thể (3 tuần)
    lich_lam_viec_data = [
        (1, '2025-06-02', '08:00', '12:00'),
        (1, '2025-06-03', '12:00', '17:00'),
        (1, '2025-06-04', '17:00', '22:00'),
        (1, '2025-06-05', '08:00', '17:00'),
        (1, '2025-06-06', '12:00', '20:30'),
        (1, '2025-06-09', '13:00', '19:30'),
        (1, '2025-06-10', '08:00', '19:00'),
        (1, '2025-06-11', '08:00', '21:30'),
        (1, '2025-06-12', '12:00', '17:00'),
        (1, '2025-06-13', '17:00', '22:00'),
        (1, '2025-06-16', '08:00', '20:00'),
        (1, '2025-06-17', '08:00', '21:00'),
        (1, '2025-06-18', '08:00', '20:30'),
        (2, '2025-06-02', '08:00', '17:00'),
        (2, '2025-06-03', '08:00', '18:00'),
        (2, '2025-06-05', '08:00', '21:00'),
        (2, '2025-06-06', '17:00', '20:00'),
        (2, '2025-06-09', '17:00', '22:00'),
        (2, '2025-06-10', '08:00', '17:00'),
        (2, '2025-06-11', '12:00', '21:00'),
        (2, '2025-06-12', '08:00', '20:00'),
        (2, '2025-06-13', '08:00', '21:00'),
        (2, '2025-06-16', '17:00', '21:00'),
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
    gio_bat_dau_list = ['08:30', '09:30', '12:00', '14:40', '18:20']
    ghi_chu_list = [
        "Tôi muốn súc bình xăng con",
        "Tư vấn kiểu tóc hot trend 2025",
        "Cắt tóc, gội đầu",
        "Tư vấn chăm sóc tóc",
        "Cắt tóc, tạo kiểu boy phố"
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
            'MaHD': 1, 'MaKH': 1, 'TongTien': Decimal('250000.00'), 
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 1, 9, 30)), 
            'SoTienThanhToan': Decimal('250000.00'), 'HinhThucThanhToan': 0, 'TrangThaiTT': 1, 'TrangThaiHT': 0, 
            'GhiChu': 'Khách quay lại lần đầu, cắt tóc và massage.',
            'chi_tiet': [
                {'MaDV': 2, 'ThanhTien': Decimal('250000.00'), 'SoLuong': 1}
            ]
        },
        {
            'MaHD': 2, 'MaKH': 1, 'TongTien': Decimal('600000.00'), 
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 2, 11, 15)), 
            'SoTienThanhToan': Decimal('600000.00'), 'HinhThucThanhToan': 1, 'TrangThaiTT': 0, 'TrangThaiHT': 1, 
            'GhiChu': 'Cắt tóc, nhuộm highlight, gội đầu.',
            'chi_tiet': [
                {'MaDV': 1, 'ThanhTien': Decimal('300000.00'), 'SoLuong': 1},
                {'MaDV': 2, 'ThanhTien': Decimal('300000.00'), 'SoLuong': 1}
            ]
        },
        {
            'MaHD': 3, 'MaKH': 2, 'TongTien': Decimal('150000.00'), 
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 3, 13, 0)), 
            'SoTienThanhToan': Decimal('150000.00'), 'HinhThucThanhToan': 0, 'TrangThaiTT': 1, 'TrangThaiHT': 1, 
            'GhiChu': 'Gội đầu dưỡng sinh.',
            'chi_tiet': [
                {'MaDV': 2, 'ThanhTien': Decimal('150000.00'), 'SoLuong': 1}
            ]
        },
        {
            'MaHD': 4, 'MaKH': 2, 'TongTien': Decimal('450000.00'), 
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 4, 15, 45)), 
            'SoTienThanhToan': Decimal('450000.00'), 'HinhThucThanhToan': 1, 'TrangThaiTT': 0, 'TrangThaiHT': 1, 
            'GhiChu': 'Cắt tóc, tạo kiểu, massage.',
            'chi_tiet': [
                {'MaDV': 1, 'ThanhTien': Decimal('300000.00'), 'SoLuong': 1},
                {'MaDV': 2, 'ThanhTien': Decimal('150000.00'), 'SoLuong': 1}
            ]
        },
        {
            'MaHD': 5, 'MaKH': 1, 'TongTien': Decimal('300000.00'), 
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 5, 17, 20)), 
            'SoTienThanhToan': Decimal('300000.00'), 'HinhThucThanhToan': 0, 'TrangThaiTT': 1, 'TrangThaiHT': 0, 
            'GhiChu': 'Nhuộm tóc, gội đầu, tư vấn kiểu mới.',
            'chi_tiet': [
                {'MaDV': 2, 'ThanhTien': Decimal('150000.00'), 'SoLuong': 2}
            ]
        },
        {
            'MaHD': 6, 'MaKH': 2, 'TongTien': Decimal('600000.00'), 
            'NgayLapHD': timezone.make_aware(datetime(2025, 6, 6, 19, 10)), 
            'SoTienThanhToan': Decimal('600000.00'), 'HinhThucThanhToan': 1, 'TrangThaiTT': 0, 'TrangThaiHT': 1, 
            'GhiChu': 'Cắt tóc, massage, tạo kiểu.',
            'chi_tiet': [
                {'MaDV': 1, 'ThanhTien': Decimal('300000.00'), 'SoLuong': 2}
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
        'MaHD': 1,
        'MaKH': created_khach_hang[0],  # MaKH = 1
        'NgayDanhGia': date(2025, 6, 2),
        'NoiDung': "Dịch vụ tốt, nhân viên nhiệt tình, sẽ giới thiệu bạn bè.",
        'DiemDanhGia': 4,
        'MaDV': created_dich_vu[1]  # MaDV=2
    },
    {
        'MaHD': 2,
        'MaKH': created_khach_hang[0],  # MaKH = 1
        'NgayDanhGia': date(2025, 6, 3),
        'NoiDung': "Cắt tóc đẹp, không phải chờ lâu.",
        'DiemDanhGia': 5,
        'MaDV': created_dich_vu[0]  # MaDV=1
    },
    {
        'MaHD': 3,
        'MaKH': created_khach_hang[1],  # MaKH = 2
        'NgayDanhGia': date(2025, 6, 4),
        'NoiDung': "Gội đầu thư giãn, không gian sạch sẽ.",
        'DiemDanhGia': 4,
        'MaDV': created_dich_vu[1]  # MaDV=2
    },
    {
        'MaHD': 4,
        'MaKH': created_khach_hang[1],  # MaKH = 2
        'NgayDanhGia': date(2025, 6, 5),
        'NoiDung': "Tạo kiểu hợp thời, giá hợp lý.",
        'DiemDanhGia': 5,
        'MaDV': created_dich_vu[0]  # MaDV=1
    },
    {
        'MaHD': 5,
        'MaKH': created_khach_hang[0],  # MaKH = 1
        'NgayDanhGia': date(2025, 6, 6),
        'NoiDung': "Nhân viên tư vấn tận tâm, sẽ quay lại lần nữa.",
        'DiemDanhGia': 5,
        'MaDV': created_dich_vu[1]  # MaDV=2
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