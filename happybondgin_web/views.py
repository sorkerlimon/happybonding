from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Sum, Count
from django.utils import timezone
from .models import User, UserDocument, UserTransactions, BankCard

# Create your views here.

def home(request):
    return render(request, 'happybondgin_web/home.html')

def user_login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, email=email, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('happybondgin_web:dashboard')
        else:
            messages.error(request, 'Invalid email or password.')
    
    return render(request, 'happybondgin_web/login.html')

@login_required
def user_logout(request):
    logout(request)
    messages.success(request, 'You have been successfully logged out.')
    return redirect('happybondgin_web:home')

@login_required
def dashboard(request):
    # Get all recent transactions without user filtering
    recent_transactions = UserTransactions.objects.all().order_by('-created_at')[:5]
    user_documents = UserDocument.objects.filter(user=request.user)
    
    # Calculate statistics
    total_balance = UserTransactions.objects.filter(payment_status='paid').aggregate(Sum('amount'))['amount__sum'] or 0
    total_transactions = UserTransactions.objects.count()  # Count all transactions
    active_cards = BankCard.objects.filter(card_status='active').count()
    pending_transactions = UserTransactions.objects.filter(payment_status='pending').count()

    context = {
        'current_date': timezone.now(),
        'recent_transactions': recent_transactions,
        'user_documents': user_documents,
        'total_balance': total_balance,
        'total_transactions': total_transactions,
        'active_cards': active_cards,
        'pending_transactions': pending_transactions,
    }
    return render(request, 'happybondgin_web/dashboard.html', context)

@login_required
def cards(request):
    # Get all cards without filtering by username since card_holder_name might be different
    user_cards = BankCard.objects.all().order_by('-created_at')
    return render(request, 'happybondgin_web/cards.html', {'cards': user_cards})

@login_required
def members(request):
    # Get all users except the current user
    all_users = User.objects.all().order_by('-created_at')
    return render(request, 'happybondgin_web/members.html', {'members': all_users})

@login_required
def transactions(request):
    # Get all transactions with optional filtering
    transactions_list = UserTransactions.objects.all().order_by('-created_at')
    
    # Calculate totals
    total_paid = UserTransactions.objects.filter(payment_status='paid').aggregate(Sum('amount'))['amount__sum'] or 0
    total_pending = UserTransactions.objects.filter(payment_status='pending').aggregate(Sum('amount'))['amount__sum'] or 0
    total_failed = UserTransactions.objects.filter(payment_status='failed').aggregate(Sum('amount'))['amount__sum'] or 0
    
    context = {
        'transactions': transactions_list,
        'total_paid': total_paid,
        'total_pending': total_pending,
        'total_failed': total_failed,
    }
    return render(request, 'happybondgin_web/transactions.html', context)

@login_required
def settings(request):
    return render(request, 'happybondgin_web/settings.html')
