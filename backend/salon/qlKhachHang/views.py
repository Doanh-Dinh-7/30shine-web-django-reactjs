from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import KhachHang
from .serializers import KhachHangSerializer
from rest_framework.exceptions import NotFound

# Create your views here.

class KhachHangViewSet(viewsets.ModelViewSet):
    queryset = KhachHang.objects.all()
    serializer_class = KhachHangSerializer

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
        except NotFound:
            return Response(
                {"message": "Không tìm thấy khách hàng để xoá."},
                status=status.HTTP_404_NOT_FOUND
            )
        self.perform_destroy(instance)
        return Response(
            {"message": "Thông tin khách hàng đã bị xoá."},
            status=status.HTTP_200_OK
        )
