from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HoaDonViewSet

router = DefaultRouter()
router.register(r'', HoaDonViewSet, basename='hoadon')

urlpatterns = [
    path('', include(router.urls)),
] 