from django.shortcuts import render
from rest_framework import viewsets
from .models import ThongBao
from .serializers import ThongBaoSerializer

# Create your views here.

class ThongBaoViewSet(viewsets.ModelViewSet):
    queryset = ThongBao.objects.all()
    serializer_class = ThongBaoSerializer
