from django.db import models
from qlKhachHang.models import KhachHang

class HoaDon(models.Model):
    khach_hang = models.ForeignKey(KhachHang, on_delete=models.CASCADE, related_name='hoa_don')
    tong_tien = models.DecimalField(max_digits=15, decimal_places=2)
    ngay_lap_hoa_don = models.DateTimeField(auto_now_add=True)
    trang_thai = models.CharField(max_length=50)
    ghi_chu = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Hóa đơn {self.id} - {self.khach_hang.ho_ten}"
