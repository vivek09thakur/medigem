from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login, name='login'),
    path('register/', views.register, name='register'),
    path('token/refresh/', views.token_refresh, name='token_refresh'),
    path('chat/', views.chat, name='chat'),
]