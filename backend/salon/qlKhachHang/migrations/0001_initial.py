# Generated by Django 4.2.8 on 2025-05-20 08:05

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='KhachHang',
            fields=[
                ('MaKH', models.AutoField(primary_key=True, serialize=False)),
                ('HoTenKH', models.CharField(max_length=100)),
                ('SDT', models.CharField(max_length=20)),
                ('Email', models.EmailField(max_length=255)),
                ('DiaChi', models.CharField(blank=True, max_length=255, null=True)),
                ('AnhDaiDien', models.CharField(blank=True, max_length=255, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='khachhang', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
