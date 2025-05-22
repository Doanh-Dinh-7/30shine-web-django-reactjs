from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NhanVienViewSet, LichLamViecViewSet, NhanVienByUserView

router = DefaultRouter()
router.register(r'', NhanVienViewSet, basename='nhanvien')
router.register(r'lich-lam-viec', LichLamViecViewSet, basename='lichlamviec')

urlpatterns = [
    path('', include(router.urls)),
    path('user/<int:user_id>/', NhanVienByUserView.as_view()),
] 