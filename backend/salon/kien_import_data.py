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

    # Create LichLamViec
    today = timezone.now().date()
    lich_lam_viec = []
    for nv in created_nhan_vien:
        for i in range(5):
            llv = LichLamViec.objects.create(
                MaNV=nv,
                NgayLam=today + timedelta(days=i),
                GioBatDau=datetime.strptime('08:00', '%H:%M').time(),
                GioKetThuc=datetime.strptime('22:00', '%H:%M').time()
            )
            lich_lam_viec.append(llv)

    # Create LichHen
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
        }
        
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

    # Create DanhGia for HoaDon with TrangThaiTT=1
    danh_gia_noi_dung = [
        "Dịch vụ rất tốt, nhân viên thân thiện, cắt tóc rất đẹp.",
        "Nhuộm tóc màu đẹp, gội đầu thoải mái, rất hài lòng.",
        "Cắt tóc nữ đúng ý, dịch vụ chu đáo, sẽ quay lại.",
        "Cắt tóc nam nhanh gọn, nhân viên nhiệt tình.",
        "Nhuộm tóc đều màu, gội đầu thư giãn, tuyệt vời.",
        "Cắt tóc nữ thời thượng, dịch vụ chuyên nghiệp.",
        "Cắt tóc nam đúng kiểu, gội đầu sạch sẽ, rất tốt."
    ]
    for i, hd_data in enumerate(hoa_don_data):
        if hd_data['TrangThaiTT'] == 1:
            selected_service = sample(hd_data['chi_tiet'], 1)[0]
            DanhGia.objects.create(
                MaKH=created_khach_hang[hd_data['MaKH'] - 1],
                NoiDung=danh_gia_noi_dung[i % len(danh_gia_noi_dung)],
                DiemDanhGia=randint(1, 5),
                MaDV=created_dich_vu[selected_service['MaDV'] - 1],
                MaHD=created_hoa_don[i]
            )

if __name__ == '__main__':
    create_sample_data()