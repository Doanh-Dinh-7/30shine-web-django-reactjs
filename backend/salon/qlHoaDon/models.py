from django.db import models
from qlKhachHang.models import KhachHang
from qlDichVu.models import DichVu

class HoaDon(models.Model):
    MaKH = models.ForeignKey(KhachHang, on_delete=models.CASCADE, related_name='hoa_don')
    TongTien = models.DecimalField(max_digits=15, decimal_places=2)
    NgayLapHD = models.DateTimeField(auto_now_add=True)
    TrangThaiTT = models.CharField(max_length=50)
    GhiChu = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Hóa đơn {self.id} - {self.MaKH.HoTenKH}"

class ChiTietHoaDon(models.Model):
    MaCTHD = models.AutoField(primary_key=True)
    MaHD = models.ForeignKey(HoaDon, on_delete=models.CASCADE, related_name='chi_tiet')
    MaDV = models.ForeignKey(DichVu, on_delete=models.CASCADE)
    ThanhTien = models.DecimalField(max_digits=15, decimal_places=2)
    SoLuong = models.IntegerField()

    def __str__(self):
        return f"CTHD {self.MaCTHD} - HĐ {self.MaHD.id}"

