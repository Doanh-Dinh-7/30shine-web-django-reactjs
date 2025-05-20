from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import HoaDon
from .serializers import HoaDonSerializer

# Create your views here.

class HoaDonViewSet(viewsets.ModelViewSet):
    queryset = HoaDon.objects.all()
    serializer_class = HoaDonSerializer

    @action(detail=False, methods=['get'], url_path='khach-hang/(?P<MaKH>\d+)')
    def khach_hang(self, request, MaKH=None):
        """
        Lấy danh sách hóa đơn của một khách hàng cụ thể dựa trên MaKH.
        Ví dụ: /api/hoa-don/khach-hang/5/
        """
        try:
            # Lọc hóa đơn theo MaKH
            hoa_dons = self.queryset.filter(MaKH=MaKH)
            if not hoa_dons.exists():
                return Response(
                    {"detail": f"Không tìm thấy hóa đơn nào cho khách hàng với MaKH={MaKH}."},
                    status=404
                )
            
            # Serialize dữ liệu
            serializer = self.get_serializer(hoa_dons, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"detail": f"Lỗi khi lấy hóa đơn: {str(e)}"},
                status=400
            )