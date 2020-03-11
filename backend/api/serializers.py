from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer

from .models import User, Course, College 

class CustomRegisterSerializer(RegisterSerializer):
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(write_only=True)
    name = serializers.CharField(required=True)
    date_of_birth = serializers.DateField(required=True)

    def get_cleaned_data(self):
        super(CustomRegisterSerializer, self).get_cleaned_data()

        return {
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'name': self.validated_data.get('name', ''),
            'date_of_birth': self.validated_data.get('date_of_birth', ''),
        }

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id','id_num','email','first_name','last_name','courses')

class CourseSerializer(serializers.ModelSerializer):
  class Meta:
    model = Course 
    fields = ('id', 'college','course_code', 'course_name', 'course_desc', 'units')

class CollegeSerializer(serializers.ModelSerializer):
  class Meta:
    model = College 
    fields = ('id', 'college_code', 'college_name')