from datetime import datetime
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import LichHen
from .serializers import LichHenSerializer
from qlThongBao.models import ThongBao
from qlThongBao.utils import send_notification

# Create your views here.

class LichHenViewSet(viewsets.ModelViewSet):
    queryset = LichHen.objects.all()
    serializer_class = LichHenSerializer


    def perform_create(self, serializer):
        lich_hen = serializer.save()
        ten_khach_hang = lich_hen.MaKH.HoTenKH
        gio_hen = lich_hen.GioKhachDen
        ngay_dat_lich = lich_hen.NgayDatLich
        noi_dung = f"Khách hàng {ten_khach_hang} đã đặt lịch hẹn lúc {gio_hen} ngày {ngay_dat_lich}"
        thoi_gian = datetime.now()
        ThongBao.objects.create(NoiDung=noi_dung, ThoiGian=thoi_gian, MaLH=lich_hen.MaLH)
        send_notification(noi_dung)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        ten_khach_hang = instance.MaKH.HoTenKH
        gio_hen = instance.GioKhachDen
        ngay_dat_lich = instance.NgayDatLich
        noi_dung = f"Khách hàng {ten_khach_hang} đã huỷ lịch hẹn lúc {gio_hen} ngày {ngay_dat_lich}"
        thoi_gian = datetime.now()
        ThongBao.objects.create(NoiDung=noi_dung, ThoiGian=thoi_gian, MaLH=instance.MaLH)
        send_notification(noi_dung)
        return super().destroy(request, *args, **kwargs)

class HoanThanhLichHenAPIView(APIView):
    def post(self, request, pk):
        try:
            lich_hen = LichHen.objects.get(pk=pk)
            lich_hen.TrangThai = 1  # đánh dấu hoàn thành
            lich_hen.save()
            return Response({'message': 'Đã cập nhật lịch hẹn thành hoàn thành'}, status=status.HTTP_200_OK)
        except LichHen.DoesNotExist:
            return Response({'error': 'Lịch hẹn không tồn tại'}, status=status.HTTP_404_NOT_FOUND)
