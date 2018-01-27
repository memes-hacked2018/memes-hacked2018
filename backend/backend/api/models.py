from django.db import models

# Create your models here.

class memes(models.Model):
    name = models.CharField(max_length=255, blank=False)
    url = models.CharField(max_length=255, blank=False)


class tags(models.Model):

    name = models.CharField(max_length=255, blank=False)
    probability = models.IntegerField()
    memesId = models.IntegerField()