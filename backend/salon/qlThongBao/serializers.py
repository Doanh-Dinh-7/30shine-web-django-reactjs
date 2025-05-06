from rest_framework import serializers
from .models import ThongBao

class ThongBaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThongBao
        fields = ['MaTB', 'MaNV', 'ThoiGian', 'LoaiThongBao', 'NoiDung'] 