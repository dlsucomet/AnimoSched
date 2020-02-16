from django import forms
from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth.models import User
from .models import User

class SignUpForm(UserCreationForm):
    email = forms.EmailField(help_text='Required. Enter a valid email address.')
    first_name = forms.CharField(max_length=100)
    last_name = forms.CharField(max_length=100)
    id_number = forms.CharField(max_length=8)

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'password1', 'password2', )