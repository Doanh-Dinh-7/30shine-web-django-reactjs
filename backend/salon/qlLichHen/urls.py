from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LichHenViewSet, HoanThanhLichHenAPIView

router = DefaultRouter()
router.register(r'', LichHenViewSet, basename='lichhen')

urlpatterns = [
    path('', include(router.urls)),
    path('<int:pk>/hoanthanh/', HoanThanhLichHenAPIView.as_view(), name='lichhen-hoanthanh'),
] 