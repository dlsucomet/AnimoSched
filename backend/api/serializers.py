from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer

from .models import User, Course, College 

class CustomRegisterSerializer(RegisterSerializer):
    id_num = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    def get_cleaned_data(self):
        super(CustomRegisterSerializer, self).get_cleaned_data()

        return {
            'id_num': self.validated_data.get('id_num', ''),
            'email': self.validated_data.get('email', ''),
            'first_name': self.validated_data.get('first_name', ''),
            'last_name': self.validated_data.get('last_name', ''),
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