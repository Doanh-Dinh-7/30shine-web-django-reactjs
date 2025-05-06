from django.shortcuts import render
from rest_framework import viewsets
from .models import DanhGia
from .serializers import DanhGiaSerializer

# Create your views here.

class DanhGiaViewSet(viewsets.ModelViewSet):
    queryset = DanhGia.objects.all()
    serializer_class = DanhGiaSerializer
