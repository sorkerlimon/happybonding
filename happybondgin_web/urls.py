from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

app_name = 'happybondgin_web'

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('cards/', views.cards, name='cards'),
    path('members/', views.members, name='members'),
    path('transactions/', views.transactions, name='transactions'),
    path('settings/', views.settings, name='settings'),
] 