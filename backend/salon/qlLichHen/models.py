from django.db import models
from qlKhachHang.models import KhachHang
from qlDichVu.models import DichVu

class LichHen(models.Model):
    MaLH = models.AutoField(primary_key=True)
    MaKH = models.CharField(max_length=20)  # Mã khách hàng
    TenKH = models.CharField(max_length=100)  # Tên khách hàng
    SDT = models.CharField(max_length=20)  # Số điện thoại
    TGHen = models.CharField(max_length=20)  # Thời gian hẹn (có thể dùng DateField nếu muốn)
    GioKhachDen = models.CharField(max_length=10)  # Giờ khách đến
    LoaiDV = models.CharField(max_length=100)  # Loại dịch vụ
    NhanVien = models.CharField(max_length=100)  # Nhân viên phụ trách
    TrangThai = models.CharField(max_length=50)  # Trạng thái
    GioDatLich = models.TimeField()

    def __str__(self):
        return f"Lịch hẹn {self.MaLH} - {self.TenKH}"
