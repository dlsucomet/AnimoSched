# Generated by Django 3.0.4 on 2020-03-23 12:58

import api.managers
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('timestamp', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
            },
            managers=[
                ('objects', api.managers.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Building',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bldg_name', models.CharField(max_length=100)),
                ('bldg_code', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='College',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('college_code', models.CharField(max_length=12, unique=True)),
                ('college_name', models.CharField(max_length=120, unique=True)),
                ('timestamp', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'college',
                'verbose_name_plural': 'colleges',
            },
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course_code', models.CharField(max_length=8)),
                ('course_name', models.CharField(max_length=120)),
                ('course_desc', models.TextField()),
                ('units', models.IntegerField()),
                ('timestamp', models.DateTimeField(auto_now=True)),
                ('college', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.College')),
            ],
            options={
                'verbose_name': 'course',
                'verbose_name_plural': 'courses',
            },
        ),
        migrations.CreateModel(
            name='CourseOffering',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('term', models.IntegerField()),
                ('start_AY', models.IntegerField()),
                ('end_AY', models.IntegerField()),
                ('current_enrolled', models.IntegerField()),
                ('max_enrolled', models.IntegerField()),
                ('status', models.BooleanField()),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Course')),
            ],
        ),
        migrations.CreateModel(
            name='CoursePriority',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('priority', models.BooleanField()),
                ('courses', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Course')),
            ],
        ),
        migrations.CreateModel(
            name='Day',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day_name', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Faculty',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('section_code', models.CharField(max_length=3)),
            ],
        ),
        migrations.CreateModel(
            name='Timeslot',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('begin_time', models.TimeField()),
                ('end_time', models.TimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('courseOfferings', models.ManyToManyField(to='api.CourseOffering')),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room_type', models.CharField(max_length=50)),
                ('room_capacity', models.IntegerField()),
                ('building', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Building')),
            ],
        ),
        migrations.CreateModel(
            name='Preference',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('earliest_class_time', models.TimeField(null=True, verbose_name='earliest class time')),
                ('latest_class_time', models.TimeField(null=True, verbose_name='latest class time')),
                ('break_length', models.TimeField(null=True, verbose_name='break length')),
                ('min_courses', models.IntegerField(null=True, verbose_name='min courses per day')),
                ('max_courses', models.IntegerField(null=True, verbose_name='max courses per day')),
                ('course_priority', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.CoursePriority')),
                ('preferred_buildings', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Building')),
                ('preferred_days', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Day')),
                ('preferred_faculty', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Faculty')),
                ('preferred_sections', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Section')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'preference',
                'verbose_name_plural': 'preferences',
            },
        ),
        migrations.CreateModel(
            name='Degree',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('degree_code', models.CharField(max_length=8, unique=True)),
                ('degree_name', models.CharField(max_length=120, unique=True)),
                ('timestamp', models.DateTimeField(auto_now=True)),
                ('college', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.College')),
            ],
            options={
                'verbose_name': 'degree',
                'verbose_name_plural': 'degrees',
            },
        ),
        migrations.AddField(
            model_name='courseoffering',
            name='day',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Day'),
        ),
        migrations.AddField(
            model_name='courseoffering',
            name='faculty',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Faculty'),
        ),
        migrations.AddField(
            model_name='courseoffering',
            name='room',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Room'),
        ),
        migrations.AddField(
            model_name='courseoffering',
            name='section',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Section'),
        ),
        migrations.AddField(
            model_name='courseoffering',
            name='timeslot',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Timeslot'),
        ),
        migrations.AddField(
            model_name='user',
            name='college',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.College'),
        ),
        migrations.AddField(
            model_name='user',
            name='degree',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Degree'),
        ),
        migrations.AddField(
            model_name='user',
            name='schedules',
            field=models.ManyToManyField(to='api.Schedule'),
        ),
    ]
