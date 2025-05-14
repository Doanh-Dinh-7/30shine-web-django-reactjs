from django.db import models

# Create your models here.

class DichVu(models.Model):
    MaDV = models.AutoField(primary_key=True)
    TenDV = models.CharField(max_length=100)
    MoTa = models.TextField(blank=True, null=True)
    GiaTien = models.DecimalField(max_digits=12, decimal_places=2)
    ThoiGianLamDV = models.IntegerField(help_text='Thời gian làm dịch vụ (phút)')
    AnhDaiDien = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.TenDV
