from rest_framework import serializers
from .models import LichHen
from datetime import datetime, timedelta
from qlNhanVien.models import NhanVien, LichLamViec
from qlDichVu.models import DichVu

class LichHenSerializer(serializers.ModelSerializer):
    class Meta:
        model = LichHen
        fields = [
            'MaLH', 'MaKH', 'TenKH', 'SDT', 'TGHen',
            'GioKhachDen', 'LoaiDV', 'NhanVien', 'TrangThai', 'GioDatLich'
        ]

    def validate(self, data):
        nhan_vien = data['NhanVien']
        ngay_hen = data['TGHen']
        gio_khach_den = data['GioKhachDen']
        loai_dv = data['LoaiDV']

        # 1. Kiểm tra nhân viên tồn tại
        if not NhanVien.objects.filter(HoTenNV=nhan_vien).exists():
            raise serializers.ValidationError("Nhân viên không tồn tại.")

        # 2. Kiểm tra dịch vụ tồn tại
        if not DichVu.objects.filter(TenDV=loai_dv).exists():
            raise serializers.ValidationError("Dịch vụ không tồn tại.")

        # 3. Kiểm tra ca làm việc
        try:
            ngay_hen_date = datetime.strptime(ngay_hen, "%Y-%m-%d").date()
            gio_khach_den_time = datetime.strptime(gio_khach_den, "%H:%M").time()
        except Exception:
            raise serializers.ValidationError("Định dạng ngày hoặc giờ không hợp lệ.")

        ca_lam = LichLamViec.objects.filter(
            MaNV__HoTenNV=nhan_vien,
            NgayLam=ngay_hen_date
        ).first()
        if not ca_lam:
            raise serializers.ValidationError("Nhân viên không có ca làm việc trong ngày này.")

        if ca_lam.GioBatDau and ca_lam.GioKetThuc:
            if not (ca_lam.GioBatDau <= gio_khach_den_time <= ca_lam.GioKetThuc):
                raise serializers.ValidationError("Giờ khách đến không nằm trong ca làm việc của nhân viên.")

        # 4. Kiểm tra trùng lịch 1 tiếng
        gio_moi = gio_khach_den_time
        start = (datetime.combine(datetime.today(), gio_moi) - timedelta(hours=1)).time()
        end = (datetime.combine(datetime.today(), gio_moi) + timedelta(hours=1)).time()
        qs = LichHen.objects.filter(
            NhanVien=nhan_vien,
            TGHen=ngay_hen,
            GioKhachDen__gte=start,
            GioKhachDen__lt=end
        )
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError("Nhân viên này đã có lịch trong khoảng 1 tiếng quanh giờ này.")

        return data 