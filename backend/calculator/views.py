from django.http import JsonResponse


def index(request):
    return JsonResponse({"msg": "Hello, world!"})
