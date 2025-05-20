from django.db import models
from qlNhanVien.models import NhanVien
from qlDanhGia.models import DanhGia
from qlLichHen.models import LichHen

class ThongBao(models.Model):
    MaTB = models.AutoField(primary_key=True)
    MaDG = models.ForeignKey(DanhGia, on_delete=models.CASCADE, related_name='thong_bao', null=True, blank=True)
    MaLH = models.ForeignKey(LichHen, on_delete=models.CASCADE, related_name='thong_bao', null=True, blank=True)
    ThoiGian = models.DateTimeField(auto_now_add=True)
    LoaiThongBao = models.CharField(max_length=100)
    NoiDung = models.TextField()

    def __str__(self):
        return f"Thông báo {self.MaTB} - {self.LoaiThongBao}"
