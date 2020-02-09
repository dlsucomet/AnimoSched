from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.index, name='login'),
    path('signup/', views.index, name='signup'),
    # path('profile/', views.index, name='profile'),
]