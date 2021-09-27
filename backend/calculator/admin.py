from django.contrib import admin

from .models import *


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'image', 'price', )


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', )


@admin.register(Discount)
class DiscountAdmin(admin.ModelAdmin):
    list_display = ('id', 'min', 'discount', )


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'subtotal', 'tax', 'discount', 'total', 'created_at', )
