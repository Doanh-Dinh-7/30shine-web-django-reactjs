from rest_framework import serializers
from .models import LichHen

class LichHenListSerializer(serializers.ModelSerializer):
    MaKH = serializers.SerializerMethodField()
    TenKH = serializers.SerializerMethodField()
    SDT = serializers.SerializerMethodField()
    TGHen = serializers.DateField(source='NgayDatLich')
    GioKhachDen = serializers.TimeField()
    LoaiDV = serializers.SerializerMethodField()
    NhanVien = serializers.SerializerMethodField()
    GioDatLich = serializers.TimeField()
    MaNV = serializers.SerializerMethodField()

    class Meta:
        model = LichHen
        fields = [
            'MaLH', 'MaKH', 'MaNV', 'TenKH', 'SDT', 'TGHen', 'GioKhachDen',
            'LoaiDV', 'NhanVien', 'TrangThai', 'GioDatLich'
        ]

    def get_MaKH(self, obj):
        return f"KH{obj.MaKH.MaKH:03d}"

    def get_TenKH(self, obj):
        return obj.MaKH.HoTenKH

    def get_SDT(self, obj):
        return obj.MaKH.SDT

    def get_LoaiDV(self, obj):
        return obj.MaDV.TenDV

    def get_NhanVien(self, obj):
        if obj.MaLLV and obj.MaLLV.MaNV:
            return obj.MaLLV.MaNV.HoTenNV
        return None

    def get_MaNV(self, obj):
        if obj.MaLLV and obj.MaLLV.MaNV:
            return f"NV{obj.MaLLV.MaNV.MaNV:03d}"
        return None

class LichHenSerializer(serializers.ModelSerializer):
    class Meta:
        model = LichHen
        fields = [
            'MaLH', 'MaKH', 'MaDV', 'MaLLV', 'NgayDatLich', 'GioDatLich',
            'GioKhachDen', 'TrangThai', 'GhiChu'
        ] 