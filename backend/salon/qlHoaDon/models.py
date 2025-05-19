from django.db import models
from qlKhachHang.models import KhachHang
from qlDichVu.models import DichVu
from django.utils import timezone

class HoaDon(models.Model):
    MaHD = models.AutoField(primary_key=True)
    MaKH = models.ForeignKey(KhachHang, on_delete=models.CASCADE, related_name='hoa_don') 
    TongTien = models.DecimalField(max_digits=10, decimal_places=2)
    NgayLapHD = models.DateTimeField(null=True, blank=True)  
    SoTienThanhToan = models.DecimalField(max_digits=12, decimal_places=2, default=0)

    HINH_THUC_THANH_TOAN_CHOICES = [
        (0, 'Chuyển khoản NH'),
        (1, 'Tiền mặt'),
        (2, 'Khác'),
    ]
    HinhThucThanhToan = models.IntegerField(choices=HINH_THUC_THANH_TOAN_CHOICES, default=2)
    
    ThoiGianThanhToan = models.DateTimeField(null=True, blank=True)

    # Giữ nguyên số, bỏ choices (không có phần chữ)
    TrangThaiTT = models.IntegerField(default=0)
    TrangThaiHT = models.IntegerField(default=0)

    HinhThucHoan = models.CharField(max_length=100, null=True, blank=True)
    LyDoKhachH = models.CharField(max_length=100, null=True, blank=True)
    LyDoQly = models.CharField(max_length=100, null=True, blank=True)
    ThoiGianHoan = models.DateTimeField(null=True, blank=True)

    GhiChu = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"Hóa đơn {self.MaHD} - {self.MaKH.HoTenKH}"


class ChiTietHoaDon(models.Model):
    MaCTHD = models.AutoField(primary_key=True)
    MaHD = models.ForeignKey(HoaDon, on_delete=models.CASCADE, related_name='chi_tiet')
    MaDV = models.ForeignKey(DichVu, on_delete=models.CASCADE)
    ThanhTien = models.DecimalField(max_digits=15, decimal_places=2)
    SoLuong = models.IntegerField()

    def __str__(self):
        return f"CTHD {self.MaCTHD} - HĐ {self.MaHD}"
