from django.shortcuts import render
from rest_framework import viewsets
from .models import DichVu
from .serializers import DichVuSerializer

# Create your views here.

class DichVuViewSet(viewsets.ModelViewSet):
    queryset = DichVu.objects.all()
    serializer_class = DichVuSerializer
