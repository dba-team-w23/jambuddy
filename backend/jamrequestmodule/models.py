from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from datetime import datetime

class Profile(AbstractUser):
    email = models.CharField(max_length=255)
    street = models.CharField(max_length=255, null=True)
    street2 = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255, null=True)
    state = models.CharField(max_length=255, null=True)
    zipcode = models.CharField(max_length=255, null=True)
    phone = models.CharField(max_length=255, null=True)
    photo = models.CharField(max_length=255, null=True)
    note = models.TextField(null=True)
    created = models.DateTimeField(auto_now_add=True)
    instruments = models.TextField(null=True)
    genres = models.TextField(null=True)
    exp_level = models.TextField(null=True)

class ExperienceLevel(models.Model):
    level = models.CharField(max_length=255)

    def __str__(self):
        return str(self.level)


class Instrument(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)

    def __str__(self):
        return str(self.name)


class ProfilePhoto(models.Model):
    profile_id = models.ForeignKey(Profile, on_delete=models.CASCADE)
    url_link = models.URLField()
    is_primary = models.BooleanField(default=False)
    created_date = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return f'Photo: {self.url_link}'


class MusicGenre(models.Model):
    genre = models.CharField(max_length=255)

    def __str__(self):
        return self.genre


class JamRequest(models.Model):
    profileid = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    instrumentid = models.ForeignKey(Instrument, on_delete=models.CASCADE)
    genreid = models.ForeignKey(MusicGenre, on_delete=models.CASCADE)
    location = models.CharField(max_length=255)
    exp_level = models.ForeignKey(ExperienceLevel, on_delete=models.CASCADE)
    status = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)
    instrument = models.TextField(null=True)
    genre = models.TextField(null=True)
    exp_level = models.TextField(null=True)


class JamResponse(models.Model):
    jrid = models.ForeignKey(JamRequest, on_delete=models.CASCADE)
    profileid = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    note = models.TextField()
    status = models.CharField(max_length=255)


class UserGenre(models.Model):
    profileid = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    genreid = models.ForeignKey(MusicGenre, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.userid) + "-" + str(self.genreid)


class UserInstrument(models.Model):
    profileid = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    instrumentid = models.ForeignKey(Instrument, on_delete=models.CASCADE)
    exp_level = models.ForeignKey(ExperienceLevel, on_delete=models.CASCADE)


class UserMedia(models.Model):
    profileid = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    type = models.CharField(max_length=1)
    location = models.CharField(max_length=255)
    seconds = models.IntegerField()

    def __str__(self):
        return f"{self.user} - {self.location}"


class UserReview(models.Model):
    profileid = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    reviewerid = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='reviewee', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField()
    comment = models.TextField(null=True)
