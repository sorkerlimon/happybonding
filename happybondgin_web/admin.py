from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, UserDocument, UserTransactions, BankTransfer, BankCard

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'role', 'phone_number', 'created_at')
    list_filter = ('role', 'created_at')
    search_fields = ('username', 'email', 'phone_number')
    ordering = ('-created_at',)
    
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal Info', {'fields': ('phone_number', 'present_address', 'profile_picture')}),
        ('Permissions', {'fields': ('role', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'role'),
        }),
    )

@admin.register(UserDocument)
class UserDocumentAdmin(admin.ModelAdmin):
    list_display = ('user', 'document_name', 'verified', 'uploaded_at', 'verified_at')
    list_filter = ('verified', 'uploaded_at')
    search_fields = ('user__username', 'document_name')
    ordering = ('-uploaded_at',)

@admin.register(UserTransactions)
class UserTransactionsAdmin(admin.ModelAdmin):
    list_display = ('user', 'receiver', 'amount', 'month', 'year', 'payment_status', 'payment_date')
    list_filter = ('payment_status', 'month', 'year')
    search_fields = ('user__username', 'receiver__username', 'transaction_id')
    ordering = ('-created_at',)

@admin.register(BankTransfer)
class BankTransferAdmin(admin.ModelAdmin):
    list_display = ('user', 'from_bank_name', 'to_bank_name', 'amount', 'transfer_date', 'reference_number')
    list_filter = ('transfer_date', 'from_bank_name', 'to_bank_name')
    search_fields = ('user__username', 'reference_number')
    ordering = ('-transfer_date',)

@admin.register(BankCard)
class BankCardAdmin(admin.ModelAdmin):
    list_display = ('card_holder_name', 'bank_name', 'card_number', 'card_type', 'balance', 'card_status')
    list_filter = ('card_status', 'card_type', 'bank_name')
    search_fields = ('card_holder_name', 'card_number')
    ordering = ('-created_at',)
