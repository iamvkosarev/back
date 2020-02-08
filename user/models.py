from django.db import models
from django.contrib.auth.models import AbstractBaseUser
# Create your models here.


class RolePermission(models.Model):

    value = models.CharField()


class SystemRole(models.Model):

    name = models.CharField()
    permissions = models.ManyToManyField('RolePermission', null=True)


class SiteUser(AbstractBaseUser):

    email = models.EmailField(max_length=64)
    phone_number = models.CharField()
    role = models.ForeignKey('SystemRole', on_delete=models.SET_NULL, null=True)


class Document(models.Model):

    doc1 = models.CharField()


class AbstractDataUser(models.Model):

    name = models.CharField(null=True)
    last_name = models.CharField(null=True)
    patronymic = models.CharField(null=True)
    birthdate = models.DateField(null=True)

    class Meta:
        abstract = True



class TeacherUser(AbstractDataUser):

    position = models.CharField()
