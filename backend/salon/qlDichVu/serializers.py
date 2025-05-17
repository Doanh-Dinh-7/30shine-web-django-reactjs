from rest_framework import serializers
from .models import DichVu
from qlDanhGia.models import DanhGia
from qlDanhGia.serializers import DanhGiaSerializer

class DichVuSerializer(serializers.ModelSerializer):
    GiaTienFormatted = serializers.SerializerMethodField()
    ThoiGianFormatted = serializers.SerializerMethodField()
    danh_gia = serializers.SerializerMethodField()

    class Meta:
        model = DichVu
        fields = [
            'MaDV', 
            'TenDV', 
            'MoTa', 
            'GiaTien', 
            'GiaTienFormatted',
            'ThoiGianLamDV',
            'ThoiGianFormatted',
            'AnhDichVu',
            'danh_gia'
        ]

    def get_GiaTienFormatted(self, obj):
        """Format giá tiền theo định dạng tiền tệ Việt Nam"""
        return f"{obj.GiaTien:,.0f} VNĐ"

    def get_ThoiGianFormatted(self, obj):
        """Format thời gian làm dịch vụ"""
        if obj.ThoiGianLamDV < 60:
            return f"{obj.ThoiGianLamDV} phút"
        else:
            hours = obj.ThoiGianLamDV // 60
            minutes = obj.ThoiGianLamDV % 60
            if minutes == 0:
                return f"{hours} giờ"
            return f"{hours} giờ {minutes} phút"

    def get_danh_gia(self, obj):
        qs = DanhGia.objects.filter(MaDV=obj, DiemDanhGia__gte=3.5).order_by('-NgayDanhGia')[:5]
        return DanhGiaSerializer(qs, many=True).data 