from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, ChangePasswordSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework import serializers
from django.core.mail import send_mail

# Create your views here.

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )
        if user is not None:
            refresh = RefreshToken.for_user(user)
            user_data = UserSerializer(user).data
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_data
            })
        return Response({'error': 'Sai tài khoản hoặc mật khẩu'}, status=status.HTTP_400_BAD_REQUEST)

class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

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
    permission_classes = [IsAuthenticated]

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
            from qlKhachHang.models import KhachHang
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
