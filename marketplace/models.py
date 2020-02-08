from django.db import models

# Create your models here.


class Route(models.Model):
    branches = models.ManyToManyField('Branch')
    name = models.CharField()


class Branch(models.Model):
    name = models.CharField()