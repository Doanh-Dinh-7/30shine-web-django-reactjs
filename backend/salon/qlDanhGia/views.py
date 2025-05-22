from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import DanhGia
from .serializers import DanhGiaSerializer
from qlThongBao.models import ThongBao
from qlThongBao.utils import send_notification
from datetime import datetime


# Create your views here.

class DanhGiaViewSet(viewsets.ModelViewSet):
    queryset = DanhGia.objects.all()
    serializer_class = DanhGiaSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Đánh giá đã được xoá thành công."},
            status=status.HTTP_200_OK
        )

    def perform_create(self, serializer):
        danh_gia = serializer.save()
        ten_khach_hang = danh_gia.MaKH.HoTenKH
        diem = danh_gia.DiemDanhGia
        thoi_gian = datetime.now()
        noi_dung = f"Khách hàng {ten_khach_hang} đã đánh giá {diem} ⭐"
        print(f"DanhGia object after save: {danh_gia}, MaDG: {danh_gia.MaDG}") # In khóa chính của DanhGia
        ThongBao.objects.create(NoiDung=noi_dung, ThoiGian=thoi_gian, MaDG=danh_gia)
        send_notification(noi_dung) 
        return Response({"message": "Đánh giá đã được tạo thành công"}, status=status.HTTP_200_OK)