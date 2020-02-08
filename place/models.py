from django.db import models

# Create your models here.


class Address(models.Model):

    city = models.CharField()
    region = models.CharField()
    street = models.CharField()
    building = models.CharField()
    index = models.IntegerField()

    google_place_id = models.CharField()
    lat = models.DecimalField(4, 5)
    lng = models.DecimalField(4, 5)

