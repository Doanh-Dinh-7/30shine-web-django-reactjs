from django.db import models
from qlNhanVien.models import NhanVien

class ThongBao(models.Model):
    MaTB = models.AutoField(primary_key=True)
    MaNV = models.ForeignKey(NhanVien, on_delete=models.CASCADE, related_name='thong_bao')
    ThoiGian = models.DateTimeField(auto_now_add=True)
    LoaiThongBao = models.CharField(max_length=100)
    NoiDung = models.TextField()

    def __str__(self):
        return f"Thông báo {self.MaTB} - {self.LoaiThongBao}"
