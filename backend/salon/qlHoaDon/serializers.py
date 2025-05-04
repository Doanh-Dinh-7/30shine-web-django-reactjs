from rest_framework import serializers
from .models import HoaDon
from qlKhachHang.models import KhachHang

class HoaDonSerializer(serializers.ModelSerializer):
    class Meta:
        model = HoaDon
        fields = ['id', 'khach_hang', 'tong_tien', 'ngay_lap_hoa_don', 'trang_thai', 'ghi_chu'] 