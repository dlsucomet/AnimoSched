# Generated by Django 3.0.4 on 2020-03-12 11:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20200312_1108'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(default=1, max_length=9),
            preserve_default=False,
        ),
    ]