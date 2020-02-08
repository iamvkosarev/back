from django.db import models

# Create your models here.


class Route(models.Model):
    branches = models.ManyToManyField('Branch')
    name = models.CharField(max_length=32)


class Branch(models.Model):
    name = models.CharField(max_length=32)