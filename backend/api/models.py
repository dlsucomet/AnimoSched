from django.db import models

from django.core.mail import send_mail
from django.core.validators import RegexValidator
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import ugettext_lazy as _

from .managers import UserManager

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

class Faculty(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

class Section(models.Model):
    section_code = models.CharField(max_length=3)

class Building(models.Model):
    bldg_name = models.CharField(max_length=100)
    bldg_code = models.CharField(max_length=50)

class Room(models.Model):
    building = models.ForeignKey(Building, on_delete=models.CASCADE)
    room_type = models.CharField(max_length=50)
    room_capacity = models.IntegerField()

class Day(models.Model):
    day_name = models.CharField(max_length=10)

class Timeslot(models.Model): 
    begin_time = models.TimeField()
    end_time = models.TimeField()

class CourseOffering(models.Model):
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    day = models.ForeignKey(Day, on_delete=models.CASCADE)
    timeslot = models.ForeignKey(Timeslot, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    term = models.IntegerField()
    start_AY = models.IntegerField()
    end_AY = models.IntegerField()
    current_enrolled = models.IntegerField()
    max_enrolled = models.IntegerField()
    status = models.BooleanField()

class CoursePriority(models.Model):
    courses = models.ForeignKey(Course,on_delete=models.CASCADE)
    priority = models.BooleanField()

class Schedule(models.Model):
    courseOfferings = models.ManyToManyField(CourseOffering)

class User(AbstractBaseUser):
    # username = models.CharField(max_length=9) 
    username = None
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now=True)
    schedules = models.ManyToManyField(Schedule)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name','last_name']

    class Meta:
        # ordering = ['id_num','last_name']
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):              
        return self.email

class Preference(models.Model):
    earliest_class_time = models.TimeField(_('earliest class time'), null=True)
    latest_class_time = models.TimeField(_('latest class time'), null=True)
    preferred_days = models.ForeignKey(Day, on_delete=models.CASCADE, null=True)
    break_length = models.TimeField(_('break length'), null=True)
    min_courses = models.IntegerField(_('min courses per day'), null=True)
    max_courses = models.IntegerField(_('max courses per day'), null=True)
    preferred_faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, null=True) 
    preferred_buildings = models.ForeignKey(Building, on_delete=models.CASCADE, null=True)
    preferred_sections = models.ForeignKey(Section, on_delete=models.CASCADE, null=True)
    course_priority = models.ForeignKey(CoursePriority, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name = _('preference')
        verbose_name_plural = _('preferences')
    