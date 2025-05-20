from rest_framework import serializers
from .models import HoaDon, ChiTietHoaDon
from qlKhachHang.models import KhachHang
from qlDichVu.models import DichVu  # import model DichVu để lấy tên dịch vụ

class ChiTietHoaDonSerializer(serializers.ModelSerializer):
    TenDV = serializers.SerializerMethodField()

    class Meta:
        model = ChiTietHoaDon
        fields = ['MaCTHD', 'MaDV', 'TenDV', 'ThanhTien', 'SoLuong']

    def get_TenDV(self, obj):
        # Lấy tên dịch vụ từ MaDV (foreign key)
        return obj.MaDV.TenDV if obj.MaDV else None


class HoaDonSerializer(serializers.ModelSerializer):
    chi_tiet = ChiTietHoaDonSerializer(many=True)
    HoTenKH = serializers.SerializerMethodField()

    class Meta:
        model = HoaDon
        fields = [
            'MaHD', 'MaKH', 'HoTenKH', 'TongTien', 'NgayLapHD', 
            'TrangThaiTT', 'TrangThaiHT', 'LyDoKhachH', 'LyDoQly', 'GhiChu', 'chi_tiet'
        ]

    def get_HoTenKH(self, obj):
        # Lấy họ tên khách hàng từ MaKH (foreign key)
        return obj.MaKH.HoTenKH if obj.MaKH else None

    def create(self, validated_data):
        chi_tiet_data = validated_data.pop('chi_tiet', [])
        hoa_don = HoaDon.objects.create(**validated_data)
        for ct in chi_tiet_data:
            ChiTietHoaDon.objects.create(MaHD=hoa_don, **ct)
        return hoa_don

    def update(self, instance, validated_data):
        chi_tiet_data = validated_data.pop('chi_tiet', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if chi_tiet_data is not None:
            instance.chi_tiet.all().delete()
            for ct in chi_tiet_data:
                ChiTietHoaDon.objects.create(MaHD=instance, **ct)
        return instance
