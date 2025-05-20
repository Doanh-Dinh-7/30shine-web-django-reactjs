from django.db import models
from django.contrib.auth.models import User

class KhachHang(models.Model):
    MaKH = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='khachhang')
    HoTenKH = models.CharField(max_length=100)
    SDT = models.CharField(max_length=20)
    Email = models.EmailField(max_length=255)
    DiaChi = models.CharField(max_length=255, blank=True, null=True)
    AnhDaiDien = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.HoTenKH
