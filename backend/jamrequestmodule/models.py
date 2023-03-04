from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models

class Instrument(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)

    def __str__(self):
        return str(self.name)

class MusicGenre(models.Model):
    genre = models.CharField(max_length=255)

    def __str__(self):
        return self.genre

class ExperienceLevel(models.Model):
    level = models.CharField(max_length=255)

    def __str__(self):
        return str(self.level)

class Profile(AbstractUser):
    email = models.CharField(max_length=50, null=True)
    street = models.CharField(max_length=100, null=True)
    street2 = models.CharField(max_length=100, null=True)
    city = models.CharField(max_length=50, null=True)
    state = models.CharField(max_length=50, null=True)
    zipcode = models.CharField(max_length=10, null=True)
    country = models.CharField(max_length=50, null=True)
    phone = models.CharField(max_length=255, null=True)
    photo = models.CharField(max_length=255, null=True)
    note = models.TextField(null=True)
    created = models.DateTimeField(auto_now_add=True)
    instruments = models.ManyToManyField(Instrument, blank=True)
    genres = models.ManyToManyField(MusicGenre, blank=True)

    def instrument_names(self):
        return ', '.join([i.name for i in self.instruments.all()])    
    instrument_names.short_description = "InstrumentNames"

    def genre_names(self):
        return ', '.join([g.genre for g in self.genres.all()])    
    genre_names.short_description = "GenreNames"


class JamRequest(models.Model):
    profileid = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    instruments = models.ManyToManyField(Instrument, blank=True)
    genres = models.ManyToManyField(MusicGenre, blank=True)
    exp_level = models.ManyToManyField(ExperienceLevel, blank=True)
    note = models.TextField(null=True)
    status = models.CharField(max_length=255, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def instrument_names(self):
        return ', '.join([i.name for i in self.instruments.all()])    
    instrument_names.short_description = "InstrumentNames"

    def genre_names(self):
        return ', '.join([g.genre for g in self.genres.all()])    
    genre_names.short_description = "GenreNames"

    def exp_level_names(self):
        return ', '.join([x.level for x in self.exp_level.all()])    
    exp_level_names.short_description = "ExperienceLevels"


class JamResponse(models.Model):
    jrid = models.ForeignKey(JamRequest, on_delete=models.CASCADE)
    profileid = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    note = models.TextField()
    status = models.CharField(max_length=255)

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

class UserFavoriteJamRequest(models.Model):
    profileid = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    jrid = models.ForeignKey(JamRequest, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

class UserFavoriteProfile(models.Model):
    profileid = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    favorite_profileid = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
