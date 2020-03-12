from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import CustomRegisterSerializer, UserSerializer, CourseSerializer, CollegeSerializer, LowCourseSerializer, HighCourseSerializer 
from .models import User, Course, College, HighPriorityCourseList, LowPriorityCourseList


class UserViewSet(viewsets.ModelViewSet):
  serializer_class = UserSerializer
  queryset = User.objects.all()              

class CourseViewSet(viewsets.ModelViewSet):       
  serializer_class = CourseSerializer 
  queryset = Course.objects.all()              

class HighCourseViewSet(viewsets.ModelViewSet):       
  serializer_class = HighCourseSerializer 
  queryset = HighPriorityCourseList.objects.all()              

class LowCourseViewSet(viewsets.ModelViewSet):       
  serializer_class = LowCourseSerializer 
  queryset = LowPriorityCourseList.objects.all()              

class CollegeViewSet(viewsets.ModelViewSet):       
  serializer_class = CollegeSerializer 
  queryset = College.objects.all()              