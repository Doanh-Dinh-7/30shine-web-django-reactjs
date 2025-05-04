from django.db import models

# Create your models here.

class DichVu(models.Model):
    ten_dv = models.CharField(max_length=100)
    mo_ta = models.TextField(blank=True, null=True)
    gia_tien = models.DecimalField(max_digits=12, decimal_places=2)
    thoi_gian_lam_dv = models.IntegerField(help_text='Thời gian làm dịch vụ (phút)')

    def __str__(self):
        return self.ten_dv
