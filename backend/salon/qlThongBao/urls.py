from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ThongBaoViewSet

router = DefaultRouter()
router.register(r'', ThongBaoViewSet, basename='thongbao')

urlpatterns = [
    path('', include(router.urls)),
] 