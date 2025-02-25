from django.conf import settings  
from django.conf.urls.static import static  
from django.contrib import admin  
from django.urls import path, include  # Import 'include' to connect app URLs

urlpatterns = [  
    path('admin/', admin.site.urls),  
    path('', include('shop.urls')),  # Include URLs from shop app
]  

# Serve media files during development
if settings.DEBUG:  
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
