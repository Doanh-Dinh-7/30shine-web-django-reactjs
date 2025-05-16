from django.db import models
from qlKhachHang.models import KhachHang
from qlDichVu.models import DichVu
from qlNhanVien.models import LichLamViec

class LichHen(models.Model):
    MaLH = models.AutoField(primary_key=True)
    MaKH = models.ForeignKey(KhachHang, on_delete=models.CASCADE, related_name='lich_hen')
    MaDV = models.ForeignKey(DichVu, on_delete=models.CASCADE, related_name='lich_hen')
    NgayDatLich = models.DateField()
    GioDatLich = models.TimeField()
    GioKhachDen = models.TimeField()
    TrangThai = models.IntegerField(default=0)  # 0: Chưa xác nhận, 1: Đã hoàn thành
    GhiChu = models.TextField(default='')
    MaLLV = models.ForeignKey(LichLamViec, on_delete=models.CASCADE, related_name='lich_hen')

    def __str__(self):
        return f"Lịch hẹn {self.MaLH} - {self.MaKH.HoTenKH}"
