# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2016-04-21 17:45
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20160421_1244'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='politica',
            options={'get_latest_by': 'revision', 'ordering': ('-revision',), 'verbose_name': 'Política', 'verbose_name_plural': 'Políticas'},
        ),
    ]
