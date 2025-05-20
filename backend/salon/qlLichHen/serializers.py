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
    
    # Thêm các trường hiển thị
    HoTenKH = serializers.CharField(source='MaKH.HoTenKH', read_only=True)
    SDT = serializers.CharField(source='MaKH.SDT', read_only=True)
    TenDV = serializers.CharField(source='MaDV.TenDV', read_only=True)
    TenNV = serializers.CharField(source='MaLLV.MaNV.HoTenNV', read_only=True)

    class Meta:
        model = LichHen
        fields = [
            # Các trường gốc của model
            'MaLH', 'MaKH', 'MaDV', 'MaLLV',
            'NgayDatLich', 'GioDatLich', 'GioKhachDen',
            'TrangThai', 'GhiChu',
            # Các trường hiển thị thêm
            'HoTenKH', 'SDT', 'TenDV', 'TenNV'
        ]

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
            
            # Kiểm tra khoảng cách 60 phút trước và sau với các lịch hẹn trước đó
            gio_moi = validated_data.get('GioKhachDen') or timezone.now().time()
            dt_moi = datetime.combine(ngay_dat_lich, gio_moi)
            
            # Tính thời gian bắt đầu và kết thúc của khoảng thời gian cần kiểm tra
            dt_bat_dau = dt_moi - timedelta(minutes=60)
            dt_ket_thuc = dt_moi + timedelta(minutes=60)
            
            # Kiểm tra xem có lịch hẹn nào trong khoảng thời gian này không
            lich_hen_trung = LichHen.objects.filter(
                MaLLV=ma_llv,
                TrangThai=0,
                NgayDatLich=ngay_dat_lich,
                GioKhachDen__gte=dt_bat_dau.time(),
                GioKhachDen__lte=dt_ket_thuc.time()
            ).exists()
            
            if lich_hen_trung:
                raise serializers.ValidationError({
                    'GioKhachDen': 'Nhân viên đã có lịch hẹn trong khoảng thời gian 1 tiếng'
                })

        # Xử lý mặc định
        if 'GioDatLich' not in validated_data or validated_data['GioDatLich'] is None:
            validated_data['GioDatLich'] = timezone.now().time()
        if 'NgayDatLich' not in validated_data or validated_data['NgayDatLich'] is None:
            validated_data['NgayDatLich'] = timezone.now().date()
        if 'TrangThai' not in validated_data or validated_data['TrangThai'] is None:
            validated_data['TrangThai'] = 0
        return super().create(validated_data) 
