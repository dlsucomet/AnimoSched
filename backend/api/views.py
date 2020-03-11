from django.shortcuts import render
from rest_framework import viewsets          
# from .serializers import UserSerializer      
from .serializers import PreferenceSerializer      
# from .models import User 
from .models import Preference, User
from rest_auth.registration.views import RegisterView

class CustomRegisterView(RegisterView):
    queryset = User.objects.all()          

class PreferenceView(viewsets.ModelViewSet):       
  serializer_class = PreferenceSerializer          
  queryset = Preference.objects.all()              