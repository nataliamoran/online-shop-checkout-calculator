import json
from typing import Dict

from django.test import TestCase, Client
from rest_framework.reverse import reverse

from .models import *
from . import models


class CalcClient:
    def __init__(self):
        self.client = Client()

    def product_list(self):
        return self.client.get(reverse('products-list'))

    def order_list(self):
        return self.client.get(reverse('orders-list'))

    def order_create(self, order_data: Dict):
        return self.client.post(reverse('orders-list'),
                                json.dumps(order_data),
                                content_type='application/json')


class TestCalc(TestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.category = models.Category.objects.create(title='dairy')
        cls.product = models.Product.objects.create(title='milk', category=cls.category, price=10)
        models.Product.objects.create(title='yogurt', category=cls.category, price=15)
        models.Discount.objects.create(min=10, discount=0.05)
        models.Discount.objects.create(min=100, discount=0.2)
        models.Discount.objects.create(min=50, discount=0.13)
        models.Discount.objects.create(min=20, discount=0.1)
        cls.cli = CalcClient()

    def test_product_list__green(self):
        # arrange
        # act
        res = self.cli.product_list()
        # assert
        self.assertEquals(200, res.status_code)
        self.assertEquals(2, len(res.data))

    def test_order_list__green(self):
        # arrange
        models.Order.objects.create(subtotal=10, tax=0.15, discount=0, total=11.5)
        # act
        res = self.cli.order_list()
        # assert
        self.assertEquals(200, res.status_code)
        self.assertEquals(1, len(res.data))

    def test_create_order__green(self):
        # arrange
        res = self.cli.product_list()
        order_data = {}
        for item in res.data:
            order_data[item['id']] = 2
        # act
        res = self.cli.order_create(order_data)
        # assert
        self.assertEquals(201, res.status_code)
        self.assertEquals(50, res.data['subtotal'])
        self.assertEquals(0.13, res.data['discount'])
        self.assertEquals(0.15, res.data['tax'])
        self.assertEquals(50.025, res.data['total'])

    def test_create_order__empty_order__returns_400_bad_request(self):
        # arrange
        order_data = {}
        # act
        res = self.cli.order_create(order_data)
        # assert
        self.assertEquals(400, res.status_code)

    def test_create_order__some_bad_product_ids__green(self):
        # arrange
        res = self.cli.product_list()
        order_data = {}
        for item in res.data:
            order_data[item['id']] = 2
        order_data[10000] = 2
        order_data["bad id"] = 2
        # act
        res = self.cli.order_create(order_data)
        # assert
        self.assertEquals(201, res.status_code)
        self.assertEquals(50, res.data['subtotal'])
        self.assertEquals(0.13, res.data['discount'])
        self.assertEquals(0.15, res.data['tax'])
        self.assertEquals(50.025, res.data['total'])

    def test_create_order__only_bad_product_id__returns_400_bad_request(self):
        # arrange
        order_data = {10000: 2, "bad id": 2}
        # act
        res = self.cli.order_create(order_data)
        # assert
        self.assertEquals(400, res.status_code)

    def test_model_str__green(self):
        # arrange
        # act
        # assert
        self.assertEquals('dairy', self.category.__str__())
        self.assertEquals('milk', self.product.__str__())
