from rest_framework import serializers
from .models import DichVu
from qlDanhGia.serializers import DanhGiaSerializer

class DichVuSerializer(serializers.ModelSerializer):
    danh_gia = DanhGiaSerializer(source='danh_gia_set', many=True, read_only=True)
    
    class Meta:
        model = DichVu
        fields = ['MaDV', 'TenDV', 'MoTa', 'GiaTien', 'ThoiGianLamDV', 'AnhDaiDien', 'danh_gia']
        read_only_fields = ['MaDV']  # MaDV là khóa chính nên chỉ đọc

    def update(self, instance, validated_data):
        # Loại bỏ trường danh_gia khỏi validated_data nếu có
        validated_data.pop('danh_gia', None)
        return super().update(instance, validated_data) 