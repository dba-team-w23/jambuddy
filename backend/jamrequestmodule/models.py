from django.db import models
from django.contrib.auth.models import User

class Users(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    lastlogin = models.DateTimeField(auto_now_add=True)
    fname = models.CharField(max_length=255)
    lname = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    street2 = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zipcode = models.CharField(max_length=255)
    phone = models.CharField(max_length=255, null=True)
    email = models.CharField(max_length=255)
    photo = models.CharField(max_length=255, null=True)
    note = models.TextField(null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.fname + ' ' + self.lname


class ExperienceLevel(models.Model):
    level = models.CharField(max_length=255)

    def __str__(self):
        return str(self.level)


class Instrument(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)

    def __str__(self):
        return str(self.name)


class MusicGenre(models.Model):
    genre = models.CharField(max_length=255)
    
    def __str__(self):
        return self.genre


class JamRequest(models.Model):
    userid = models.ForeignKey(Users, on_delete=models.CASCADE)
    instrumentid = models.ForeignKey(Instrument, on_delete=models.CASCADE)
    genreid = models.ForeignKey(MusicGenre, on_delete=models.CASCADE)
    location = models.CharField(max_length=255)
    exp_level = models.ForeignKey(ExperienceLevel, on_delete=models.CASCADE)
    status = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)


class JamResponse(models.Model):
    jrid = models.ForeignKey(JamRequest, on_delete=models.CASCADE)
    userid = models.ForeignKey(Users, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    note = models.TextField()
    status = models.CharField(max_length=255)


class UserGenre(models.Model):
    userid = models.ForeignKey(Users, on_delete=models.CASCADE)
    genreid = models.ForeignKey(MusicGenre, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.userid) + "-" + str(self.genreid)


class UserInstrument(models.Model):
    userid = models.ForeignKey(Users, on_delete=models.CASCADE)
    instrumentid = models.ForeignKey(Instrument, on_delete=models.CASCADE)
    exp_level = models.ForeignKey(ExperienceLevel, on_delete=models.CASCADE)


class UserMedia(models.Model):
    userid = models.ForeignKey(Users, on_delete=models.CASCADE)
    type = models.CharField(max_length=1)
    location = models.CharField(max_length=255)
    seconds = models.IntegerField()

    def __str__(self):
        return f"{self.user} - {self.location}"


class UserReview(models.Model):
    userid = models.ForeignKey(Users, on_delete=models.CASCADE)
    reviewerid = models.ForeignKey(Users, related_name='reviewee', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField()
    comment = models.TextField(null=True)
