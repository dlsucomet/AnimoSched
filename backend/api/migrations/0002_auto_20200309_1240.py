# Generated by Django 3.0.4 on 2020-03-09 12:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=120)),
                ('password', models.TextField()),
            ],
        ),
        migrations.DeleteModel(
            name='Todo',
        ),
    ]
