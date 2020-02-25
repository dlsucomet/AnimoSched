from django.db import models

from django.core.mail import send_mail
from django.core.validators import RegexValidator
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import ugettext_lazy as _

from .managers import PreferenceListManager, UserManager

class User(AbstractBaseUser, PermissionsMixin):
    numeric = RegexValidator(r'^[0-9]*$', 'Only numeric characters are allowed.')

    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=100)
    last_name = models.CharField(_('last name'), max_length=100)
    id_number = models.CharField(_('id number'), max_length=8, validators=[numeric])
    college = models.CharField(_('college'), max_length=100) # temp
    course = models.CharField(_('course'), max_length=100) # temp
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('staff status'), default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ['id_number', 'last_name']
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def get_full_name(self):
        # returns the first_name plus the last_name, with a space in between.
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)

class PreferenceList(models.Model):
    earliest_class_time = models.TimeField(_('earliest class time'), null=True)
    latest_class_time = models.TimeField(_('latest class time'), null=True)
    # preferred_days
    break_length = models.TimeField(_('break length'), null=True)
    min_courses = models.IntegerField(_('min courses per day'), null=True)
    max_courses = models.IntegerField(_('max courses per day'), null=True)
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        primary_key=True)

    objects = PreferenceListManager()

    class Meta:
        verbose_name = _('preference list')
        verbose_name_plural = _('preference lists')