from rest_framework.response import Response

from .models import *
from .serializers import ProductSerializer, OrderSerializer, CategorySerializer
from rest_framework import viewsets, status
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

TAX = 0.15


class CsrfExemptSessionAuthentication(SessionAuthentication):
    # from https://stackoverflow.com/questions/30871033/django-rest-framework-remove-csrf
    def enforce_csrf(self, request):
        return


class ProductView(viewsets.ModelViewSet):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CategoryView(viewsets.ModelViewSet):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class OrderView(viewsets.ModelViewSet):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        """
        Overrides base 'create' method to calculate a total & subtotal for an order
        """
        # calculate an order subtotal & total
        all_products = Product.objects.all()
        all_discounts = Discount.objects.all()
        subtotal = 0
        for product_id in request.data:
            if not product_id.isdigit():
                continue
            products = all_products.filter(id=product_id)
            subtotal += products[0].price * request.data[product_id] if products else 0
        if subtotal == 0:  # cannot create an order with zero subtotal
            return Response(status=status.HTTP_400_BAD_REQUEST)
        discounts = all_discounts.filter(min__lte=subtotal).order_by('-min')
        discount = discounts[0].discount if discounts else 0
        subtotal_with_discount = subtotal - subtotal * discount
        total = subtotal_with_discount + subtotal_with_discount * TAX
        order_data = {
            "subtotal": subtotal,
            "tax": TAX,
            "discount": discount,
            "total": total
        }
        # save a new order to the db
        serializer = self.get_serializer(data=order_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
