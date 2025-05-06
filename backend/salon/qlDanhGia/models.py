from django.db import models
from qlKhachHang.models import KhachHang

class DanhGia(models.Model):
    MaDG = models.AutoField(primary_key=True)
    MaKH = models.ForeignKey(KhachHang, on_delete=models.CASCADE, related_name='danh_gia')
    NgayDanhGia = models.DateField(auto_now_add=True)
    NoiDung = models.TextField()
    DiemDanhGia = models.IntegerField()

    def __str__(self):
        return f"Đánh giá {self.MaDG} - {self.MaKH.HoTenKH}"
