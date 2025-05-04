from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NhanVienViewSet

router = DefaultRouter()
router.register(r'', NhanVienViewSet, basename='nhanvien')

urlpatterns = [
    path('', include(router.urls)),
] 