from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer

from .models import User, Course, College, CoursePriority, Degree

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'email', 'first_name', 'last_name', 'college', 'degree')

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

class CustomRegisterSerializer(RegisterSerializer):
    # username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(write_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    # college = CollegeSerializer()
    college = serializers.PrimaryKeyRelatedField(queryset=College.objects.all(), required=False)
    degree = serializers.PrimaryKeyRelatedField(queryset=Degree.objects.all(), required=False)
    
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
            'college': self.validated_data.get('college', ''),
            'degree': self.validated_data.get('degree', ''),
        }