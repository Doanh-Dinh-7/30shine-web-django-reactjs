from rest_framework import serializers
from .models import DichVu

class DichVuSerializer(serializers.ModelSerializer):
    class Meta:
        model = DichVu
        fields = ['MaDV', 'TenDV', 'MoTa', 'GiaTien', 'ThoiGianLamDV', 'AnhDaiDien'] 