# Generated by Django 3.2.17 on 2023-02-25 08:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('jamrequestmodule', '0006_userfavoritejamrequest'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserFavoriteProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('favorite_profileid', models.IntegerField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('profileid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
