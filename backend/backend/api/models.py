from django.db import models

# Create your models here.

class Meme(models.Model):
    name = models.CharField(max_length=255, blank=False)
    url = models.CharField(max_length=255, blank=False)


class Tag(models.Model):

    name = models.CharField(max_length=255, blank=False)
    probability = models.IntegerField()
    meme = models.ForeignKey(Meme, related_name='tags', on_delete=models.CASCADE)