from django.db import migrations
from django.contrib.auth.models import User

def create_sample_nhanvien(apps, schema_editor):
    NhanVien = apps.get_model('qlNhanVien', 'NhanVien')
    users = [
        {'username': 'nv001', 'email': 'nv001@example.com'},
        {'username': 'nv002', 'email': 'nv002@example.com'},
        {'username': 'nv003', 'email': 'nv003@example.com'},
        {'username': 'nv004', 'email': 'nv004@example.com'},
        {'username': 'nv005', 'email': 'nv005@example.com'},
    ]
    names = [
        'Nguyễn Anh Tú',
        'Trần Minh Khoa',
        'Lê Thị Hồng',
        'Phạm Quốc Đạt',
        'Vũ Minh Châu',
    ]
    for i in range(5):
        user, _ = User.objects.get_or_create(username=users[i]['username'], defaults={'email': users[i]['email']})
        NhanVien.objects.get_or_create(user=user, HoTenNV=names[i], SDT='0123456789', DiaChi='01 An Hoà 4', GioiTinh='Nam')

def reverse_func(apps, schema_editor):
    NhanVien = apps.get_model('qlNhanVien', 'NhanVien')
    User = apps.get_model('auth', 'User')
    for username in ['nv001', 'nv002', 'nv003', 'nv004', 'nv005']:
        try:
            user = User.objects.get(username=username)
            NhanVien.objects.filter(user=user).delete()
            user.delete()
        except Exception:
            pass

class Migration(migrations.Migration):
    dependencies = [
        ('qlNhanVien', '0001_initial'),
    ]
    operations = [
        migrations.RunPython(create_sample_nhanvien, reverse_func),
    ] 