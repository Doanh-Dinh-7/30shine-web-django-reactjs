from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, ChangePasswordSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework import serializers
from django.core.mail import send_mail
from qlKhachHang.models import KhachHang
from qlHoaDon.models import HoaDon, ChiTietHoaDon
from qlDichVu.models import DichVu
from qlLichHen.models import LichHen
from qlNhanVien.models import NhanVien
from django.db.models import Sum, Count
from django.utils import timezone

# Create your views here.

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        sdt = serializer.validated_data['sdt']
        password = serializer.validated_data['password']
        # Đăng nhập khách hàng
        if len(sdt) == 10 and sdt.startswith('0'):
            kh = KhachHang.objects.filter(SDT=sdt).first()
            if not kh:
                return Response({'error': 'Số điện thoại không tồn tại'}, status=status.HTTP_400_BAD_REQUEST)
            user = kh.user
            if user and user.check_password(password):
                refresh = RefreshToken.for_user(user)
                user_data = UserSerializer(user).data
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': user_data
                })
            return Response({'error': 'Sai số điện thoại hoặc mật khẩu'}, status=status.HTTP_400_BAD_REQUEST)
        # Đăng nhập admin
        elif sdt.startswith('admin'):
            user = authenticate(username=sdt, password=password)
            if user is not None:
                refresh = RefreshToken.for_user(user)
                user_data = UserSerializer(user).data
                return Response({
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user': user_data
                })
            return Response({'error': 'Sai tài khoản hoặc mật khẩu'}, status=status.HTTP_400_BAD_REQUEST)
        # Không hợp lệ
        else:
            return Response({'error': 'Tài khoản không hợp lệ'}, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(APIView):

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = request.user
        if not user.check_password(serializer.validated_data['old_password']):
            return Response({'error': 'Mật khẩu cũ không đúng'}, status=400)
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response({'success': 'Đổi mật khẩu thành công'})

class UserProfileView(APIView):

    def get(self, request):
        return Response(UserSerializer(request.user).data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False, allow_blank=True)
    sdt = serializers.CharField(required=False, allow_blank=True)
    new_password = serializers.CharField(required=False)

    def validate(self, data):
        if not data.get('email') and not data.get('sdt'):
            raise serializers.ValidationError('Phải nhập email hoặc số điện thoại')
        return data

class ForgotPasswordView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data.get('email')
        sdt = serializer.validated_data.get('sdt')
        new_password = serializer.validated_data.get('new_password')
        if email:
            # Kiểm tra user có email này không
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({'error': 'Email không tồn tại'}, status=400)
            if new_password:
                user.set_password(new_password)
                user.save()
                return Response({'success': 'Đã đặt lại mật khẩu thành công qua email'})
            # Gửi email xác nhận (giả lập)
            send_mail(
                'Xác nhận quên mật khẩu',
                'Bạn vừa yêu cầu quên mật khẩu. Vui lòng làm theo hướng dẫn để đặt lại mật khẩu.',
                'no-reply@salon.com',
                [email],
                fail_silently=True,
            )
            return Response({'success': 'Đã gửi email xác nhận'})
        elif sdt:
            # Kiểm tra user có SDT này không (tìm trong KhachHang)
            kh = KhachHang.objects.filter(SDT=sdt).first()
            print(kh)
            if not kh:
                return Response({'error': 'Số điện thoại không tồn tại'}, status=400)
            if new_password:
                user = kh.user
                user.set_password(new_password)
                user.save()
                return Response({'success': 'Đã đặt lại mật khẩu thành công qua số điện thoại'})
            return Response({'success': 'Đã xác nhận số điện thoại'})

        return Response({'error': 'Phải nhập email hoặc số điện thoại'}, status=400)

class DashboardRevenueView(APIView): # Doanh thu hoá đơn
    permission_classes = [AllowAny]
    def get(self, request):
        today = timezone.now().date()
        month = today.month
        year = today.year
        total_revenue = HoaDon.objects.filter(TrangThaiTT=1).aggregate(Sum('TongTien'))['TongTien__sum'] or 0
        total_invoice = HoaDon.objects.filter(TrangThaiTT=1).count()
        new_customers = KhachHang.objects.filter().count()
        return Response({
            'total_revenue': total_revenue,
            'total_invoice': total_invoice,
            'new_customers': new_customers,
        })

class DashboardTopServicesView(APIView): # Dịch vụ hot
    permission_classes = [AllowAny]
    def get(self, request):
        top_services = (ChiTietHoaDon.objects
            .values('MaDV__TenDV')
            .annotate(total=Sum('SoLuong'))
            .order_by('-total')[:5])
        return Response({'top_services': list(top_services)})

class DashboardAppointmentView(APIView): # Nhân viên hiệu suất
    permission_classes = [AllowAny]
    def get(self, request):
        today = timezone.now().date()
        total_appointments = LichHen.objects.filter(NgayDatLich=today).count()
        completed_appointments = LichHen.objects.filter(NgayDatLich=today, TrangThai=1).count()
        top_staff = (NhanVien.objects
            .annotate(total=Count('lich_lam_viec'))
            .order_by('-total')[:3]
            .values('HoTenNV', 'total'))
        return Response({
            'total_appointments': total_appointments,
            'completed_appointments': completed_appointments,
            'top_staff': list(top_staff),
        })

class DashboardRevenueByMonthView(APIView): # Doanh thu theo tháng
    permission_classes = [AllowAny]
    def get(self, request):
        year = timezone.now().year
        data = []
        for month in range(1, 13):
            total = HoaDon.objects.filter(
                TrangThaiTT=1,
                NgayLapHD__year=year,
                NgayLapHD__month=month
            ).aggregate(Sum('TongTien'))['TongTien__sum'] or 0
            data.append({
                'month': month,
                'total_revenue': total
            })
        return Response({'revenue_by_month': data})
