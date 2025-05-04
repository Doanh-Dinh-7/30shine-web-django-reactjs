from django.shortcuts import render
from rest_framework import viewsets
from .models import HoaDon
from .serializers import HoaDonSerializer

# Create your views here.

class HoaDonViewSet(viewsets.ModelViewSet):
    queryset = HoaDon.objects.all()
    serializer_class = HoaDonSerializer
