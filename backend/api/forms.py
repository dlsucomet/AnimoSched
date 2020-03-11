from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
# from django.contrib.auth.models import User
from .models import User, PreferenceList

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('id_num','email','first_name','last_name')

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = UserChangeForm.Meta.fields

class SignUpForm(UserCreationForm):
    COLLEGES = [
        ('BAGCED', 'BAGCED'),
        ('CCS', 'CCS'),
        ('CLA', 'CLA'),
        ('COL', 'COL'),
        ('COS', 'COS'),
        ('GCOE', 'GCOE'),
        ('RVRCOB', 'RVRCOB'),
        ('SOE', 'SOE'),
        ]

    email = forms.EmailField(label='DLSU email', help_text='Required. Enter a valid DLSU email address.')
    first_name = forms.CharField(label='First name', max_length=100)
    last_name = forms.CharField(label='Last name', max_length=100)
    id_number = forms.CharField(label='ID number', max_length=8)
    college = forms.CharField(label='College', widget=forms.Select(choices=COLLEGES))
    course = forms.CharField(label='Course', max_length=100)

    def clean_email(self):
        data = self.cleaned_data['email']
        if "@dlsu.edu.ph" not in data:
            raise forms.ValidationError("Please enter a valid DLSU email address.")
        return data

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'id_number', 'college', 'course', 'password1', 'password2', )
    
class EditProfileForm(UserChangeForm):
    COLLEGES = [
        ('BAGCED', 'BAGCED'),
        ('CCS', 'CCS'),
        ('CLA', 'CLA'),
        ('COL', 'COL'),
        ('COS', 'COS'),
        ('GCOE', 'GCOE'),
        ('RVRCOB', 'RVRCOB'),
        ('SOE', 'SOE'),
        ]
    
    email = forms.EmailField(label='DLSU email', help_text='Required. Enter a valid DLSU email address.')
    first_name = forms.CharField(label='First name', max_length=100)
    last_name = forms.CharField(label='Last name', max_length=100)
    id_number = forms.CharField(label='ID number', max_length=8)
    college = forms.CharField(label='College', widget=forms.Select(choices=COLLEGES))
    course = forms.CharField(label='Course', max_length=100)

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'id_number', 'college', 'course')

class EditPreferenceForm(forms.ModelForm):
    DAYS = [
        ('M', 'M'),
        ('T', 'T'),
        ('W', 'W'),
        ('H', 'H'),
        ('F', 'F'),
        ]

    earliest_class_time = forms.TimeField(label='Earliest class time', required=False)
    latest_class_time = forms.TimeField(label='Latest class time', required=False)
    break_length = forms.TimeField(label='Break length', required=False)
    preferred_days = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple,choices=DAYS,required=False)
    min_courses = forms.IntegerField(label='Min. courses per day',required=False)
    max_courses = forms.IntegerField(label='Max. courses per day',required=False)

    class Meta:
        model = PreferenceList
        fields = ('earliest_class_time', 'latest_class_time', 'break_length', 'preferred_days', 'min_courses', 'max_courses')