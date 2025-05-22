from django.shortcuts import render
from rest_framework import viewsets
from .models import DichVu
from .serializers import DichVuSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from qlDanhGia.models import DanhGia
from qlDanhGia.serializers import DanhGiaSerializer
from rest_framework import status
from salon.cloudinary import upload_image
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

# Create your views here.

class DichVuViewSet(viewsets.ModelViewSet):
    queryset = DichVu.objects.all()
    serializer_class = DichVuSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        if 'AnhDaiDien' in request.FILES:
            file = request.FILES['AnhDaiDien']
            result = upload_image(file)
            data['AnhDaiDien'] = result['secure_url']
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = request.data.copy()
        if 'AnhDaiDien' in request.FILES:
            file = request.FILES['AnhDaiDien']
            result = upload_image(file)
            data['AnhDaiDien'] = result['secure_url']
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

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

    @action(detail=True, methods=['delete'], url_path='delete')
    def delete_dichvu(self, request, pk=None):
        try:
            dichvu = self.get_object()
            dichvu.delete()
            return Response({'message': 'Xoá dịch vụ thành công!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': f'Xoá dịch vụ thất bại: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
