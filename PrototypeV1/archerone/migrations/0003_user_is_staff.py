# Generated by Django 3.0.3 on 2020-02-19 08:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('archerone', '0002_auto_20200216_2050'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_staff',
            field=models.BooleanField(default=False, verbose_name='staff status'),
        ),
    ]