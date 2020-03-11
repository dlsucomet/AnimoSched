from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import CustomRegisterSerializer, UserSerializer, CourseSerializer, CollegeSerializer 
from .models import User, Course, College


class UserViewSet(viewsets.ModelViewSet):
  serializer_class = UserSerializer
  queryset = User.objects.all()              

class CourseViewSet(viewsets.ModelViewSet):       
  serializer_class = CourseSerializer 
  queryset = Course.objects.all()              

class CollegeViewSet(viewsets.ModelViewSet):       
  serializer_class = CollegeSerializer 
  queryset = College.objects.all()              