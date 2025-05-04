from django.db import models
from django.contrib.auth.models import User

class NhanVien(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='nhanvien')
    ho_ten = models.CharField(max_length=100)
    sdt = models.CharField(max_length=20)
    dia_chi = models.CharField(max_length=255, blank=True, null=True)
    gioi_tinh = models.CharField(max_length=10, blank=True, null=True)

    def __str__(self):
        return self.ho_ten
