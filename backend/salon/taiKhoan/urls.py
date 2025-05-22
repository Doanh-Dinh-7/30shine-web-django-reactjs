from django.urls import path
from .views import RegisterView, LoginView, ChangePasswordView, UserProfileView, ForgotPasswordView, DashboardRevenueView, DashboardTopServicesView, DashboardAppointmentView, DashboardRevenueByMonthView
 
urlpatterns = [
    path('dang-ky/', RegisterView.as_view(), name='dang-ky'),
    path('dang-nhap/', LoginView.as_view(), name='dang-nhap'),
    path('doi-mat-khau/', ChangePasswordView.as_view(), name='doi-mat-khau'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('quen-mat-khau/', ForgotPasswordView.as_view(), name='quen-mat-khau'),
    path('dashboard-revenue/', DashboardRevenueView.as_view(), name='dashboard-revenue'),
    path('dashboard-top-services/', DashboardTopServicesView.as_view(), name='dashboard-top-services'),
    path('dashboard-appointments/', DashboardAppointmentView.as_view(), name='dashboard-appointments'),
    path('dashboard-revenue-by-month/', DashboardRevenueByMonthView.as_view(), name='dashboard-revenue-by-month'),
] 