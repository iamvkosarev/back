from django.db import models

# Create your models here.


class Document(models.Model):

    doc1 = models.CharField(max_length=32, null=True)
