# Generated by Django 3.2.17 on 2023-03-04 20:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jamrequestmodule', '0012_auto_20230304_1947'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jamrequest',
            name='status',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='jamrequest',
            name='zipcode',
            field=models.CharField(max_length=255, null=True),
        ),
    ]