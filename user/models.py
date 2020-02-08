from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .common import *

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


class AbstractDataUser(models.Model):

    name = models.CharField(null=True)
    last_name = models.CharField(null=True)
    patronymic = models.CharField(null=True)
    birthdate = models.DateField(null=True)
    photo = models.ImageField() # for demo

    class Meta:
        abstract = True


class TeacherUser(AbstractDataUser):

    position = models.CharField()
    user = models.ForeignKey('SiteUser', on_delete=models.CASCADE)
    score = models.IntegerField()
    school = models.ForeignKey('school.School', on_delete=models.SET_NULL, null=True)


class StudentUser(AbstractDataUser):

    test_result = models.ForeignKey('marketplace.Branch', on_delete=models.SET_NULL, null=True)
    school = models.ForeignKey('school.School', on_delete=models.SET_NULL, null=True)
    city = models.CharField()
    user = models.ForeignKey('SiteUser', on_delete=models.CASCADE)
    image = models.FileField() # for demo
    parent = models.ForeignKey('ParentUser', on_delete=models.SET_NULL, null=True)
    number = models.CharField()


class ParentUser(AbstractDataUser):

    test_result = models.ForeignKey('marketplace.Branch', on_delete=models.SET_NULL, null=True)
    image = models.ImageField()


class Guid(AbstractDataUser):

    type_of_teaching = models.CharField(choices=TYPE_OF_TEACHING)
    turoperator = models.ForeignKey('turoperator.Turoperator', on_delete=models.CASCADE)
    accredited = models.BooleanField(default=False)


class TuroperatorIntroducer(AbstractDataUser):

    user = models.ForeignKey('SiteUser', on_delete=models.CASCADE)
    turoperator = models.ForeignKey('turoperator.Turoperator', on_delete=models.CASCADE)

