from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets          
from .serializers import CustomRegisterSerializer, PreferenceSerializer, UserSerializer, CourseSerializer, DegreeSerializer, CollegeSerializer, CoursePrioritySerializer
from .models import User, Course, Degree, College, CoursePriority, Preference
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

class PreferenceViewSet(viewsets.ModelViewSet):       
  serializer_class = PreferenceSerializer 
  queryset = Preference.objects.all()              

class PreferenceList(APIView):
    def get(self, request, pk, format=None):
        preferences = Preference.objects.filter(user=pk).filter(course_priority=None)
        serializer = PreferenceSerializer(preferences, many=True)
        return Response(serializer.data)


def initialize(request):
  # try:
  #   ccs = College(college_code='CCS', college_name='College of Computer Studies')
  #   cla = College(college_code='CLA', college_name='College of Liberal Arts')
  #   cos = College(college_code='COS', college_name='College of Science')
  #   gcoe = College(college_code='GCOE', college_name='Gokongwei College of Engineering')
  #   soe = College(college_code='SOE', college_name='School of Economics')
  #   bagced = College(college_code='BAGCED', college_name='Br. Andrew Gonzalez College of Education')
  #   rvrcob = College(college_code='RVRCOB', college_name='Ramon V. Del Rosario College of Business')
  #   ccs.save()
  #   cla.save()
  #   cos.save()
  #   gcoe.save()
  #   soe.save()
  #   bagced.save()
  #   rvrcob.save()
  #   Degree(degree_code='BS CS', degree_name='Bachelor of Science in Computer Science', college=ccs).save()
  #   Degree(degree_code='BS IT', degree_name='Bachelor of Science in Information Technology', college=ccs).save()
  #   Degree(degree_code='BS-PSY', degree_name='Bachelor of Science in Psychology', college=cla).save()
  #   Degree(degree_code='AB-SOC', degree_name='Bachelor of Arts in Sociology', college=cla).save()
  #   Degree(degree_code='AEI-BSA', degree_name='Bachelor of Science in Applied Economics, Major in Industrial Economics and Bachelor of Science in Accountancy', college=soe).save()
  #   Degree(degree_code='AEI-ADV', degree_name='Bachelor of Science in Applied Economics, Major in Industrial Economics and Bachelor of Science in Advertising Management', college=soe).save()
  # except Exception as e:
  #   print(e)
  solve()
  return HttpResponse()