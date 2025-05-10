from rest_framework import serializers
from .models import DanhGia
 
class DanhGiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = DanhGia
        fields = ['MaDG', 'MaKH', 'NgayDanhGia', 'NoiDung', 'DiemDanhGia'] 