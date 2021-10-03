from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'products', csrf_exempt(views.ProductView), basename='products')
router.register(r'orders', csrf_exempt(views.OrderView), basename='orders')
router.register(r'categories', csrf_exempt(views.CategoryView), basename='categories')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
