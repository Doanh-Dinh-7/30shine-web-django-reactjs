from rest_framework import serializers
from .models import NhanVien
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class NhanVienSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = NhanVien
        fields = ['MaNV', 'user', 'HoTenNV', 'SDT', 'DiaChi', 'GioiTinh']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        nhanvien = NhanVien.objects.create(user=user, **validated_data)
        return nhanvien

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save()
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance 