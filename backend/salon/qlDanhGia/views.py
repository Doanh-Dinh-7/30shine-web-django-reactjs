from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import DanhGia
from .serializers import DanhGiaSerializer

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
