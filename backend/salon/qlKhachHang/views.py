from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import KhachHang
from .serializers import KhachHangSerializer

# Create your views here.

class KhachHangViewSet(viewsets.ModelViewSet):
    queryset = KhachHang.objects.all()
    serializer_class = KhachHangSerializer

    @action(detail=True, methods=['delete'], url_path='delete')
    def delete_khachhang(self, request, pk=None):
        try:
            khachhang = self.get_object()
            khachhang.delete()
            return Response({'message': 'Xoá khách hàng thành công!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': f'Xoá khách hàng thất bại: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

