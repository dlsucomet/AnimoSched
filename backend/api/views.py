from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import UserSerializer, CourseSerializer, CollegeSerializer 
from .models import User, Course, College
from rest_auth.registration.views import RegisterView

class UserViewSet(viewsets.ModelViewSet):
  serializer_class = UserSerializer
  queryset = User.objects.all()              

class CourseViewSet(viewsets.ModelViewSet):       
  serializer_class = CourseSerializer 
  queryset = Course.objects.all()              

class CollegeViewSet(viewsets.ModelViewSet):       
  serializer_class = CollegeSerializer 
  queryset = College.objects.all()              