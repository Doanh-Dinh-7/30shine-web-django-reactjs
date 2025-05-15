from rest_framework import serializers
from .models import KhachHang
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class KhachHangSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    Email = serializers.EmailField(required=False)

    class Meta:
        model = KhachHang
        fields = ['MaKH', 'user', 'HoTenKH', 'SDT', 'Email', 'DiaChi']

    def create(self, validated_data):
        user_data = validated_data.pop('user', None)
        user = None
        if user_data:
            user = User.objects.create_user(**user_data)
        khachhang = KhachHang.objects.create(user=user, **validated_data)
        return khachhang

    def update(self, instance, validated_data):
        # Cập nhật email cho cả User và KhachHang nếu có
        email = validated_data.get('Email', None)
        if email:
            instance.Email = email
            if instance.user:
                instance.user.email = email
                instance.user.save()
        # Cập nhật các trường còn lại
        for attr, value in validated_data.items():
            if attr != 'Email':
                setattr(instance, attr, value)
        instance.save()
        return instance 