from django.db import models


class Category(models.Model):
    title = models.CharField(max_length=255)

    def __str__(self):
        return self.title


class Product(models.Model):
    title = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=False, null=False, related_name='+')
    image = models.ImageField(upload_to='media/', blank=True, null=True)
    price = models.FloatField()

    def __str__(self):
        return self.title


class Discount(models.Model):
    min = models.FloatField()
    discount = models.FloatField()


class Order(models.Model):
    subtotal = models.FloatField(blank=False, null=False)
    tax = models.FloatField(blank=False, null=False)
    discount = models.FloatField(blank=False, null=False)
    total = models.FloatField(blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
