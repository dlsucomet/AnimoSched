from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email

from .models import User, Course, College, CoursePriority, Degree, Preference

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'email', 'first_name', 'last_name', 'college', 'degree', 'is_active')

class CollegeSerializer(serializers.ModelSerializer):
  class Meta:
    model = College 
    fields = ('id', 'college_code', 'college_name')

class DegreeSerializer(serializers.ModelSerializer):
  class Meta:
    model = Degree 
    fields = ('id', 'degree_code', 'degree_name', 'college')

class CourseSerializer(serializers.ModelSerializer):
  class Meta:
    model = Course 
    fields = ('id', 'college','course_code', 'course_name', 'course_desc', 'units')

class CoursePrioritySerializer(serializers.ModelSerializer):
  class Meta:
    model = CoursePriority 
    fields = ('id', 'courses')

class PreferenceSerializer(serializers.ModelSerializer):
  class Meta:
    model = Preference
    fields = ('id', 'earliest_class_time', 'latest_class_time', 'preferred_days', 'break_length', 'min_courses', 'max_courses', 'preferred_faculty', 'preferred_buildings', 'preferred_sections', 'course_priority', 'user')


class CustomRegisterSerializer(RegisterSerializer):
    # username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(write_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    # college = CollegeSerializer()
    college = serializers.PrimaryKeyRelatedField(queryset=College.objects.all(), required=True)
    degree = serializers.PrimaryKeyRelatedField(queryset=Degree.objects.all(),required=True)
    
    def validate_email(self, value):
        if "@dlsu.edu.ph" not in value:
            raise serializers.ValidationError("Please enter a valid DLSU email address.")
        return value

    def get_cleaned_data(self):
        super(CustomRegisterSerializer, self).get_cleaned_data()

        return {
            # 'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1',''),
            'email': self.validated_data.get('email', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
            'college': self.validated_data.get('college',''),
            'degree': self.validated_data.get('degree','') 
        }
    def save(self, request):
      adapter = get_adapter()
      user = adapter.new_user(request)
      self.cleaned_data = self.get_cleaned_data()
      user.college = self.get_cleaned_data().get('college')
      user.degree = self.get_cleaned_data().get('degree')
      adapter.save_user(request, user, self)
      self.custom_signup(request, user)
      setup_user_email(request, user, [])
      return user

