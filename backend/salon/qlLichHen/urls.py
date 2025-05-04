from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LichHenViewSet

router = DefaultRouter()
router.register(r'', LichHenViewSet, basename='lichhen')

urlpatterns = [
    path('', include(router.urls)),
] 