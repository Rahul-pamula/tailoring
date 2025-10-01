from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('designs/', views.designs, name='designs'),
    # ✅ Now contact view exists
    path('contact/', views.contact, name='contact'),
    path('reviews/', views.customer_reviews, name='customer_reviews'),
    # API endpoints
    path('api/designs/', views.api_designs, name='api_designs'),
    path('api/reviews/', views.api_reviews, name='api_reviews'),
]
