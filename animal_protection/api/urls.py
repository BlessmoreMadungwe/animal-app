from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    UserViewSet,
    AnimalViewSet,
    RegisterView,
    dashboard_stats,
    send_message,
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'animals', AnimalViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('dashboard/', dashboard_stats, name='dashboard_stats'),
    path('contact/', send_message, name='contact_message'),
    path('send/', send_message, name='send_message'),

    # router routes like /api/animals/
    path('', include(router.urls)),
]
