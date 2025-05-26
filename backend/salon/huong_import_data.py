import os
import django
from datetime import datetime, timedelta
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
        {'username': 'phamminhhoang', 'password': 'hoang12345', 'email': 'hoang@gmail.com'},
        {'username': 'nguyenvananh', 'password': 'hoang12345', 'email': 'anh@gmail.com'},
        {'username': 'tranthithuy', 'password': 'hoang12345', 'email': 'thuy@gmail.com'},
        {'username': 'levanhung', 'password': 'hoang12345', 'email': 'hung@gmail.com'},
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
            'HoTenKH': 'Phạm Minh Hoàng',
            'SDT': '0987654321',
            'Email': 'hoang@gmail.com',
            'DiaChi': '123 Nguyễn Văn Linh - Hải Châu - Đà Nẵng',
            'AnhDaiDien': 'https://res.cloudinary.com/due447rz2/image/upload/v1748267513/phamminhhoang_awlkwu.jpg'
        },
        {
            'user': created_users[1],
            'HoTenKH': 'Nguyễn Văn Anh',
            'SDT': '0987654322',
            'Email': 'anh@gmail.com',
            'DiaChi': '456 Lê Duẩn - Thanh Khê - Đà Nẵng',
            'AnhDaiDien': 'https://res.cloudinary.com/due447rz2/image/upload/v1748267588/vananh_poao46.jpg'
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
            'HoTenNV': 'Trần Thị Thủy',
            'SDT': '0987654323',
            'DiaChi': '789 Ngô Quyền - Sơn Trà - Đà Nẵng',
            'GioiTinh': 'Nữ'
        },
        {
            'user': created_users[3],
            'HoTenNV': 'Lê Văn Hùng',
            'SDT': '0987654324',
            'DiaChi': '321 Trần Phú - Hải Châu - Đà Nẵng',
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
        }
    ]

    created_dich_vu = []
    for dv in dich_vu:
        service = DichVu.objects.create(**dv)
        created_dich_vu.append(service)

    # Create LichLamViec: nhập dữ liệu cụ thể (21 ngày)
    lich_lam_viec_data = [
        # NV1
        (1, '2025-06-02', '12:00', '17:00'),
        (1, '2025-06-03', '08:00', '12:00'),
        (1, '2025-06-04', '17:00', '22:00'),
        (1, '2025-06-05', '08:00', '12:00'),
        (1, '2025-06-06', '12:00', '17:00'),
        (1, '2025-06-07', '12:00', '17:00'),
        (1, '2025-06-08', '17:00', '22:00'),
        (1, '2025-06-09', '08:00', '12:00'),
        (1, '2025-06-10', '17:00', '22:00'),
        (1, '2025-06-11', '08:00', '12:00'),
        (1, '2025-06-12', '12:00', '17:00'),
        (1, '2025-06-13', '12:00', '17:00'),
        (1, '2025-06-14', '17:00', '22:00'),
        (1, '2025-06-15', '08:00', '12:00'),
        (1, '2025-06-16', '12:00', '17:00'),
        (1, '2025-06-17', '12:00', '17:00'),
        (1, '2025-06-18', '17:00', '22:00'),
        (1, '2025-06-19', '08:00', '12:00'),
        (1, '2025-06-20', '17:00', '22:00'),
        (1, '2025-06-21', '12:00', '17:00'),
        (1, '2025-06-22', '08:00', '12:00'),
        # NV2
        (2, '2025-06-02', '08:00', '12:00'),
        (2, '2025-06-03', '12:00', '17:00'),
        (2, '2025-06-04', '17:00', '22:00'),
        (2, '2025-06-05', '08:00', '12:00'),
        (2, '2025-06-06', '12:00', '17:00'),
        (2, '2025-06-07', '17:00', '22:00'),
        (2, '2025-06-08', '08:00', '12:00'),
        (2, '2025-06-09', '17:00', '22:00'),
        (2, '2025-06-10', '08:00', '12:00'),
        (2, '2025-06-11', '12:00', '17:00'),
        (2, '2025-06-12', '17:00', '22:00'),
        (2, '2025-06-13', '08:00', '12:00'),
        (2, '2025-06-14', '17:00', '22:00'),
        (2, '2025-06-15', '08:00', '12:00'),
        (2, '2025-06-16', '12:00', '17:00'),
        (2, '2025-06-17', '17:00', '22:00'),
        (2, '2025-06-18', '08:00', '12:00'),
        (2, '2025-06-19', '17:00', '22:00'),
        (2, '2025-06-20', '08:00', '12:00'),
        (2, '2025-06-21', '12:00', '17:00'),
        (2, '2025-06-22', '17:00', '22:00'),
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
    lich_hen_data = [
        {
            'MaKH': 1, 'MaDV': 1, 'MaLLV': 1,
            'NgayDatLich': '2025-06-02', 'GioDatLich': '09:00', 'GioKhachDen': '09:00',
            'TrangThai': 1, 'GhiChu': 'Cắt tóc nam thời trang'
        },
        {
            'MaKH': 2, 'MaDV': 2, 'MaLLV': 22,
            'NgayDatLich': '2025-06-03', 'GioDatLich': '11:00', 'GioKhachDen': '11:00',
            'TrangThai': 1, 'GhiChu': 'Uốn tóc nam kiểu mới'
        },
        {
            'MaKH': 1, 'MaDV': 2, 'MaLLV': 3,
            'NgayDatLich': '2025-06-04', 'GioDatLich': '13:00', 'GioKhachDen': '13:00',
            'TrangThai': 0, 'GhiChu': 'Cắt tóc và tư vấn kiểu'
        },
        {
            'MaKH': 2, 'MaDV': 1, 'MaLLV': 25,
            'NgayDatLich': '2025-06-05', 'GioDatLich': '15:00', 'GioKhachDen': '15:00',
            'TrangThai': 1, 'GhiChu': 'Uốn tóc và chăm sóc'
        },
        {
            'MaKH': 1, 'MaDV': 1, 'MaLLV': 5,
            'NgayDatLich': '2025-06-06', 'GioDatLich': '16:00', 'GioKhachDen': '16:00',
            'TrangThai': 0, 'GhiChu': 'Cắt tóc, tạo kiểu nam'
        }
    ]

    created_lich_hen = []
    for lh_data in lich_hen_data:
        lh = LichHen.objects.create(
            MaKH=created_khach_hang[lh_data['MaKH'] - 1],
            MaDV=created_dich_vu[lh_data['MaDV'] - 1],
            MaLLV=lich_lam_viec[lh_data['MaLLV'] - 1],
            NgayDatLich=datetime.strptime(lh_data['NgayDatLich'], '%Y-%m-%d').date(),
            GioDatLich=datetime.strptime(lh_data['GioDatLich'], '%H:%M').time(),
            GioKhachDen=datetime.strptime(lh_data['GioKhachDen'], '%H:%M').time(),
            TrangThai=lh_data['TrangThai'],
            GhiChu=lh_data['GhiChu']
        )
        created_lich_hen.append(lh)

    # Create HoaDon and ChiTietHoaDon
    hoa_don_data = [
        {
            'MaKH': 1, 'TongTien': Decimal('200000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 25, 10, 0)),
            'SoTienThanhToan': Decimal('200000.00'), 'HinhThucThanhToan': 1,
            'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'MaDV': 1, 'ThanhTien': Decimal('200000.00'), 'SoLuong': 1}
            ]
        },
        {
            'MaKH': 2, 'TongTien': Decimal('800000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 25, 12, 0)),
            'SoTienThanhToan': Decimal('800000.00'), 'HinhThucThanhToan': 0,
            'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'MaDV': 2, 'ThanhTien': Decimal('800000.00'), 'SoLuong': 1}
            ]
        },
        {
            'MaKH': 1, 'TongTien': Decimal('1000000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 25, 14, 0)),
            'SoTienThanhToan': Decimal('1000000.00'), 'HinhThucThanhToan': 2,
            'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'MaDV': 1, 'ThanhTien': Decimal('200000.00'), 'SoLuong': 1},
                {'MaDV': 2, 'ThanhTien': Decimal('800000.00'), 'SoLuong': 1}
            ]
        },
        {
            'MaKH': 2, 'TongTien': Decimal('400000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 26, 9, 0)),
            'SoTienThanhToan': Decimal('400000.00'), 'HinhThucThanhToan': 1,
            'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'MaDV': 1, 'ThanhTien': Decimal('200000.00'), 'SoLuong': 2}
            ]
        },
        {
            'MaKH': 1, 'TongTien': Decimal('1600000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 26, 15, 0)),
            'SoTienThanhToan': Decimal('1600000.00'), 'HinhThucThanhToan': 0,
            'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'MaDV': 2, 'ThanhTien': Decimal('800000.00'), 'SoLuong': 2}
            ]
        },
        {
            'MaKH': 2, 'TongTien': Decimal('600000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 27, 11, 0)),
            'SoTienThanhToan': Decimal('600000.00'), 'HinhThucThanhToan': 1,
            'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'MaDV': 1, 'ThanhTien': Decimal('200000.00'), 'SoLuong': 3}
            ]
        },
        {
            'MaKH': 1, 'TongTien': Decimal('2400000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 27, 16, 0)),
            'SoTienThanhToan': Decimal('2400000.00'), 'HinhThucThanhToan': 2,
            'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'MaDV': 2, 'ThanhTien': Decimal('800000.00'), 'SoLuong': 3}
            ]
        },
        {
            'MaKH': 2, 'TongTien': Decimal('3000000.00'),
            'NgayLapHD': timezone.make_aware(datetime(2025, 5, 28, 14, 0)),
            'SoTienThanhToan': Decimal('3000000.00'), 'HinhThucThanhToan': 0,
            'TrangThaiTT': 1, 'TrangThaiHT': 1,
            'chi_tiet': [
                {'MaDV': 1, 'ThanhTien': Decimal('200000.00'), 'SoLuong': 3},
                {'MaDV': 2, 'ThanhTien': Decimal('800000.00'), 'SoLuong': 3}
            ]
        }
    ]

    created_hoa_don = []
    for hd_data in hoa_don_data:
        hd = HoaDon.objects.create(
            MaKH=created_khach_hang[hd_data['MaKH'] - 1],
            TongTien=hd_data['TongTien'],
            NgayLapHD=hd_data['NgayLapHD'],
            SoTienThanhToan=hd_data['SoTienThanhToan'],
            HinhThucThanhToan=hd_data['HinhThucThanhToan'],
            TrangThaiTT=hd_data['TrangThaiTT'],
            TrangThaiHT=hd_data['TrangThaiHT'],
            ThoiGianThanhToan=hd_data['NgayLapHD']
        )
        created_hoa_don.append(hd)
        for ct_data in hd_data['chi_tiet']:
            ChiTietHoaDon.objects.create(
                MaHD=hd,
                MaDV=created_dich_vu[ct_data['MaDV'] - 1],
                ThanhTien=ct_data['ThanhTien'],
                SoLuong=ct_data['SoLuong']
            )

    # Create DanhGia
    danh_gia_data = [
        {
            'MaKH': 2, 'NoiDung': 'Nhân viên phục vụ rất chuyên nghiệp và nhiệt tình.',
            'DiemDanhGia': 5, 'MaDV': 1, 'MaHD': 1
        },
        {
            'MaKH': 1, 'NoiDung': 'Chất lượng dịch vụ tốt, giá cả hợp lý.',
            'DiemDanhGia': 4, 'MaDV': 2, 'MaHD': 2
        },
        {
            'MaKH': 2, 'NoiDung': 'Không gian salon rộng rãi, thoáng mát.',
            'DiemDanhGia': 5, 'MaDV': 1, 'MaHD': 3
        },
        {
            'MaKH': 1, 'NoiDung': 'Kỹ thuật viên có tay nghề cao, cắt tóc đẹp.',
            'DiemDanhGia': 5, 'MaDV': 1, 'MaHD': 4
        },
        {
            'MaKH': 2, 'NoiDung': 'Uốn tóc đẹp, giữ nếp lâu, rất hài lòng.',
            'DiemDanhGia': 4, 'MaDV': 2, 'MaHD': 5
        }
    ]

    for dg_data in danh_gia_data:
        DanhGia.objects.create(
            MaKH=created_khach_hang[dg_data['MaKH'] - 1],
            NoiDung=dg_data['NoiDung'],
            DiemDanhGia=dg_data['DiemDanhGia'],
            MaDV=created_dich_vu[dg_data['MaDV'] - 1],
            MaHD=created_hoa_don[dg_data['MaHD'] - 1]
        )

if __name__ == '__main__':
    create_sample_data() 