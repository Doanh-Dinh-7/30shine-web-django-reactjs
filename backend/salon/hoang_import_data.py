import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'salon.settings')  # Đổi 'salon' nếu tên project khác
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
        {'username': 'nguyentruonggiang', 'password': 'hoang12345', 'email': 'giang@gmail.com'},
        {'username': 'leducnhan', 'password': 'hoang12345', 'email': 'nhan@gmail.com'},
        {'username': 'truongthaibao', 'password': 'hoang12345', 'email': 'bao@gmail.com'},
        {'username': 'hovantruong', 'password': 'hoang12345', 'email': 'truong@gmail.com'},
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
            'HoTenKH': 'Nguyễn Trường Giang',
            'SDT': '0914309797',
            'Email': 'giang@gmail.com',
            'DiaChi': '04 Mỹ An 7 - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
            'AnhDaiDien': 'https://res.cloudinary.com/de3vts9dv/image/upload/v1748193677/xv4wywqna7ji686plj8p.jpg'
        },
        {
            'user': created_users[1],
            'HoTenKH': 'Lê Đức Nhân',
            'SDT': '0914303897',
            'Email': 'nhan@gmail.com',
            'DiaChi': '14 Mỹ An 3 - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
            'AnhDaiDien': 'https://res.cloudinary.com/de3vts9dv/image/upload/v1748193646/k1ymuierlisa4dzk3pg8.jpg'
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
            'HoTenNV': 'Trương Thái Bảo',
            'SDT': '0914306897',
            'DiaChi': '03 Nguyễn Văn Linh - Hòa Cường Nam - Hải Châu - Đà Nẵng',
            'GioiTinh': 'Nam'
        },
        {
            'user': created_users[3],
            'HoTenNV': 'Hồ Văn Trường',
            'SDT': '0914306557',
            'DiaChi': '33 Mỹ An 1 - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
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
            'TenDV': 'Nhuộm tóc (Tẩy)',
            'MoTa': 'Tẩy tóc và nhuộm những màu tóc tẩy hot trend 2025',
            'GiaTien': Decimal('500000.00'),
            'ThoiGianLamDV': 120,
            'AnhDaiDien': 'https://res.cloudinary.com/de3vts9dv/image/upload/v1748192502/mi2twthc5sdqboc50msr.jpg'
        },
        {
            'TenDV': 'Gội đầu dưỡng sinh',
            'MoTa': 'Bao gồm gội đầu bằng dầu gội chuyên dụng, đắp mặt nạ, hút mụn',
            'GiaTien': Decimal('150000.00'),
            'ThoiGianLamDV': 30,
            'AnhDaiDien': 'https://res.cloudinary.com/de3vts9dv/image/upload/v1748194666/ydefmyvjcz2cxadle2ah.jpg'
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
    gio_bat_dau_list = ['08:00', '10:00', '12:00', '14:00', '17:00']
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
        # Phân bổ nhân viên đều, mỗi lịch sẽ lấy lịch làm việc của nhân viên khác nhau
        llv = lich_lam_viec[(i * 2) % len(lich_lam_viec)]
        ngay = today + timedelta(days=i)
        gio = datetime.strptime(gio_bat_dau_list[i], '%H:%M').time()
        trang_thai = randint(0, 1)
        ghi_chu = ghi_chu_list[i]
        
        # Corrected creation call - HoTenKH argument removed
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
        # Chọn ngẫu nhiên 1 hoặc 2 dịch vụ cho mỗi hóa đơn
        num_services = randint(1, 2)
        dv_list = sample(created_dich_vu, num_services)
        so_luong_list = [randint(1, 3) for _ in range(num_services)]
        tong_tien = sum(dv.GiaTien * so_luong for dv, so_luong in zip(dv_list, so_luong_list))
        hd = HoaDon.objects.create(
            MaKH=created_khach_hang[i % 2],
            TongTien=tong_tien,
            NgayLapHD=timezone.now() - timedelta(days=i),
            SoTienThanhToan=tong_tien,
            HinhThucThanhToan=i % 3,  # 0, 1, 2
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
        "Dịch vụ rất tốt, nhân viên thân thiện.",
        "Tôi hài lòng với chất lượng.",
        "Sẽ quay lại lần sau!",
        "Giá cả hợp lý, phục vụ nhanh.",
        "Không gian sạch sẽ, thoải mái."
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
        # Đánh giá dịch vụ đầu tiên trong hóa đơn
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