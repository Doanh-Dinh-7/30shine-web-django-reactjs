from django.db import models
from qlKhachHang.models import KhachHang
from qlDichVu.models import DichVu

class DanhGia(models.Model):
    MaDG = models.AutoField(primary_key=True)
    MaKH = models.ForeignKey(KhachHang, on_delete=models.CASCADE, related_name='danh_gia')
    MaDV = models.ForeignKey(DichVu, on_delete=models.CASCADE, related_name='danh_gia')
    DiemDanhGia = models.IntegerField()
    NoiDung = models.TextField()
    NgayDanhGia = models.DateField(auto_now_add=True)
    

    def __str__(self):
        return f"Đánh giá {self.MaDG} - {self.MaKH.HoTenKH}"
