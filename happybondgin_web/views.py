from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Sum, Count
from django.utils import timezone
from .models import User, UserDocument, UserTransactions, BankCard
from django.http import JsonResponse
from datetime import datetime

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
    # Get filter parameters from request
    current_year = timezone.now().year
    current_month = timezone.now().month
    
    selected_year = int(request.GET.get('year', current_year))
    # Convert month number to month name
    months = ['January', 'February', 'March', 'April', 'May', 'June',
             'July', 'August', 'September', 'October', 'November', 'December']
    selected_month_num = int(request.GET.get('month', current_month))
    selected_month = months[selected_month_num - 1]
    
    # Filter transactions by year and month name
    transactions_list = UserTransactions.objects.filter(
        year=selected_year,
        month=selected_month
    ).order_by('-created_at')
    
    # Calculate totals for the filtered month
    total_amount = transactions_list.aggregate(Sum('amount'))['amount__sum'] or 0
    
    # Get available years for the dropdown
    available_years = UserTransactions.objects.values_list('year', flat=True).distinct().order_by('year')
    if not available_years:
        available_years = [current_year]
    
    # Get all members for the transaction form
    members = User.objects.all().order_by('username')
    
    context = {
        'monthly_payments': transactions_list,
        'total_amount': total_amount,
        'selected_year': selected_year,
        'selected_month': selected_month_num,
        'available_years': available_years,
        'members': members,  # Add members to context
    }
    return render(request, 'happybondgin_web/transactions.html', context)

@login_required
def add_transaction(request):
    if request.method != 'POST':
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)
    
    if request.user.role != 'admin':
        return JsonResponse({'status': 'error', 'message': 'Permission denied'}, status=403)
    
    try:
        # Get form data
        user_id = request.POST.get('user')
        receiver_id = request.POST.get('receiver')
        amount = request.POST.get('amount')
        month = request.POST.get('month')
        year = request.POST.get('year')
        bank_name = request.POST.get('bank_name')
        payment_status = request.POST.get('payment_status')
        payment_date = request.POST.get('payment_date')
        
        # Validate required fields
        if not all([user_id, receiver_id, amount, month, year, bank_name, payment_status, payment_date]):
            return JsonResponse({'status': 'error', 'message': 'All fields are required'}, status=400)
        
        # Convert payment_date to timezone-aware datetime
        try:
            aware_payment_date = timezone.make_aware(
                datetime.strptime(payment_date, '%Y-%m-%dT%H:%M'),
                timezone=timezone.get_current_timezone()
            )
        except ValueError:
            return JsonResponse({'status': 'error', 'message': 'Invalid payment date format'}, status=400)
        
        # Create transaction
        transaction = UserTransactions.objects.create(
            user_id=user_id,
            receiver_id=receiver_id,
            amount=amount,
            month=month,
            year=year,
            bank_name=bank_name,
            payment_status=payment_status,
            payment_date=aware_payment_date  # Use the timezone-aware datetime
        )
        
        return JsonResponse({
            'status': 'success',
            'message': 'Transaction added successfully',
            'transaction_id': transaction.id
        })
        
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@login_required
def settings(request):
    return render(request, 'happybondgin_web/settings.html')

@login_required
def documents(request):
    if request.method == 'POST':
        document_name = request.POST.get('document_name')
        document_file = request.FILES.get('document_file')
        
        if not document_name:
            messages.error(request, 'Please provide a document name.')
            return redirect('happybondgin_web:documents')
            
        if not document_file:
            messages.error(request, 'Please select a file to upload.')
            return redirect('happybondgin_web:documents')
        
        try:
            UserDocument.objects.create(
                user=request.user,
                document_name=document_name,
                document_file=document_file
            )
            messages.success(request, 'Document uploaded successfully!')
        except Exception as e:
            messages.error(request, f'Error uploading document: {str(e)}')
        
        return redirect('happybondgin_web:documents')
    
    user_documents = UserDocument.objects.filter(user=request.user).order_by('-uploaded_at')
    return render(request, 'happybondgin_web/documents.html', {'documents': user_documents})

