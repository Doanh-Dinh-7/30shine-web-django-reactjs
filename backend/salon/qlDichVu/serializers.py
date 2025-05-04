from rest_framework import serializers
from .models import DichVu

class DichVuSerializer(serializers.ModelSerializer):
    class Meta:
        model = DichVu
        fields = ['id', 'ten_dv', 'mo_ta', 'gia_tien', 'thoi_gian_lam_dv'] 