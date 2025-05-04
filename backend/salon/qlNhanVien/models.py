from django.db import models
from django.contrib.auth.models import User

class NhanVien(models.Model):
    MaNV = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='nhanvien')
    HoTenNV = models.CharField(max_length=100)
    SDT = models.CharField(max_length=20)
    DiaChi = models.CharField(max_length=255, blank=True, null=True)
    GioiTinh = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return self.HoTenNV
