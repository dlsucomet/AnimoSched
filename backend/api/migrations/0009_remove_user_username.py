# Generated by Django 3.0.4 on 2020-03-12 11:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_user_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='username',
        ),
    ]