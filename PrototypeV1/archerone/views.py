from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from archerone.forms import SignUpForm
from archerone.models import User, PreferenceList

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
            list = PreferenceList(user=user)
            list.save()
            login(request, user)
            return redirect('index')
    else:
        form = SignUpForm()
    return render(request, 'signup.html', {'form': form})

def profile(request, id_number):
    u = User.objects.get(id_number=id_number)
    
    # up = UserProfile.objects.get(created_by = u)
    # cv = UserProfile.objects.filter(created_by = User.objects.get(pk=user))
    # blog = New.objects.filter(created_by = u) 
    # replies = Reply.objects.filter(reply_to = blog)
    # vote = Vote.objects.filter(voted=blog)
    # following = Relations.objects.filter(initiated_by = u)
    # follower = Relations.objects.filter(follow = u)
        
    return render(request, 'profile/private_profile.html', {
        'u':u,  
        # 'ing': following.order_by('-date_initiated'),  
        # 'er': follower.order_by('-date_follow'),
        # 'list':blog.order_by('-date'),
        # 'replies':replies
        })

# def preferences(request):
#     if request.method == 'POST':
#         form = PreferenceForm(request.POST)
#         if form.is_valid():
#             form.save()
#             email = form.cleaned_data.get('email')
#             raw_password = form.cleaned_data.get('password1')
#             user = authenticate(email=email, password=raw_password)
#             login(request, user)
#             return redirect('preferences')
#     else:
#         form = PreferenceForm()
#     return render(request, 'profile/preferences.html', {'form': form})
