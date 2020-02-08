from django.db import models

# Create your models here.


class Turoperator(models.Model):

    name = models.CharField()
    documents = models.ForeignKey('documents.Document', on_delete=models.SET_NULL, null=True)