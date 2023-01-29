from django.db import models


class Instrument(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)

    def __str__(self):
        return str(self.name)


class User(models.Model):
    fname = models.CharField(max_length=255)
    lname = models.CharField(max_length=255)
    street = models.CharField(max_length=255)
    street2 = models.CharField(max_length=255, null=True)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    zipcode = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    photo = models.CharField(max_length=255, null=True)
    note = models.CharField(max_length=255, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.fname


class ExperienceLevel(models.Model):
    level = models.CharField(max_length=255)


class MusicGenre(models.Model):
    genre = models.CharField(max_length=255)


class UserInstrument(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    instrument = models.ForeignKey(Instrument, on_delete=models.CASCADE)
    exp_level = models.ForeignKey(ExperienceLevel, on_delete=models.CASCADE)


class UserGenre(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    genre = models.ForeignKey(MusicGenre, on_delete=models.CASCADE)


class JamRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    instrument = models.ForeignKey(Instrument, on_delete=models.CASCADE)
    genre = models.ForeignKey(MusicGenre, on_delete=models.CASCADE)
    location = models.CharField(max_length=255)
    exp_level = models.ForeignKey(ExperienceLevel, on_delete=models.CASCADE)
    status = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now_add=True)


class JamResponse(models.Model):
    jam_request = models.ForeignKey(JamRequest, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    note = models.TextField()
    status = models.CharField(max_length=255)


class Instrument(models.Model):
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)


class UserReview(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reviewer = models.ForeignKey(User, related_name='reviewee', on_delete=models.CASCADE)
    created = models


class UserMedia(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=1)
    location = models.CharField(max_length=255)
    seconds = models.IntegerField()

    def __str__(self):
        return f"{self.user} - {self.location}"
