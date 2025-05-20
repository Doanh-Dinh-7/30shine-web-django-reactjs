from rest_framework import serializers
from .models import HoaDon, ChiTietHoaDon
from qlKhachHang.models import KhachHang

class ChiTietHoaDonSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChiTietHoaDon
        fields = ['MaCTHD', 'MaDV', 'ThanhTien', 'SoLuong']

class HoaDonSerializer(serializers.ModelSerializer):
    chi_tiet = ChiTietHoaDonSerializer(many=True)

    class Meta:
        model = HoaDon
        fields = ['MaHD', 'MaKH', 'TongTien', 'NgayLapHD', 'TrangThaiTT','TrangThaiHT', 'LyDoKhachH', 'LyDoQly', 'GhiChu', 'chi_tiet']

    def create(self, validated_data):
        chi_tiet_data = validated_data.pop('chi_tiet', [])
        hoa_don = HoaDon.objects.create(**validated_data)
        for ct in chi_tiet_data:
            ChiTietHoaDon.objects.create(MaHD=hoa_don, **ct)
        return hoa_don

    def update(self, instance, validated_data):
        chi_tiet_data = validated_data.pop('chi_tiet', None)
        # Cập nhật các trường của hóa đơn
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if chi_tiet_data is not None:
            # Xóa toàn bộ chi tiết cũ
            instance.chi_tiet.all().delete()
            # Tạo lại chi tiết mới
            for ct in chi_tiet_data:
                ChiTietHoaDon.objects.create(MaHD=instance, **ct)
        return instance 