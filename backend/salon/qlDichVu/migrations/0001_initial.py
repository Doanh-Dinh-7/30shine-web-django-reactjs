# Generated by Django 4.2.8 on 2025-05-07 00:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DichVu',
            fields=[
                ('MaDV', models.AutoField(primary_key=True, serialize=False)),
                ('TenDV', models.CharField(max_length=100)),
                ('MoTa', models.TextField(blank=True, null=True)),
                ('GiaTien', models.DecimalField(decimal_places=2, max_digits=12)),
                ('ThoiGianLamDV', models.IntegerField(help_text='Thời gian làm dịch vụ (phút)')),
            ],
        ),
    ]
