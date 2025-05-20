from django.db import models
from qlKhachHang.models import KhachHang
from qlDichVu.models import DichVu
from qlHoaDon.models import HoaDon

class DanhGia(models.Model):
    MaDG = models.AutoField(primary_key=True)
    MaKH = models.ForeignKey(KhachHang, on_delete=models.CASCADE, related_name='danh_gia')
    NgayDanhGia = models.DateField(auto_now_add=True)
    NoiDung = models.TextField()
    DiemDanhGia = models.IntegerField()
    
    MaDV = models.ForeignKey(DichVu, on_delete=models.CASCADE, related_name='danh_gia', null=True, blank=True)
    MaHD = models.ForeignKey(HoaDon, on_delete=models.CASCADE, related_name='danh_gia', null=True, blank=True)

    def __str__(self):
        return f"Đánh giá {self.MaDG} - {self.MaKH.HoTenKH}"
