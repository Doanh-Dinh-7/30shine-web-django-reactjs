from django.urls import path
from .views import RegisterView, LoginView

urlpatterns = [
    path('dang-ky/', RegisterView.as_view(), name='dang-ky'),
    path('dang-nhap/', LoginView.as_view(), name='dang-nhap'),
] 