from .models import *
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['id', 'title', ]


class DiscountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Discount
        fields = ['id', 'min', 'discount', ]


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = ['id', 'title', 'category', 'image', 'price', ]


class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ['id', 'subtotal', 'tax', 'discount', 'total', 'created_at', ]