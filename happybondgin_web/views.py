from django.shortcuts import render

# Create your views here.

def home(request):
    return render(request, 'happybondgin_web/home.html')
