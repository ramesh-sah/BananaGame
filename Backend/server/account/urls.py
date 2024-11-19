# accounts/urls.py

from django.urls import path  
from .views import UserListCreateView, UserDetailView, UserLoginView, UserLogoutView  

urlpatterns = [  
    path('register/', UserListCreateView.as_view(), name='user-register'),  # Endpoint for user registration
    path('login/', UserLoginView.as_view(), name='user-login'),  # Endpoint for user login
    path('logout/', UserLogoutView.as_view(), name='user-logout'),  # Endpoint for user logout
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'),  # Endpoint for user detail (retrieve, update, delete)
]