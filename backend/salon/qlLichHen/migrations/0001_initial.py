# Generated by Django 4.2.8 on 2025-05-07 00:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('qlDichVu', '0001_initial'),
        ('qlKhachHang', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='LichHen',
            fields=[
                ('MaLH', models.AutoField(primary_key=True, serialize=False)),
                ('NgayDatLich', models.DateField()),
                ('GioDatLich', models.TimeField()),
                ('GioKhachDen', models.TimeField(blank=True, null=True)),
                ('TrangThai', models.CharField(max_length=50)),
                ('GhiChu', models.TextField(blank=True, null=True)),
                ('MaDV', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lich_hen', to='qlDichVu.dichvu')),
                ('MaKH', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lich_hen', to='qlKhachHang.khachhang')),
            ],
        ),
    ]
