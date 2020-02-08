from django.db import models
from common import branches
# Create your models here

TYPES = (
    ('', ''),
    ('', ''),
)


class Place(models.Model):

    google_maps_place_id = models.CharField(max_length=32)


class PlatformImage(models.Model):
    image = models.FileField() # for demo
    name = models.CharField(max_length=32)


class Platform(models.Model):

    place = models.ForeignKey('place', on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=32)
    p_type = models.CharField(choices=TYPES, max_length=32)
    description = models.TextField(max_length=32)
    images = models.ManyToManyField('PlatformImage')

