from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import LichHen
from .serializers import LichHenSerializer, LichHenListSerializer

# Create your views here.

class LichHenViewSet(viewsets.ModelViewSet):
    queryset = LichHen.objects.all()
    serializer_class = LichHenSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return LichHenListSerializer
        return LichHenSerializer

class HoanThanhLichHenAPIView(APIView):
    def post(self, request, pk):
        try:
            lich_hen = LichHen.objects.get(pk=pk)
            lich_hen.TrangThai = 1  # đánh dấu hoàn thành
            lich_hen.save()
            return Response({'message': 'Đã cập nhật lịch hẹn thành hoàn thành'}, status=status.HTTP_200_OK)
        except LichHen.DoesNotExist:
            return Response({'error': 'Lịch hẹn không tồn tại'}, status=status.HTTP_404_NOT_FOUND)
