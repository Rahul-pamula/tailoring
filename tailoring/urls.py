import os
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

# ✅ Define urlpatterns first
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('shop.urls')),  # Ensure your shop app URLs are included
]

# ✅ Serve static & media files properly
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
    urlpatterns += static('/assets/',
                          document_root=os.path.join(settings.STATIC_ROOT, 'assets'))