@login_required
def delete_document(request, document_id):
    try:
        document = get_object_or_404(UserDocument, id=document_id, user=request.user)
        document.delete()
        messages.success(request, 'Document deleted successfully!')
        return JsonResponse({'status': 'success'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@login_required
def member_details(request, member_id):
    if request.user.role != 'admin':
        return JsonResponse({'status': 'error', 'message': 'Permission denied'}, status=403)
    
    try:
        member = User.objects.get(id=member_id)
        data = {
            'id': member.id,
            'username': member.username,
            'email': member.email,
            'phone_number': member.phone_number,
            'present_address': member.present_address,
            'role': member.role,
            'is_active': member.is_active,
            'created_at': member.created_at.isoformat(),
            'profile_picture': member.profile_picture.url if member.profile_picture else None,
        }
        return JsonResponse(data)
    except User.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Member not found'}, status=404)

@login_required
def update_member(request, member_id):
    if request.user.role != 'admin':
        return JsonResponse({'status': 'error', 'message': 'Permission denied'}, status=403)
    
    if request.method != 'POST':
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)
    
    try:
        member = User.objects.get(id=member_id)
        
        # Update member details
        member.username = request.POST.get('username', member.username)
        member.email = request.POST.get('email', member.email)
        member.phone_number = request.POST.get('phone_number', member.phone_number)
        member.present_address = request.POST.get('present_address', member.present_address)
        member.role = request.POST.get('role', member.role)
        member.is_active = request.POST.get('is_active') == 'on'
        
        member.save()
        messages.success(request, 'Member updated successfully!')
        return JsonResponse({'status': 'success'})
    except User.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Member not found'}, status=404)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@login_required
def delete_member(request, member_id):
    if request.user.role != 'admin':
        return JsonResponse({'status': 'error', 'message': 'Permission denied'}, status=403)
    
    if request.method != 'POST':
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)
    
    try:
        member = User.objects.get(id=member_id)
        
        # Don't allow deleting yourself
        if member.id == request.user.id:
            return JsonResponse({'status': 'error', 'message': 'Cannot delete your own account'}, status=400)
        
        member.delete()
        messages.success(request, 'Member deleted successfully!')
        return JsonResponse({'status': 'success'})
    except User.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Member not found'}, status=404)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@login_required
def transaction_details(request, transaction_id):
    if request.user.role != 'admin':
        return JsonResponse({'status': 'error', 'message': 'Permission denied'}, status=403)
    
    try:
        transaction = get_object_or_404(UserTransactions, id=transaction_id)
        data = {
            'status': 'success',
            'payment': {
                'user_id': transaction.user_id,
                'receiver_id': transaction.receiver_id,
                'amount': str(transaction.amount),
                'month': transaction.month,
                'year': transaction.year,
                'bank_name': transaction.bank_name,
                'payment_status': transaction.payment_status,
                'payment_date': transaction.payment_date.strftime('%Y-%m-%dT%H:%M') if transaction.payment_date else '',
            }
        }
        return JsonResponse(data)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@login_required
def edit_transaction(request, transaction_id):
    if request.method != 'POST':
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)
    
    if request.user.role != 'admin':
        return JsonResponse({'status': 'error', 'message': 'Permission denied'}, status=403)
    
    try:
        transaction = get_object_or_404(UserTransactions, id=transaction_id)
        
        # Get form data
        user_id = request.POST.get('user')
        receiver_id = request.POST.get('receiver')
        amount = request.POST.get('amount')
        month = request.POST.get('month')
        year = request.POST.get('year')
        bank_name = request.POST.get('bank_name')
        payment_status = request.POST.get('payment_status')
        payment_date = request.POST.get('payment_date')
        
        # Validate required fields
        if not all([user_id, receiver_id, amount, month, year, bank_name, payment_status, payment_date]):
            return JsonResponse({'status': 'error', 'message': 'All fields are required'}, status=400)
        
        # Convert payment_date to timezone-aware datetime
        try:
            aware_payment_date = timezone.make_aware(
                datetime.strptime(payment_date, '%Y-%m-%dT%H:%M'),
                timezone=timezone.get_current_timezone()
            )
        except ValueError:
            return JsonResponse({'status': 'error', 'message': 'Invalid payment date format'}, status=400)
        
        # Update transaction
        transaction.user_id = user_id
        transaction.receiver_id = receiver_id
        transaction.amount = amount
        transaction.month = month
        transaction.year = year
        transaction.bank_name = bank_name
        transaction.payment_status = payment_status
        transaction.payment_date = aware_payment_date
        transaction.save()
        
        return JsonResponse({
            'status': 'success',
            'message': 'Transaction updated successfully'
        })
        
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

@login_required
def delete_transaction(request, transaction_id):
    if request.method != 'POST':
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)
    
    if request.user.role != 'admin':
        return JsonResponse({'status': 'error', 'message': 'Permission denied'}, status=403)
    
    try:
        transaction = get_object_or_404(UserTransactions, id=transaction_id)
        transaction.delete()
        return JsonResponse({
            'status': 'success',
            'message': 'Transaction deleted successfully'
        })
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
