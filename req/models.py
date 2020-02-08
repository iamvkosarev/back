from django.db import models

# Create your models here.

STATUSES = (
    ('ready', 'ready'),
    ('in', 'in')
)


class BidStatus(models.Model):

    value= models.CharField(choices=STATUSES)


class AbstractBid(models.Model):
    status = models.ForeignKey('BidStatus', on_delete=models.SET_NULL, null=True)


class BidAddParent(AbstractBid):

    children = models.ForeignKey('user.StudentUser', on_delete=models.CASCADE)
    call = models.CharField()


class BidToTuroperatFromGuid(AbstractBid):
    guid = models.ForeignKey('user.Guid', on_delete=models.CASCADE)
    turoperator = models.ForeignKey('turoperator.Turoperator', on_delete=models.CASCADE)


class BidToGosUslugi(AbstractBid):
    turoperator = models.ForeignKey('turoperator.Turoperator', on_delete=models.CASCADE)
