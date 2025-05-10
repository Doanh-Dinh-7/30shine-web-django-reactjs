from rest_framework import serializers
from .models import LichHen
 
class LichHenSerializer(serializers.ModelSerializer):
    class Meta:
        model = LichHen
        fields = ['MaLH', 'MaKH', 'MaDV', 'NgayDatLich', 'GioDatLich', 'GioKhachDen', 'TrangThai', 'GhiChu'] 