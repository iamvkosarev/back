from django.db import models
# Create your models here.


class School(models.Model):

    name = models.CharField()
    address = models.ForeignKey('place.Address', on_delete=models.SET_NULL, null=True)
