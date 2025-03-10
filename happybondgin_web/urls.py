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
    path('members/<int:member_id>/details/', views.member_details, name='member_details'),
    path('members/<int:member_id>/update/', views.update_member, name='update_member'),
    path('members/<int:member_id>/delete/', views.delete_member, name='delete_member'),
    path('transactions/', views.transactions, name='transactions'),
    path('transactions/add/', views.add_transaction, name='add_transaction'),
    path('transactions/<int:transaction_id>/details/', views.transaction_details, name='transaction_details'),
    path('transactions/<int:transaction_id>/edit/', views.edit_transaction, name='edit_transaction'),
    path('transactions/<int:transaction_id>/delete/', views.delete_transaction, name='delete_transaction'),
    path('documents/', views.documents, name='documents'),
    path('documents/<int:document_id>/delete/', views.delete_document, name='delete_document'),
    path('settings/', views.settings, name='settings'),
] 