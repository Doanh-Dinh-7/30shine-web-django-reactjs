from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import KhachHangViewSet

router = DefaultRouter()
router.register(r'', KhachHangViewSet, basename='khachhang')

urlpatterns = [
    path('', include(router.urls)),
] 