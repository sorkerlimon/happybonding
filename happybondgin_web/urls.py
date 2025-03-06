from django.urls import path
from . import views

app_name = 'happybondgin_web'

urlpatterns = [
    path('', views.home, name='home'),
] 