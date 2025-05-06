from django.shortcuts import render
from rest_framework import viewsets
from .models import NhanVien, LichLamViec
from .serializers import NhanVienSerializer, LichLamViecSerializer

# Create your views here.

class NhanVienViewSet(viewsets.ModelViewSet):
    queryset = NhanVien.objects.all()
    serializer_class = NhanVienSerializer

class LichLamViecViewSet(viewsets.ModelViewSet):
    queryset = LichLamViec.objects.all()
    serializer_class = LichLamViecSerializer
