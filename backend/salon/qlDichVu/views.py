from django.shortcuts import render
from rest_framework import viewsets
from .models import DichVu
from .serializers import DichVuSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from qlDanhGia.models import DanhGia
from qlDanhGia.serializers import DanhGiaSerializer

# Create your views here.

class DichVuViewSet(viewsets.ModelViewSet):
    queryset = DichVu.objects.all()
    serializer_class = DichVuSerializer

    @action(detail=False, methods=['get'])
    def dichvu_kem_danhgia(self, request):
        ds_dichvu = self.get_queryset()
        data = []
        for dv in ds_dichvu:
            danh_gia = DanhGia.objects.filter(MaDV=dv)
            danh_gia_data = DanhGiaSerializer(danh_gia, many=True).data
            dv_data = DichVuSerializer(dv).data
            dv_data['danh_gia'] = danh_gia_data
            data.append(dv_data)
        return Response(data)
