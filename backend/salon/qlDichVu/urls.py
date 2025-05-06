from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DichVuViewSet

router = DefaultRouter()
router.register(r'', DichVuViewSet, basename='dichvu')

urlpatterns = [
    path('', include(router.urls)),
] 