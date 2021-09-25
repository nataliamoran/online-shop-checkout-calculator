from django.http import JsonResponse

from .models import *
from .serializers import ProductSerializer
from rest_framework import viewsets, permissions, status


def index(request):
    return JsonResponse({"msg": "Hello, world!"})


class ProductView(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
