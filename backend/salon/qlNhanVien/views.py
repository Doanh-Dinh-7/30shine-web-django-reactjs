from django.shortcuts import render
from rest_framework import viewsets
from .models import NhanVien
from .serializers import NhanVienSerializer

# Create your views here.

class NhanVienViewSet(viewsets.ModelViewSet):
    queryset = NhanVien.objects.all()
    serializer_class = NhanVienSerializer
