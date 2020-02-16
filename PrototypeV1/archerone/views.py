from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from archerone.forms import SignUpForm

def index(request):
    """View function for home page"""

    test_variable = 'ArcherOne'

    context = {
        'test_variable': test_variable,
    }

    # Render template index.html with the data in the context variable
    return render(request, 'index.html', context=context)

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            email = form.cleaned_data.get('email')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(email=email, password=raw_password)
            login(request, user)
            return redirect('index')
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})
