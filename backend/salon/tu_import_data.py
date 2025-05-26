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
        {'username': 'nguyenanhduc', 'password': 'duc12345', 'email': 'duc@gmail.com'},
        {'username': 'nguyenanhtu', 'password': 'tu12345', 'email': 'tu@gmail.com'},
        {'username': 'lytieulong', 'password': 'long12345', 'email': 'long@gmail.com'},
        {'username': 'tranminhhieu', 'password': 'hieu12345', 'email': 'hieu@gmail.com'},
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
            'HoTenKH': 'Nguyễn Anh Đức',
            'SDT': '0914387397',
            'Email': 'duc@gmail.com',
            'DiaChi': '16 Lương Văn Can - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
            'AnhDaiDien': 'https://res.cloudinary.com/de3vts9dv/image/upload/v1748229683/ekwowlx8ouxttuyf4yji.jpg'
        },
        {
            'user': created_users[1],
            'HoTenKH': 'Nguyễn Anh Tú',
            'SDT': '0989997567',
            'Email': 'tu@gmail.com',
            'DiaChi': '22 Cao Bá Đạt - Hòa Châu - Hòa Vang - Đà Nẵng',
            'AnhDaiDien': 'https://res.cloudinary.com/de3vts9dv/image/upload/v1748229875/xv25z1dbgornnprvmry7.jpg'
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
            'HoTenNV': 'Lý Tiểu Long',
            'SDT': '0914306892',
            'DiaChi': '03 Nguyễn Văn Trỗi - Hòa Cường Bắc - Hải Châu - Đà Nẵng',
            'GioiTinh': 'Nam'
        },
        {
            'user': created_users[3],
            'HoTenNV': 'Trần Minh Hiếu',
            'SDT': '0914306555',
            'DiaChi': '16 Huỳnh Thúc Kháng - An Hải - Sơn Trà - Đà Nẵng',
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
            'TenDV': 'Cắt tóc cơ bản',
            'MoTa': 'Cắt tóc bằng bàn tay của những nghệ nhân đẳng cấp thế giới',
            'GiaTien': Decimal('100000.00'),
            'ThoiGianLamDV': 60,
            'AnhDaiDien': 'https://res.cloudinary.com/de3vts9dv/image/upload/v1748229926/aipjkunvaqdmqncrwvb8.jpg'
        },
        {
            'TenDV': 'Massage vai gáy',
            'MoTa': 'Massage thư giãn giúp giải tỏa căng thẳng',
            'GiaTien': Decimal('500000.00'),
            'ThoiGianLamDV': 30,
            'AnhDaiDien': 'https://res.cloudinary.com/de3vts9dv/image/upload/v1748229775/joy2reofeuaiyqjqdmbc.jpg'
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
    gio_bat_dau_list = ['08:00', '09:30', '12:00', '15:00', '20:00']
    ghi_chu_list = [
        "Súc bình xăng con",
        "Massage vùng khuỷu tay",
        "Massage vùng cổ    ",
        "Cắt tóc chất",
        "Massage vùng bụng"
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
        "Chán quá chán!",
        "Tôi chưa hài lòng với chất lượng.",
        "Quá là tuyệt vời cho một lần cắt tóc!",
        "Giá cả hợp lý.",
        "Nhân viên rất tận tâm, tạo cho tôi cảm giác thoải mái."
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