from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'products', views.ProductView, basename='products')
router.register(r'orders', views.OrderView, basename='orders')
router.register(r'categories', views.CategoryView, basename='categories')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
