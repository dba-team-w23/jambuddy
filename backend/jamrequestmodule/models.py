from django.db import models

# Create your models here.


class Instrument(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)

    def __str__(self):
        return str(self.name)
