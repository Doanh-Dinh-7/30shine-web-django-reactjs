from rest_framework import serializers
from .models import HoaDon
from qlKhachHang.models import KhachHang

class HoaDonSerializer(serializers.ModelSerializer):
    class Meta:
        model = HoaDon
        fields = ['id', 'MaKH', 'TongTien', 'NgayLapHD', 'TrangThaiTT', 'GhiChu'] 