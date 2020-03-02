from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from archerone.forms import SignUpForm, EditProfileForm, EditPreferenceForm
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

def profile(request):
    u = request.user
    args = {'u': u}
    return render(request, 'profile/profile.html', args)

def edit_profile(request):
    if request.method == 'POST':
        form = EditProfileForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            return redirect('profile')
    else:
        form = EditProfileForm(instance=request.user)
        args = {'form': form}
        return render(request, 'profile/profile_edit.html', args)

def preferences(request):
    instance = PreferenceList.objects.get(user=request.user)
    form = EditPreferenceForm(request.POST or None, instance=instance)
    if form.is_valid():
        form.save()
        return redirect('preferences')
    args = {'form': form}
    return render(request, 'profile/preferences.html', args)

def generate_schedule(request):

    context = {}

    query = ""
    if request.GET:
        query = request.GET[course_query]
        context['query'] = str(query)

    u = request.user
    args = {'u' : u}
    return render(request, 'schedule_management/generate_schedule.html', args)




        

    #     def profile(request, id_number):
    # u = 
    
    # # up = UserProfile.objects.get(created_by = u)
    # # cv = UserProfile.objects.filter(created_by = User.objects.get(pk=user))
    # # blog = New.objects.filter(created_by = u) 
    # # replies = Reply.objects.filter(reply_to = blog)
    # # vote = Vote.objects.filter(voted=blog)
    # # following = Relations.objects.filter(initiated_by = u)
    # # follower = Relations.objects.filter(follow = u)
        
    # return render(request, 'profile/profile.html', {
    #     'u':u,  
    #     # 'ing': following.order_by('-date_initiated'),  
    #     # 'er': follower.order_by('-date_follow'),
    #     # 'list':blog.order_by('-date'),
    #     # 'replies':replies
    #     })
