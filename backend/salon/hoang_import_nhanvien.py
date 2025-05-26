import os
import django

# Cấu hình Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'salon.settings')
django.setup()

# Import models sau khi đã cấu hình settings
from django.contrib.auth.models import User
from qlNhanVien.models import NhanVien

def create_nhan_vien():
    # Create Users
    users = [
        {'username': 'truongthaibao', 'password': 'hoang12345', 'email': 'bao@gmail.com'},
        {'username': 'hovantruong', 'password': 'hoang12345', 'email': 'truong@gmail.com'},
    ]

    created_users = []
    for user_data in users:
        user = User.objects.create_user(
            username=user_data['username'],
            password=user_data['password'],
            email=user_data['email']
        )
        created_users.append(user)

    # Create NhanVien
    nhan_vien = [
        {
            'user': created_users[0],
            'HoTenNV': 'Trương Thái Bảo',
            'SDT': '0914306897',
            'DiaChi': '03 Nguyễn Văn Linh - Hòa Cường Nam - Hải Châu - Đà Nẵng',
            'GioiTinh': 'Nam'
        },
        {
            'user': created_users[1],
            'HoTenNV': 'Hồ Văn Trường',
            'SDT': '0914306557',
            'DiaChi': '33 Mỹ An 1 - Mỹ An - Ngũ Hành Sơn - Đà Nẵng',
            'GioiTinh': 'Nam'
        }
    ]

    for nv in nhan_vien:
        NhanVien.objects.create(**nv)

if __name__ == '__main__':
    create_nhan_vien() 