from django.urls import path, re_path, include
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    re_path(r'^profile/(?P<id_number>[0-9]*)/', views.profile, name='profile'),
    path('preferences/', views.signup, name='preferences'),
    path('signup/', views.signup, name='signup'),
    path('', include('django.contrib.auth.urls')),
]