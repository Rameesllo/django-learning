from django.http import JsonResponse 

# Create your views here.
def home(request):
    return JsonResponse({   "message": "Welcome to DevTrack!",
        "developer": "Ramees",
        "framework": "Django",
        "age": 25})

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer


@api_view(['GET'])
def task_list(request):
    tasks = Task.objects.all()

    serializer = TaskSerializer(tasks, many=True)

    return Response(serializer.data)