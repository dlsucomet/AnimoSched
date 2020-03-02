from django.urls import path, re_path, include
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    # re_path(r'^profile/(?P<id_number>[0-9]*)/edit/', views.edit_profile, name='edit_profile'),
    # re_path(r'^profile/(?P<id_number>[0-9]*)/', views.profile, name='profile'),
    path('profile/', views.profile, name='profile'),
    path('profile/edit/', views.edit_profile, name='edit_profile'),
    path('preferences/', views.preferences, name='preferences'),
    path('generate_schedule/', views.generate_schedule, name='generate_schedule'),
    path('signup/', views.signup, name='signup'),
    path('', include('django.contrib.auth.urls')),
]