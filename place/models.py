from django.db import models
from common import branches
# Create your models here

TYPES = (
    ('', ''),
    ('', ''),
)


class Place(models.Model):

    google_maps_place_id = models.CharField()


class PlatformImage(models.Model):
    image = models.FileField() # for demo
    name = models.CharField()


class Platform(models.Model):

    place = models.ForeignKey('place', on_delete=models.SET_NULL, null=True)
    name = models.CharField()
    p_type = models.CharField(choices=TYPES)
    description = models.TextField()
    images = models.ManyToManyField('PlatformImage')

