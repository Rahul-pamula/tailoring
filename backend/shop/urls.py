from django.urls import path
from . import views
from . import api_views

from django.contrib.auth import views as auth_views

urlpatterns = [
    path('designs/', views.design_list, name='design_list'),
    path('logout/', auth_views.LogoutView.as_view(next_page='/'), name='logout'),
    
    # API Endpoints
    path('api/designs/', api_views.DesignListAPI.as_view(), name='api_design_list'),
    path('api/reviews/', api_views.ReviewListCreateAPI.as_view(), name='api_review_list_create'),
]
