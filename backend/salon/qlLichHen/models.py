from django.db import models
from qlKhachHang.models import KhachHang
from qlDichVu.models import DichVu
from qlNhanVien.models import LichLamViec

class LichHen(models.Model):
    MaLH = models.AutoField(primary_key=True)
    MaKH = models.ForeignKey(KhachHang, on_delete=models.CASCADE, related_name='lich_hen')
    MaDV = models.ForeignKey(DichVu, on_delete=models.CASCADE, related_name='lich_hen')
    MaLLV = models.ForeignKey(LichLamViec, on_delete=models.CASCADE, related_name='lich_hen')
    NgayDatLich = models.DateField()
    GioDatLich = models.TimeField()
    GioKhachDen = models.TimeField(blank=True, null=True)
    TrangThai = models.CharField(max_length=50)
    GhiChu = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Lịch hẹn {self.MaLH} - {self.MaKH.HoTenKH}"
