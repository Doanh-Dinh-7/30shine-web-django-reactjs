from django.shortcuts import render
from rest_framework import viewsets
from .models import KhachHang
from .serializers import KhachHangSerializer

# Create your views here.

class KhachHangViewSet(viewsets.ModelViewSet):
    queryset = KhachHang.objects.all()
    serializer_class = KhachHangSerializer
