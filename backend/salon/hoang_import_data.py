import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'salon.settings')  # Đổi 'salon' nếu tên project khác
django.setup()

from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime, timedelta, time
from qlKhachHang.models import KhachHang
from qlNhanVien.models import NhanVien, LichLamViec
from qlDichVu.models import DichVu
from qlHoaDon.models import HoaDon, ChiTietHoaDon
from qlLichHen.models import LichHen
from qlDanhGia.models import DanhGia
from decimal import Decimal
from random import randint, sample

def create_nhan_vien():
    # Create Users
    users = [
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

    # Create NhanVien
    nhan_vien = [
        {
            'user': created_users[0],
            'HoTenNV': 'Trương Thái Bảo',
            'SDT': '0914306897',
            'DiaChi': '03 Nguyễn Văn Linh - Hòa Cường Nam - Hải Châu - Đà Nẵng',
            'GioiTinh': 'Nam'
        },
        {
            'user': created_users[1],
            'HoTenNV': 'Hồ Văn Trường',
            'SDT': '0914306557',
            'DiaChi': '33 Mỹ An 1 - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
            'GioiTinh': 'Nam'
        }
    ]

    created_nhan_vien = []
    for nv in nhan_vien:
        nhan_vien_obj = NhanVien.objects.create(**nv)
        created_nhan_vien.append(nhan_vien_obj)
    
    return created_nhan_vien

def create_lich_lam_viec(nhan_vien):
    # Tạo lịch làm việc cho nhân viên 1 (Trương Thái Bảo)
    lich_lam_viec_nv1 = [
        {'NgayLam': datetime(2025, 5, 27).date(), 'GioBatDau': time(8, 0), 'GioKetThuc': time(12, 0)},
        {'NgayLam': datetime(2025, 5, 28).date(), 'GioBatDau': time(12, 0), 'GioKetThuc': time(17, 0)},
        {'NgayLam': datetime(2025, 5, 29).date(), 'GioBatDau': time(8, 0), 'GioKetThuc': time(12, 0)},
        {'NgayLam': datetime(2025, 5, 30).date(), 'GioBatDau': time(17, 0), 'GioKetThuc': time(22, 0)},
        {'NgayLam': datetime(2025, 5, 31).date(), 'GioBatDau': time(8, 0), 'GioKetThuc': time(17, 0)},
        {'NgayLam': datetime(2025, 6, 1).date(), 'GioBatDau': time(12, 0), 'GioKetThuc': time(17, 0)},
    ]

    # Tạo lịch làm việc cho nhân viên 2 (Hồ Văn Trường)
    lich_lam_viec_nv2 = [
        {'NgayLam': datetime(2025, 5, 27).date(), 'GioBatDau': time(17, 0), 'GioKetThuc': time(22, 0)},
        {'NgayLam': datetime(2025, 5, 28).date(), 'GioBatDau': time(8, 0), 'GioKetThuc': time(17, 0)},
        {'NgayLam': datetime(2025, 5, 29).date(), 'GioBatDau': time(17, 0), 'GioKetThuc': time(22, 0)},
        {'NgayLam': datetime(2025, 5, 30).date(), 'GioBatDau': time(8, 0), 'GioKetThuc': time(12, 0)},
        {'NgayLam': datetime(2025, 5, 31).date(), 'GioBatDau': time(12, 0), 'GioKetThuc': time(17, 0)},
        {'NgayLam': datetime(2025, 6, 1).date(), 'GioBatDau': time(8, 0), 'GioKetThuc': time(12, 0)},
    ]

    # Tạo lịch làm việc cho cả hai nhân viên
    created_llv = []
    for llv in lich_lam_viec_nv1:
        llv_obj = LichLamViec.objects.create(MaNV=nhan_vien[0], **llv)
        created_llv.append(llv_obj)
    
    for llv in lich_lam_viec_nv2:
        llv_obj = LichLamViec.objects.create(MaNV=nhan_vien[1], **llv)
        created_llv.append(llv_obj)
    
    return created_llv

def create_sample_data():
    # Tạo nhân viên và lịch làm việc
    nhan_vien = create_nhan_vien()
    lich_lam_viec = create_lich_lam_viec(nhan_vien)

    # Create Users (Giữ lại user cho khách hàng)
    user_giang = User.objects.create_user(
        username='nguyentruonggiang',
        password='hoang12345',
        email='giang@gmail.com'
    )
    user_nhan = User.objects.create_user(
        username='leducnhan',
        password='hoang12345',
        email='nhan@gmail.com'
    )

    # Create KhachHang (Tạo thủ công 2 khách hàng)
    kh_giang = KhachHang.objects.create(
        user=user_giang,
        HoTenKH='Nguyễn Trường Giang',
        SDT='0914309797',
        Email='giang@gmail.com',
        DiaChi='04 Mỹ An 7 - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
        AnhDaiDien='https://res.cloudinary.com/de3vts9dv/image/upload/v1748193677/xv4wywqna7ji686plj8p.jpg'
    )
    kh_nhan = KhachHang.objects.create(
        user=user_nhan,
        HoTenKH='Lê Đức Nhân',
        SDT='0914303897',
        Email='nhan@gmail.com',
        DiaChi='14 Mỹ An 3 - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
        AnhDaiDien='https://res.cloudinary.com/de3vts9dv/image/upload/v1748193646/k1ymuierlisa4dzk3pg8.jpg'
    )

    # Create DichVu (Tạo thủ công 2 dịch vụ)
    dv_nhuom = DichVu.objects.create(
        TenDV='Nhuộm tóc (Tẩy)',
        MoTa='Tẩy tóc và nhuộm những màu tóc tẩy hot trend 2025',
        GiaTien=Decimal('500000'),
        ThoiGianLamDV=120,
        AnhDaiDien='https://res.cloudinary.com/de3vts9dv/image/upload/v1748192502/mi2twthc5sdqboc50msr.jpg'
    )
    dv_goi = DichVu.objects.create(
        TenDV='Gội đầu dưỡng sinh',
        MoTa='Bao gồm gội đầu bằng dầu gội chuyên dụng, đắp mặt nạ, hút mụn',
        GiaTien=Decimal('150000'),
        ThoiGianLamDV=30,
        AnhDaiDien='https://res.cloudinary.com/de3vts9dv/image/upload/v1748194666/ydefmyvjcz2cxadle2ah.jpg'
    )

    # Create LichHen (Tạo thủ công 5 lịch hẹn)
    try:
        # Lấy các lịch làm việc đã tạo
        llv_1 = lich_lam_viec[0]  # 2025-05-27 NV 1, 08:00-12:00
        llv_3 = lich_lam_viec[2]  # 2025-05-29 NV 1, 08:00-12:00
        llv_5 = lich_lam_viec[4]  # 2025-05-31 NV 1, 08:00-17:00
        llv_7 = lich_lam_viec[6]  # 2025-05-27 NV 2, 17:00-22:00
        llv_9 = lich_lam_viec[8]  # 2025-05-29 NV 2, 17:00-22:00

        # Lịch hẹn 1: Giang đặt Nhuộm tóc với Bảo (MaNV 1) ngày 2025-05-27, khung 8:00-12:00 (MaLLV 1)
        LichHen.objects.create(
            MaKH=kh_giang,
            MaDV=dv_nhuom,
            MaLLV=llv_1, 
            NgayDatLich=llv_1.NgayLam,
            GioDatLich=datetime.combine(llv_1.NgayLam, time(9, 0)).time(),
            GioKhachDen=datetime.combine(llv_1.NgayLam, time(10, 0)).time(),
            TrangThai=1, # Đã xác nhận
            GhiChu="Khách muốn nhuộm màu xám khói"
        )

        # Lịch hẹn 2: Nhân đặt Gội đầu với Trường (MaNV 2) ngày 2025-05-27, khung 17:00-22:00 (MaLLV 7)
        LichHen.objects.create(
            MaKH=kh_nhan,
            MaDV=dv_goi,
            MaLLV=llv_7, 
            NgayDatLich=llv_7.NgayLam,
            GioDatLich=datetime.combine(llv_7.NgayLam, time(18, 30)).time(),
            GioKhachDen=datetime.combine(llv_7.NgayLam, time(20, 30)).time(),
            TrangThai=1, # Đã xác nhận
            GhiChu="Gội đầu thư giãn"
        )
        
        # Lịch hẹn 3: Giang đặt Gội đầu với Bảo (MaNV 1) ngày 2025-05-29, khung 8:00-12:00 (MaLLV 3)
        LichHen.objects.create(
            MaKH=kh_giang,
            MaDV=dv_goi,
            MaLLV=llv_3, 
            NgayDatLich=llv_3.NgayLam,
            GioDatLich=datetime.combine(llv_3.NgayLam, time(10, 0)).time(),
            GioKhachDen=datetime.combine(llv_3.NgayLam, time(12, 0)).time(),
            TrangThai=0, # Chờ xác nhận
            GhiChu="Gội đầu + hút mụn"
        )

        # Lịch hẹn 4: Nhân đặt Nhuộm tóc với Trường (MaNV 2) ngày 2025-05-29, khung 17:00-22:00 (MaLLV 9)
        LichHen.objects.create(
            MaKH=kh_nhan,
            MaDV=dv_nhuom,
            MaLLV=llv_9, 
            NgayDatLich=llv_9.NgayLam,
            GioDatLich=datetime.combine(llv_9.NgayLam, time(19, 0)).time(),
            GioKhachDen=datetime.combine(llv_9.NgayLam, time(19, 30)).time(),
            TrangThai=1, # Đã xác nhận
            GhiChu="Nhuộm màu nâu khói"
        )

        # Lịch hẹn 5: Giang đặt Nhuộm tóc với Bảo (MaNV 1) ngày 2025-05-31, khung 8:00-17:00 (MaLLV 5)
        LichHen.objects.create(
            MaKH=kh_giang,
            MaDV=dv_nhuom,
            MaLLV=llv_5, 
            NgayDatLich=llv_5.NgayLam,
            GioDatLich=datetime.combine(llv_5.NgayLam, time(10, 30)).time(),
            GioKhachDen=datetime.combine(llv_5.NgayLam, time(12, 30)).time(),
            TrangThai=0, # Chờ xác nhận
            GhiChu="Tẩy và nhuộm bạch kim"
        )

    except Exception as e:
        print(f"Lỗi khi tạo lịch hẹn: {e}")

    # Create HoaDon (Tạo thủ công hóa đơn)
    # Sử dụng timezone-aware datetime cho ngày lập và thời gian thanh toán
    
    # 3 Hóa đơn bình thường (không đánh giá)
    try:
        # Hóa đơn B1: Giang, Dịch vụ Gội đầu (Đã thanh toán)
        hdb1_ngay_lap = timezone.make_aware(datetime(2024, 6, 5))
        hdb1_thoi_gian_tt = timezone.make_aware(datetime(2024, 6, 5, 10, 15, 0))
        hdb1 = HoaDon.objects.create(
            MaKH=kh_giang,
            TongTien=Decimal('150000'),
            NgayLapHD=hdb1_ngay_lap,
            SoTienThanhToan=Decimal('150000'),
            HinhThucThanhToan=1, # Tiền mặt
            ThoiGianThanhToan=hdb1_thoi_gian_tt,
            TrangThaiTT=1, # Đã thanh toán
            TrangThaiHT=1 # Đã hoàn thành
        )
        ChiTietHoaDon.objects.create(
            MaHD=hdb1,
            MaDV=dv_goi,
            ThanhTien=Decimal('150000'),
            SoLuong=1
        )

        # Hóa đơn B2: Nhân, Dịch vụ Nhuộm tóc (Đã thanh toán)
        hdb2_ngay_lap = timezone.make_aware(datetime(2024, 6, 7))
        hdb2_thoi_gian_tt = timezone.make_aware(datetime(2024, 6, 7, 16, 45, 0))
        hdb2 = HoaDon.objects.create(
            MaKH=kh_nhan,
            TongTien=Decimal('500000'),
            NgayLapHD=hdb2_ngay_lap,
            SoTienThanhToan=Decimal('500000'),
            HinhThucThanhToan=0, # Chuyển khoản NH
            ThoiGianThanhToan=hdb2_thoi_gian_tt,
            TrangThaiTT=1, # Đã thanh toán
            TrangThaiHT=1 # Đã hoàn thành
        )
        ChiTietHoaDon.objects.create(
            MaHD=hdb2,
            MaDV=dv_nhuom,
            ThanhTien=Decimal('500000'),
            SoLuong=1
        )
        
        # Hóa đơn B3: Giang, Dịch vụ Nhuộm tóc + Gội đầu (Chưa thanh toán)
        hdb3_ngay_lap = timezone.make_aware(datetime(2024, 6, 8))
        hdb3 = HoaDon.objects.create(
            MaKH=kh_giang,
            TongTien=Decimal('650000'),
            NgayLapHD=hdb3_ngay_lap,
            SoTienThanhToan=Decimal('650000'),
            HinhThucThanhToan=2, # Khác
            ThoiGianThanhToan=timezone.make_aware(datetime(2024, 6, 8, 14, 0, 0)), # Thời gian thanh toán trong quá khứ
            TrangThaiTT=1, # Đã thanh toán
            TrangThaiHT=1 # Đã hoàn thành
        )
        ChiTietHoaDon.objects.create(
            MaHD=hdb3,
            MaDV=dv_nhuom,
            ThanhTien=Decimal('500000'),
            SoLuong=1
        )
        ChiTietHoaDon.objects.create(
            MaHD=hdb3,
            MaDV=dv_goi,
            ThanhTien=Decimal('150000'),
            SoLuong=1
        )

    except Exception as e:
        print(f"Lỗi khi tạo hóa đơn bình thường: {e}")

    # 5 Hóa đơn kèm đánh giá
    try:
        # Hóa đơn Đ1: Nhân, Nhuộm tóc + Gội đầu (Đã thanh toán, có đánh giá)
        hde1_ngay_lap = timezone.make_aware(datetime(2024, 5, 10))
        hde1_thoi_gian_tt = timezone.make_aware(datetime(2024, 5, 10, 11, 0, 0))
        hde1 = HoaDon.objects.create(
            MaKH=kh_nhan,
            TongTien=Decimal('650000'),
            NgayLapHD=hde1_ngay_lap,
            SoTienThanhToan=Decimal('650000'),
            HinhThucThanhToan=0, # Chuyển khoản NH
            ThoiGianThanhToan=hde1_thoi_gian_tt,
            TrangThaiTT=1, # Đã thanh toán
            TrangThaiHT=1 # Đã hoàn thành
        )
        ChiTietHoaDon.objects.create(
            MaHD=hde1,
            MaDV=dv_nhuom,
            ThanhTien=Decimal('500000'),
            SoLuong=1
        )
        ChiTietHoaDon.objects.create(
            MaHD=hde1,
            MaDV=dv_goi,
            ThanhTien=Decimal('150000'),
            SoLuong=1
        )
        DanhGia.objects.create(
            MaKH=kh_nhan,
            NgayDanhGia=hde1_thoi_gian_tt.date(), # Ngày đánh giá
            NoiDung="Trải nghiệm tuyệt vời, nhân viên nhiệt tình, làm tóc ưng ý!",
            DiemDanhGia=5,
            MaDV=dv_nhuom, 
            MaHD=hde1
        )

        # Hóa đơn Đ2: Giang, Gội đầu (Đã thanh toán, có đánh giá)
        hde2_ngay_lap = timezone.make_aware(datetime(2024, 5, 12))
        hde2_thoi_gian_tt = timezone.make_aware(datetime(2024, 5, 12, 14, 0, 0))
        hde2 = HoaDon.objects.create(
            MaKH=kh_giang,
            TongTien=Decimal('150000'),
            NgayLapHD=hde2_ngay_lap,
            SoTienThanhToan=Decimal('150000'),
            HinhThucThanhToan=1, # Tiền mặt
            ThoiGianThanhToan=hde2_thoi_gian_tt,
            TrangThaiTT=1, # Đã thanh toán
            TrangThaiHT=1 # Đã hoàn thành
        )
        ChiTietHoaDon.objects.create(
            MaHD=hde2,
            MaDV=dv_goi,
            ThanhTien=Decimal('150000'),
            SoLuong=1
        )
        DanhGia.objects.create(
            MaKH=kh_giang,
            NgayDanhGia=hde2_thoi_gian_tt.date(), # Ngày đánh giá
            NoiDung="Gội đầu dưỡng sinh rất thư giãn, sẽ giới thiệu bạn bè.",
            DiemDanhGia=4,
            MaDV=dv_goi, 
            MaHD=hde2
        )

        # Hóa đơn Đ3: Nhân, Nhuộm tóc (Đã thanh toán, có đánh giá)
        hde3_ngay_lap = timezone.make_aware(datetime(2024, 5, 18))
        hde3_thoi_gian_tt = timezone.make_aware(datetime(2024, 5, 18, 10, 0, 0))
        hde3 = HoaDon.objects.create(
            MaKH=kh_nhan,
            TongTien=Decimal('500000'),
            NgayLapHD=hde3_ngay_lap,
            SoTienThanhToan=Decimal('500000'),
            HinhThucThanhToan=2, # Khác
            ThoiGianThanhToan=hde3_thoi_gian_tt,
            TrangThaiTT=1, # Đã thanh toán
            TrangThaiHT=1 # Hoàn thành dịch vụ
        )
        ChiTietHoaDon.objects.create(
            MaHD=hde3,
            MaDV=dv_nhuom,
            ThanhTien=Decimal('500000'),
            SoLuong=1
        )
        DanhGia.objects.create(
            MaKH=kh_nhan,
            NgayDanhGia=hde3_thoi_gian_tt.date(), # Ngày đánh giá
            NoiDung="Màu tóc đẹp nhưng dịch vụ hơi chậm.",
            DiemDanhGia=3,
            MaDV=dv_nhuom, 
            MaHD=hde3
        )

        # Hóa đơn Đ4: Giang, Nhuộm tóc + Gội đầu (Đã thanh toán, có đánh giá)
        hde4_ngay_lap = timezone.make_aware(datetime(2024, 5, 21))
        hde4_thoi_gian_tt = timezone.make_aware(datetime(2024, 5, 21, 17, 30, 0))
        hde4 = HoaDon.objects.create(
            MaKH=kh_giang,
            TongTien=Decimal('650000'),
            NgayLapHD=hde4_ngay_lap,
            SoTienThanhToan=Decimal('650000'),
            HinhThucThanhToan=1, # Tiền mặt
            ThoiGianThanhToan=hde4_thoi_gian_tt,
            TrangThaiTT=1, # Đã thanh toán
            TrangThaiHT=1 # Đã hoàn thành
        )
        ChiTietHoaDon.objects.create(
            MaHD=hde4,
            MaDV=dv_nhuom,
            ThanhTien=Decimal('500000'),
            SoLuong=1
        )
        ChiTietHoaDon.objects.create(
            MaHD=hde4,
            MaDV=dv_goi,
            ThanhTien=Decimal('150000'),
            SoLuong=1
        )
        DanhGia.objects.create(
            MaKH=kh_giang,
            NgayDanhGia=hde4_thoi_gian_tt.date(), # Ngày đánh giá
            NoiDung="Rất ưng ý với kiểu tóc mới, cảm ơn nhân viên.",
            DiemDanhGia=5,
            MaDV=dv_nhuom, 
            MaHD=hde4
        )

        # Hóa đơn Đ5: Nhân, Gội đầu (Đã thanh toán, có đánh giá)
        hde5_ngay_lap = timezone.make_aware(datetime(2024, 5, 24))
        hde5_thoi_gian_tt = timezone.make_aware(datetime(2024, 5, 24, 9, 0, 0))
        hde5 = HoaDon.objects.create(
            MaKH=kh_nhan,
            TongTien=Decimal('150000'),
            NgayLapHD=hde5_ngay_lap,
            SoTienThanhToan=Decimal('150000'),
            HinhThucThanhToan=0, # Chuyển khoản NH
            ThoiGianThanhToan=hde5_thoi_gian_tt,
            TrangThaiTT=1, # Đã thanh toán
            TrangThaiHT=1 # Đã hoàn thành
        )
        ChiTietHoaDon.objects.create(
            MaHD=hde5,
            MaDV=dv_goi,
            ThanhTien=Decimal('150000'),
            SoLuong=1
        )
        DanhGia.objects.create(
            MaKH=kh_nhan,
            NgayDanhGia=hde5_thoi_gian_tt.date(), # Ngày đánh giá
            NoiDung="Dịch vụ gội đầu tốt, nhân viên chu đáo.",
            DiemDanhGia=4,
            MaDV=dv_goi,
            MaHD=hde5
        )

    except Exception as e:
        print(f"Lỗi khi tạo hóa đơn kèm đánh giá: {e}")

if __name__ == '__main__':
    create_sample_data() 
