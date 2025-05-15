from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import NhanVien, LichLamViec
from .serializers import NhanVienSerializer, LichLamViecSerializer
from django_filters.rest_framework import DjangoFilterBackend
import csv
from django.utils.dateparse import parse_date
from datetime import time
from django.core.files.storage import default_storage

class NhanVienViewSet(viewsets.ModelViewSet):
    queryset = NhanVien.objects.all()
    serializer_class = NhanVienSerializer

class LichLamViecViewSet(viewsets.ModelViewSet):
    queryset = LichLamViec.objects.all()
    serializer_class = LichLamViecSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = {
        'NgayLam': ['gte', 'lte'],
    }

    @action(detail=False, methods=['post'], url_path='import-csv')
    def import_csv(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({'error': 'No file uploaded'}, status=status.HTTP_400_BAD_REQUEST)
        file_path = default_storage.save('tmp/lichlamviec.csv', file)
        imported = 0
        errors = []
        with default_storage.open(file_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for idx, row in enumerate(reader, 1):
                try:
                    ma_nv = row.get('MaNV') or row.get('Mã nhân viên')
                    ngay_lam = row.get('NgayLam') or row.get('Ngày')
                    gio_bat_dau = row.get('GioBatDau') or row.get('Giờ bắt đầu')
                    gio_ket_thuc = row.get('GioKetThuc') or row.get('Giờ kết thúc')
                    nv = NhanVien.objects.get(MaNV=ma_nv)
                    ngay_lam = parse_date(ngay_lam)
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
        default_storage.delete(file_path)
        return Response({
            'imported': imported,
            'errors': errors
        }, status=status.HTTP_200_OK)