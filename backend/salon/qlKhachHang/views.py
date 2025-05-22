from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import KhachHang
from .serializers import KhachHangSerializer
from salon.cloudinary import upload_image
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView

# Create your views here.

class KhachHangViewSet(viewsets.ModelViewSet):
    queryset = KhachHang.objects.all()
    serializer_class = KhachHangSerializer
    parser_classes = (MultiPartParser, FormParser)

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

    @action(detail=True, methods=['delete'], url_path='delete')
    def delete_khachhang(self, request, pk=None):
        try:
            khachhang = self.get_object()
            khachhang.delete()
            return Response({'message': 'Xoá khách hàng thành công!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': f'Xoá khách hàng thất bại: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

class KhachHangByUserView(APIView):
    def get(self, request, user_id):
        kh = KhachHang.objects.filter(user_id=user_id).first()
        if not kh:
            return Response({'error': 'Không tìm thấy khách hàng'}, status=404)
        return Response(KhachHangSerializer(kh).data)

