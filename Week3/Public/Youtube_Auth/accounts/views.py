from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from .forms import RegisterForm
from django.contrib import messages
from django.contrib.auth.models import User

# Simulated token dict
fake_token_db = {}

def register_view(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False  # Require verification
            user.save()
            token = f"token-{user.username}"
            fake_token_db[token] = user.username
            return redirect(f'/verify/{token}')
    else:
        form = RegisterForm()
    return render(request, 'register.html', {'form': form})

def verify_view(request, token):
    username = fake_token_db.get(token)
    if username:
        user = User.objects.get(username=username)
        user.is_active = True
        user.save()
        messages.success(request, "Account Verified Successfully!")
    return render(request, 'verify.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('dashboard')  
        else:
            messages.error(request, 'Invalid username or password.')

    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('/login')

@login_required
def dashboard_view(request):
    return render(request, 'dashboard.html')
