# Generated by Django 3.2.17 on 2023-03-04 20:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jamrequestmodule', '0013_auto_20230304_2010'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='jamrequest',
            name='zipcode',
        ),
    ]