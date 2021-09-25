from django.db import models


class Category(models.Model):
    title = models.CharField(max_length=255)


class Product(models.Model):
    title = models.CharField(max_length=255)
    category = models.ForeignKey(Category,
                                 on_delete=models.CASCADE,
                                 blank=False,
                                 null=False,
                                 related_name='+')
    image = models.ImageField(
        upload_to='media/',
        blank=False,
        null=False)
    price = models.IntegerField()


class Discount(models.Model):
    min = models.IntegerField()
    discount = models.IntegerField()
