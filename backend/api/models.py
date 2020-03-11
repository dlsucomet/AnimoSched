from django.db import models

from django.core.mail import send_mail
from django.core.validators import RegexValidator
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import ugettext_lazy as _

import datetime

class College(models.Model):
    college_code = models.CharField(max_length=12)
    college_name = models.CharField(max_length=120)
    timestamp = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('college')
        verbose_name_plural = _('colleges')

class Course(models.Model):
    course_code = models.CharField(max_length=8)
    college = models.ForeignKey(College, on_delete=models.CASCADE)
    course_name = models.CharField(max_length=120)
    course_desc = models.TextField()
    units = models.IntegerField()
    timestamp = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('course')
        verbose_name_plural = _('courses')

class User(AbstractBaseUser):
    username = None
    id_num = models.CharField(max_length=9, unique=True)
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    courses = models.ManyToManyField(Course)
    timestamp = models.DateTimeField(auto_now=True)

    # objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['id_num','first_name','last_name']

    class Meta:
        # ordering = ['id_num','last_name']
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):              
        return self.email

    