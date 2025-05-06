from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DanhGiaViewSet

router = DefaultRouter()
router.register(r'', DanhGiaViewSet, basename='danhgia')

urlpatterns = [
    path('', include(router.urls)),
] 