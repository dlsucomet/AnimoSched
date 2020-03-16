# Generated by Django 3.0.4 on 2020-03-12 09:37

import api.managers
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20200312_0911'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='user',
            managers=[
                ('objects', api.managers.UserManager()),
            ],
        ),
        migrations.RenameField(
            model_name='user',
            old_name='id_num',
            new_name='username',
        ),
    ]