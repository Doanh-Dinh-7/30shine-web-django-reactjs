from django.shortcuts import render
from rest_framework import viewsets
from .models import LichHen
from .serializers import LichHenSerializer

# Create your views here.

class LichHenViewSet(viewsets.ModelViewSet):
    queryset = LichHen.objects.all()
    serializer_class = LichHenSerializer
