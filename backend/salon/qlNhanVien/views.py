from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import NhanVien, LichLamViec
from .serializers import NhanVienSerializer, LichLamViecSerializer
from django_filters.rest_framework import DjangoFilterBackend
import csv
from django.utils.dateparse import parse_date
from datetime import time, datetime, timedelta

# Create your views here.

class NhanVienViewSet(viewsets.ModelViewSet):
    queryset = NhanVien.objects.all()
    serializer_class = NhanVienSerializer

    @action(detail=True, methods=['delete'], url_path='delete')
    def delete_nhanvien(self, request, pk=None):
        try:
            nhanvien = self.get_object()
            nhanvien.delete()
            return Response({'message': 'Xoá nhân viên thành công!'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': f'Xoá nhân viên thất bại: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)


class LichLamViecViewSet(viewsets.ModelViewSet):
    queryset = LichLamViec.objects.all()
    serializer_class = LichLamViecSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'NgayLam': ['gte', 'lte'],
    }

    @action(detail=False, methods=['get'], url_path='by-week')
    def by_week(self, request):
        week = int(request.query_params.get('week', 0))  # 0 là tuần hiện tại
        today = datetime.now().date()
        start_of_week = today - timedelta(days=today.weekday()) + timedelta(weeks=week)
        end_of_week = start_of_week + timedelta(days=6)
        queryset = LichLamViec.objects.filter(NgayLam__gte=start_of_week, NgayLam__lte=end_of_week)
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'week': week,
            'start': start_of_week,
            'end': end_of_week,
            'data': serializer.data
        })

    @action(detail=False, methods=['post'], url_path='import-csv')
    def import_csv(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)
        imported = 0
        errors = []
        # Đọc trực tiếp file từ request
        today = datetime.now().date()
        start_of_week = today - timedelta(days=today.weekday())
        end_of_week = start_of_week + timedelta(days=6)
        reader = csv.DictReader((line.decode('utf-8') for line in file))
        for idx, row in enumerate(reader, 1):
            try:
                ma_nv = row.get('MaNV') or row.get('Mã nhân viên')
                ngay_lam = row.get('NgayLam') or row.get('Ngày')
                gio_bat_dau = row.get('GioBatDau') or row.get('Giờ bắt đầu')
                gio_ket_thuc = row.get('GioKetThuc') or row.get('Giờ kết thúc')
                nv = NhanVien.objects.get(MaNV=ma_nv)
                ngay_lam = parse_date(ngay_lam)
                # Chỉ import nếu ngày thuộc tuần hiện tại
                if not (start_of_week <= ngay_lam <= end_of_week):
                    continue
                gio_bat_dau = time.fromisoformat(gio_bat_dau)
                gio_ket_thuc = time.fromisoformat(gio_ket_thuc)
                LichLamViec.objects.create(
                    MaNV=nv,
                    NgayLam=ngay_lam,
                    GioBatDau=gio_bat_dau,
                    GioKetThuc=gio_ket_thuc
                )
                imported += 1
            except Exception as e:
                errors.append(f"Dòng {idx}: {str(e)}")
        return Response({
            'imported': imported,
            'errors': errors
        }, status=status.HTTP_200_OK)
