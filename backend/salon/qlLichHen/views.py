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
from rest_framework.decorators import action

# Create your views here.

class LichHenViewSet(viewsets.ModelViewSet):
    queryset = LichHen.objects.all()
    serializer_class = LichHenSerializer

    @action(detail=False, methods=['get'], url_path='by-khach-hang')
    def by_khach_hang(self, request):
        ma_kh = request.query_params.get('ma_kh')
        if not ma_kh:
            return Response({'detail': 'Thiếu mã khách hàng.'}, status=status.HTTP_400_BAD_REQUEST)
        lich_hen = LichHen.objects.filter(MaKH=ma_kh)
        serializer = self.get_serializer(lich_hen, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        lich_hen = serializer.save()
        ten_khach_hang = lich_hen.MaKH.HoTenKH
        gio_hen = lich_hen.GioKhachDen
        ngay_dat_lich = lich_hen.NgayDatLich
        noi_dung = f"Khách hàng {ten_khach_hang} đã đặt lịch hẹn lúc {gio_hen} ngày {ngay_dat_lich}"
        thoi_gian = datetime.now()
        ThongBao.objects.create(NoiDung=noi_dung, ThoiGian=thoi_gian, MaLH=lich_hen)
        send_notification(noi_dung)
        return Response({"message": "Đặt lịch hẹn thành công"}, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        ten_khach_hang = instance.MaKH.HoTenKH
        gio_hen = instance.GioKhachDen
        ngay_dat_lich = instance.NgayDatLich
        noi_dung = f"Khách hàng {ten_khach_hang} đã huỷ lịch hẹn lúc {gio_hen} ngày {ngay_dat_lich}"
        thoi_gian = datetime.now()
        ThongBao.objects.create(NoiDung=noi_dung, ThoiGian=thoi_gian, MaLH=instance)
        send_notification(noi_dung)
        super().destroy(request, *args, **kwargs)
        return Response({"message": "Xóa lịch hẹn thành công"}, status=status.HTTP_200_OK)

class HoanThanhLichHenAPIView(APIView):
    def post(self, request, pk):
        try:
            lich_hen = LichHen.objects.get(pk=pk)
            lich_hen.TrangThai = 1  # đánh dấu hoàn thành
            lich_hen.save()
            return Response({'message': 'Đã cập nhật lịch hẹn thành hoàn thành'}, status=status.HTTP_200_OK)
        except LichHen.DoesNotExist:
            return Response({'error': 'Lịch hẹn không tồn tại'}, status=status.HTTP_404_NOT_FOUND)
