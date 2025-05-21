from django.contrib.auth.models import User
from rest_framework import serializers
from qlKhachHang.models import KhachHang

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    sdt = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'password', 'sdt']

    def create(self, validated_data):
        sdt = validated_data.pop('sdt')
        
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        
        KhachHang.objects.create(user=user, HoTenKH=user.username, SDT=sdt)
        return user

class LoginSerializer(serializers.Serializer):
    sdt = serializers.CharField()
    password = serializers.CharField()

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField()
    new_password = serializers.CharField() 