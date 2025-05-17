from rest_framework import serializers
from .models import LichHen
from qlNhanVien.models import LichLamViec
from django.utils import timezone
from datetime import datetime, timedelta
 
class LichHenSerializer(serializers.ModelSerializer):
    NgayDatLich = serializers.DateField(required=False)
    GioDatLich = serializers.TimeField(required=False)
    TrangThai = serializers.IntegerField(required=False)
    GhiChu = serializers.CharField(required=False)
    class Meta:
        model = LichHen
        fields = ['MaLH', 'MaKH', 'MaDV', 'MaLLV', 'NgayDatLich', 'GioDatLich', 'GioKhachDen', 'TrangThai', 'GhiChu'] 

    def create(self, validated_data):
        # Lấy MaLLV
        ma_llv = validated_data.get('MaLLV')
        gio_khach_den = validated_data.get('GioKhachDen')
        ngay_dat_lich = validated_data.get('NgayDatLich') or timezone.now().date()
        # Lấy lịch làm việc
        if ma_llv:
            try:
                llv = LichLamViec.objects.get(pk=ma_llv.pk if hasattr(ma_llv, 'pk') else ma_llv)
            except LichLamViec.DoesNotExist:
                raise serializers.ValidationError({'MaLLV': 'Lịch làm việc không tồn tại.'})
            # Kiểm tra GioKhachDen trong khoảng
            if gio_khach_den:
                if llv.GioBatDau and llv.GioKetThuc:
                    if not (llv.GioBatDau <= gio_khach_den <= llv.GioKetThuc):
                        raise serializers.ValidationError({'GioKhachDen': f'Giờ khách đến phải nằm trong khoảng {llv.GioBatDau} đến {llv.GioKetThuc}.'})
            # Kiểm tra khoảng cách 60 phút với các lịch hẹn trước đó cùng MaLLV và TrangThai=0
            lich_hen_truoc = LichHen.objects.filter(MaLLV=ma_llv, TrangThai=0, NgayDatLich=ngay_dat_lich).order_by('GioKhachDen')
            if lich_hen_truoc.exists():
                lh_cu = lich_hen_truoc.first()
                gio_cu = lh_cu.GioKhachDen
                gio_moi = validated_data.get('GioKhachDen') or timezone.now().time()
                # Chuyển sang datetime để so sánh
                dt_cu = datetime.combine(ngay_dat_lich, gio_cu)
                dt_moi = datetime.combine(ngay_dat_lich, gio_moi)
                if abs((dt_moi - dt_cu).total_seconds()) < 3600:
                    raise serializers.ValidationError({'GioKhachDen': 'Lịch hẹn mới phải cách lịch hẹn trước đó ít nhất 60 phút.'})
        # Xử lý mặc định
        if 'GioDatLich' not in validated_data or validated_data['GioDatLich'] is None:
            validated_data['GioDatLich'] = timezone.now().time()
        if 'NgayDatLich' not in validated_data or validated_data['NgayDatLich'] is None:
            validated_data['NgayDatLich'] = timezone.now().date()
        if 'TrangThai' not in validated_data or validated_data['TrangThai'] is None:
            validated_data['TrangThai'] = 0
        return super().create(validated_data) 