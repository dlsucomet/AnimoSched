from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets          
from .serializers import CustomRegisterSerializer, CourseOfferingSerializer, PreferenceSerializer, UserSerializer, CourseSerializer, DegreeSerializer, CollegeSerializer, CoursePrioritySerializer, DaySerializer, FacultySerializer, BuildingSerializer, SectionSerializer
from .models import User, Course, Degree, College, CoursePriority, Preference, Day, Faculty, Building, Section, CourseOffering
from .satsolver import solve
from rest_framework.response import Response
from rest_framework.views import APIView

class UserViewSet(viewsets.ModelViewSet):
  serializer_class = UserSerializer
  queryset = User.objects.all()              

class CourseViewSet(viewsets.ModelViewSet):       
  serializer_class = CourseSerializer 
  queryset = Course.objects.all()              

class DegreeViewSet(viewsets.ModelViewSet):       
  serializer_class = DegreeSerializer 
  queryset = Degree.objects.all()              

class CoursePriorityViewSet(viewsets.ModelViewSet):       
  serializer_class = CoursePrioritySerializer 
  queryset = CoursePriority.objects.all()              

class CollegeViewSet(viewsets.ModelViewSet):       
  serializer_class = CollegeSerializer 
  queryset = College.objects.all()              

class FacultyViewSet(viewsets.ModelViewSet):       
  serializer_class = FacultySerializer 
  queryset = Faculty.objects.all()              

class DayViewSet(viewsets.ModelViewSet):       
  serializer_class = DaySerializer
  queryset = Day.objects.all()              

class BuildingViewSet(viewsets.ModelViewSet):       
  serializer_class = BuildingSerializer 
  queryset = Building.objects.all()              

class SectionViewSet(viewsets.ModelViewSet):       
  serializer_class = SectionSerializer 
  queryset = Section.objects.all()              

class PreferenceViewSet(viewsets.ModelViewSet):       
  serializer_class = PreferenceSerializer 
  queryset = Preference.objects.all()              

class CourseOfferingViewSet(viewsets.ModelViewSet):       
  serializer_class = CourseOfferingSerializer 
  queryset = CourseOffering.objects.all()              

class PreferenceList(APIView):
    def get(self, request, pk, format=None):
        preferences = Preference.objects.filter(user=pk).filter(course_priority=None)
        serializer = PreferenceSerializer(preferences, many=True)
        return Response(serializer.data)

class CoursePriorityList(APIView):
    def get(self, request, pk, format=None):
        preferences = Preference.objects.filter(user=pk).exclude(course_priority=None)
        serializer = PreferenceSerializer(preferences, many=True)
        return Response(serializer.data)

class CourseOfferingsList(APIView):
    def get(self, request, pk, format=None):
        offerings = CourseOffering.objects.filter(course=pk)
        serializer = CourseOfferingSerializer(offerings, many=True)
        return Response(serializer.data)


def CallSolver(request):
  solve()
  return HttpResponse()