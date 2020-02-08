from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .common import *

# Create your models here.


class RolePermission(models.Model):

    value = models.CharField(max_length=32)


class SystemRole(models.Model):

    name = models.CharField(max_length=32)
    permissions = models.ManyToManyField('RolePermission')


class SiteUser(AbstractBaseUser):

    email = models.EmailField(max_length=64)
    phone_number = models.CharField(max_length=32)
    role = models.ForeignKey('SystemRole', on_delete=models.SET_NULL, null=True)


class AbstractDataUser(models.Model):

    name = models.CharField(null=True, max_length=32)
    last_name = models.CharField(null=True, max_length=32)
    patronymic = models.CharField(null=True, max_length=32)
    birthdate = models.DateField(null=True, max_length=32)
    photo = models.FileField() # for demo

    class Meta:
        abstract = True


class TeacherUser(AbstractDataUser):

    position = models.CharField(max_length=32)
    user = models.ForeignKey('SiteUser', on_delete=models.CASCADE)
    score = models.IntegerField()
    school = models.ForeignKey('school.School', on_delete=models.SET_NULL, null=True)


class StudentUser(AbstractDataUser):

    test_result = models.ForeignKey('marketplace.Branch', on_delete=models.SET_NULL, null=True)
    school = models.ForeignKey('school.School', on_delete=models.SET_NULL, null=True)
    city = models.CharField(max_length=32)
    user = models.ForeignKey('SiteUser', on_delete=models.CASCADE)
    image = models.FileField() # for demo
    parent = models.ForeignKey('ParentUser', on_delete=models.SET_NULL, null=True)
    number = models.CharField(max_length=32)


class ParentUser(AbstractDataUser):

    test_result = models.ForeignKey('marketplace.Branch', on_delete=models.SET_NULL, null=True)


class Guid(AbstractDataUser):

    type_of_teaching = models.CharField(choices=TYPE_OF_TEACHING, max_length=32)
    turoperator = models.ForeignKey('turoperator.Turoperator', on_delete=models.CASCADE)
    accredited = models.BooleanField(default=False)


class TuroperatorIntroducer(AbstractDataUser):

    user = models.ForeignKey('SiteUser', on_delete=models.CASCADE)
    turoperator = models.ForeignKey('turoperator.Turoperator', on_delete=models.CASCADE)

