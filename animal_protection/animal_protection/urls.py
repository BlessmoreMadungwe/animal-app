from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from django.conf.urls.static import static
from django.conf import settings

def home(request):
    return HttpResponse("Welcome to Animal Protection API")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),   # all API routes
    path('', home),  # 👈 homepage route (fixes 404)
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
