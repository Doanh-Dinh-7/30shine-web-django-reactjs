from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import KhachHangViewSet, KhachHangByUserView

router = DefaultRouter()
router.register(r'', KhachHangViewSet, basename='khachhang')

urlpatterns = [
    path('', include(router.urls)),
    path('user/<int:user_id>/', KhachHangByUserView.as_view()),
] 