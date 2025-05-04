from django.db import models
from django.contrib.auth.models import User

class KhachHang(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='khachhang')
    ho_ten = models.CharField(max_length=100)
    sdt = models.CharField(max_length=20)
    email = models.EmailField(max_length=255)
    dia_chi = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.ho_ten
