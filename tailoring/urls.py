from django.conf import settings  
from django.conf.urls.static import static  
from django.contrib import admin  
from django.urls import path, include  

urlpatterns = [  
    path('admin/', admin.site.urls),  
    path('', include('shop.urls')),  
]

# ✅ Serve media files even in production
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# Serve media files during development
if settings.DEBUG:  
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
