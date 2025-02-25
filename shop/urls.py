from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),  
    path('designs/', views.designs, name='designs'),  
    path('contact/', views.contact, name='contact'),  # ✅ Now contact view exists
    path('reviews/', views.customer_reviews, name='customer_reviews'),
]
