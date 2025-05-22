from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LichHenViewSet, HoanThanhLichHenAPIView, NhanVienTheoLichAPIView

router = DefaultRouter()
router.register(r'', LichHenViewSet, basename='lichhen')

urlpatterns = [
    path('nhan-vien-theo-lich/', NhanVienTheoLichAPIView.as_view()),
    path('', include(router.urls)),
    path('<int:pk>/hoanthanh/', HoanThanhLichHenAPIView.as_view(), name='lichhen-hoanthanh'),
] 