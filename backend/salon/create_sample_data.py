import os
import django
import random
from datetime import datetime, timedelta
from django.utils import timezone


# Cấu hình Django settings trước khi import models
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'salon.settings')
django.setup()

# Import models sau khi đã cấu hình settings
from django.contrib.auth.models import User
from qlDichVu.models import DichVu
from qlKhachHang.models import KhachHang
from qlNhanVien.models import NhanVien, LichLamViec
from qlLichHen.models import LichHen
from qlHoaDon.models import HoaDon, ChiTietHoaDon
from qlDanhGia.models import DanhGia
from qlThongBao.models import ThongBao

def create_sample_data():
    # Tạo dữ liệu mẫu cho DichVu
    dich_vu_data = [
        {'TenDV': 'Cắt tóc nam', 'MoTa': 'Cắt tóc nam cơ bản', 'GiaTien': 100000, 'ThoiGianLamDV': 30},
        {'TenDV': 'Cắt tóc nữ', 'MoTa': 'Cắt tóc nữ cơ bản', 'GiaTien': 150000, 'ThoiGianLamDV': 45},
        {'TenDV': 'Nhuộm tóc', 'MoTa': 'Nhuộm tóc toàn bộ', 'GiaTien': 500000, 'ThoiGianLamDV': 120},
        {'TenDV': 'Uốn tóc', 'MoTa': 'Uốn tóc tự nhiên', 'GiaTien': 400000, 'ThoiGianLamDV': 90},
        {'TenDV': 'Gội đầu', 'MoTa': 'Gội đầu và massage', 'GiaTien': 80000, 'ThoiGianLamDV': 20},
    ]
    
    for dv in dich_vu_data:
        DichVu.objects.create(**dv)

    # Tạo users và KhachHang
    for i in range(5):
        user = User.objects.create_user(
            username=f'khachhang{i+1}',
            password='password123',
            email=f'khachhang{i+1}@example.com'
        )
        KhachHang.objects.create(
            user=user,
            HoTenKH=f'Khách hàng {i+1}',
            SDT=f'098765432{i}',
            Email=f'khachhang{i+1}@example.com'
        )

    # Tạo users và NhanVien
    for i in range(5):
        user = User.objects.create_user(
            username=f'nhanvien{i+1}',
            password='password123',
            email=f'nhanvien{i+1}@example.com'
        )
        NhanVien.objects.create(
            user=user,
            HoTenNV=f'Nhân viên {i+1}',
            SDT=f'098765432{i+5}',
            GioiTinh='Nam' if i % 2 == 0 else 'Nữ'
        )

    # Tạo LichLamViec
    nhan_viens = NhanVien.objects.all()
    for nv in nhan_viens:
        for i in range(5):
            LichLamViec.objects.create(
                MaNV=nv,
                NgayLam=datetime.now().date() + timedelta(days=i),
                GioBatDau=datetime.strptime('08:00', '%H:%M').time(),
                GioKetThuc=datetime.strptime('17:00', '%H:%M').time()
            )

    # Tạo LichHen
    khach_hangs = KhachHang.objects.all()
    dich_vus = DichVu.objects.all()
    lich_lam_viecs = LichLamViec.objects.all()
    
    for i in range(5):
        LichHen.objects.create(
            MaKH=random.choice(khach_hangs),
            MaDV=random.choice(dich_vus),
            MaLLV=random.choice(lich_lam_viecs),
            NgayDatLich=datetime.now().date() + timedelta(days=i),
            GioDatLich=datetime.strptime('09:00', '%H:%M').time(),
            TrangThai=1
        )

    hinh_thuc_tt_choices = [0, 1, 2]  # tương ứng với Chuyển khoản NH, Tiền mặt, Khác
    trang_thai_tt_choices = [0, 1, 2]
    trang_thai_ht_choices = [0, 1, 2, 3]

    for i in range(5):
        kh = random.choice(khach_hangs)
        
        ngay_lap_hd = timezone.now() - timedelta(days=random.randint(1, 30))
        thoi_gian_tt = ngay_lap_hd + timedelta(hours=random.randint(1, 48))

        # Khởi tạo hóa đơn với tiền tạm là 0
        hd = HoaDon.objects.create(
            MaKH=kh,
            TongTien=0,
            NgayLapHD=ngay_lap_hd,
            SoTienThanhToan=0,
            HinhThucThanhToan=random.choice(hinh_thuc_tt_choices),
            ThoiGianThanhToan=thoi_gian_tt,
            TrangThaiTT=random.choice(trang_thai_tt_choices),
            TrangThaiHT=random.choice(trang_thai_ht_choices),
            GhiChu=f"Hoá đơn mẫu số {i+1}"
        )
        
        # Tạo chi tiết hóa đơn
        tong_tien = 0
        so_luong_chi_tiet = random.randint(1, 4)  # mỗi hóa đơn có 1-4 chi tiết
        
        for _ in range(so_luong_chi_tiet):
            dv = random.choice(dich_vus)
            so_luong = random.randint(1, 3)
            thanh_tien = dv.GiaTien * so_luong
            tong_tien += thanh_tien
            
            ChiTietHoaDon.objects.create(
                MaHD=hd,
                MaDV=dv,
                ThanhTien=thanh_tien,
                SoLuong=so_luong
            )
        
        # Cập nhật lại tổng tiền và số tiền thanh toán (giả sử khách thanh toán toàn bộ)
        hd.TongTien = tong_tien
        hd.SoTienThanhToan = tong_tien
        hd.save()

    # # Tạo HoaDon và ChiTietHoaDon
    # for i in range(5):
    #     kh = random.choice(khach_hangs)
    #     hd = HoaDon.objects.create(
    #         MaKH=kh,
    #         TongTien=0,
    #         TrangThaiTT=0
    #     )
        
    #     # Tạo chi tiết hóa đơn
    #     tong_tien = 0
    #     for _ in range(random.randint(1, 3)):
    #         dv = random.choice(dich_vus)
    #         so_luong = random.randint(1, 2)
    #         thanh_tien = dv.GiaTien * so_luong
    #         tong_tien += thanh_tien
            
    #         ChiTietHoaDon.objects.create(
    #             MaHD=hd,
    #             MaDV=dv,
    #             ThanhTien=thanh_tien,
    #             SoLuong=so_luong
    #         )
        
    #     hd.TongTien = tong_tien
    #     hd.save()

    # # Tạo DanhGia
    # hoa_dons = HoaDon.objects.all()
    # for i in range(5):
    #     DanhGia.objects.create(
    #         MaKH=random.choice(khach_hangs),
    #         NoiDung=f'Đánh giá mẫu {i+1}',
    #         DiemDanhGia=random.randint(3, 5),
    #         MaDV=random.choice(dich_vus),
    #         MaHD=random.choice(hoa_dons)
    #     )

    # Tạo ThongBao
    nhan_viens = NhanVien.objects.all()
    for i in range(5):
        ThongBao.objects.create(
            MaNV=random.choice(nhan_viens),
            LoaiThongBao='Thông báo mẫu',
            NoiDung=f'Nội dung thông báo mẫu {i+1}'
        )

if __name__ == '__main__':
    create_sample_data() 