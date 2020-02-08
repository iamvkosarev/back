from django.db import models

# Create your models here.


class Route(models.Model):
    branches = models.ManyToManyField('Branch')
    name = models.CharField(max_length=64)


class Branch(models.Model):
    name = models.CharField(max_length=64)
    description = models.TextField(max_length=512, null=True)