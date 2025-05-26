import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'salon.settings')
django.setup()

from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime, timedelta
from qlKhachHang.models import KhachHang
from qlNhanVien.models import NhanVien, LichLamViec
from qlDichVu.models import DichVu
from qlHoaDon.models import HoaDon, ChiTietHoaDon
from qlLichHen.models import LichHen
from qlDanhGia.models import DanhGia
from decimal import Decimal
from random import randint, sample

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
        user = User.objects.create_user(
            username=user_data['username'],
            password=user_data['password'],
            email=user_data['email']
        )
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
        customer = KhachHang.objects.create(**kh)
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
        staff = NhanVien.objects.create(**nv)
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

    # Create LichLamViec
    today = timezone.now().date()
    lich_lam_viec = []
    for nv in created_nhan_vien:
        for i in range(5):
            llv = LichLamViec.objects.create(
                MaNV=nv,
                NgayLam=today + timedelta(days=i),
                GioBatDau=datetime.strptime('09:00', '%H:%M').time(),
                GioKetThuc=datetime.strptime('21:00', '%H:%M').time()
            )
            lich_lam_viec.append(llv)

    # Create LichHen
    lich_hen = []
    gio_bat_dau_list = ['09:00', '11:00', '13:00', '15:00', '16:00']
    ghi_chu_list = [
        "Cắt tóc nam thời trang",
        "Uốn tóc nữ kiểu mới",
        "Cắt tóc và tư vấn kiểu",
        "Uốn tóc và chăm sóc",
        "Cắt tóc, tạo kiểu nam"
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

    # Create unique normal bills (no review)
    hoa_don_normal = []
    for i in range(3):
        num_services = randint(1, 2)
        dv_list = sample(created_dich_vu, num_services)
        so_luong_list = [randint(1, 3) for _ in range(num_services)]
        tong_tien = sum(dv.GiaTien * so_luong for dv, so_luong in zip(dv_list, so_luong_list))
        hd = HoaDon.objects.create(
            MaKH=created_khach_hang[i % 2],
            TongTien=tong_tien,
            NgayLapHD=timezone.now() - timedelta(days=i),
            SoTienThanhToan=tong_tien,
            HinhThucThanhToan=i % 3,
            ThoiGianThanhToan=timezone.now() - timedelta(days=i),
            TrangThaiTT=1,
            TrangThaiHT=1
        )
        for dv, so_luong in zip(dv_list, so_luong_list):
            ChiTietHoaDon.objects.create(
                MaHD=hd,
                MaDV=dv,
                ThanhTien=dv.GiaTien * so_luong,
                SoLuong=so_luong
            )
        hoa_don_normal.append(hd)

    # Create unique bills with review
    hoa_don_with_rating = []
    danh_gia_noi_dung = [
        "Nhân viên phục vụ rất chuyên nghiệp và nhiệt tình.",
        "Chất lượng dịch vụ tốt, giá cả hợp lý.",
        "Không gian salon rộng rãi, thoáng mát.",
        "Kỹ thuật viên có tay nghề cao.",
        "Sẽ quay lại sử dụng dịch vụ."
    ]
    for i in range(5):
        num_services = randint(1, 2)
        dv_list = sample(created_dich_vu, num_services)
        so_luong_list = [randint(1, 3) for _ in range(num_services)]
        tong_tien = sum(dv.GiaTien * so_luong for dv, so_luong in zip(dv_list, so_luong_list))
        hd = HoaDon.objects.create(
            MaKH=created_khach_hang[i % 2],
            TongTien=tong_tien,
            NgayLapHD=timezone.now() - timedelta(days=i+3),
            SoTienThanhToan=tong_tien,
            HinhThucThanhToan=i % 3,
            ThoiGianThanhToan=timezone.now() - timedelta(days=i+3),
            TrangThaiTT=1,
            TrangThaiHT=1
        )
        chi_tiet_objs = []
        for dv, so_luong in zip(dv_list, so_luong_list):
            ct = ChiTietHoaDon.objects.create(
                MaHD=hd,
                MaDV=dv,
                ThanhTien=dv.GiaTien * so_luong,
                SoLuong=so_luong
            )
            chi_tiet_objs.append(ct)
        DanhGia.objects.create(
            MaKH=hd.MaKH,
            NoiDung=danh_gia_noi_dung[i],
            DiemDanhGia=5 if i % 2 == 0 else 4,
            MaDV=chi_tiet_objs[0].MaDV,
            MaHD=hd
        )
        hoa_don_with_rating.append(hd)

if __name__ == '__main__':
    create_sample_data() 