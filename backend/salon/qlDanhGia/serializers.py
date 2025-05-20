from rest_framework import serializers
from .models import DanhGia
 
class DanhGiaSerializer(serializers.ModelSerializer):
    ten_khach_hang = serializers.CharField(source='MaKH.HoTenKH', read_only=True)
    class Meta:
        model = DanhGia
        fields = ['MaDG', 'MaKH', 'NgayDanhGia', 'NoiDung', 'DiemDanhGia', 'MaDV', 'MaHD']
        read_only_fields = ['MaDG', 'NgayDanhGia'] 
