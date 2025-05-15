from rest_framework import serializers
from .models import DanhGia

class DanhGiaSerializer(serializers.ModelSerializer):
    TenKH = serializers.CharField(source='MaKH.HoTenKH', read_only=True)
    TenDV = serializers.CharField(source='MaDV.TenDV', read_only=True)
    
    class Meta:
        model = DanhGia
        fields = ['MaDG', 'MaKH', 'MaDV', 'TenDV', 'TenKH', 'DiemDanhGia', 'NoiDung', 'NgayDanhGia']
        # fields = ['MaDG', 'TenDV', 'TenKH','DiemDanhGia',  'NoiDung', 'NgayDanhGia'] 