from django.http import JsonResponse 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer

# Create your views here.
def home(request):
    return JsonResponse({   "message": "Welcome to DevTrack!",
        "developer": "Ramees",
        "framework": "Django",
        "age": 25})


@api_view(['GET', 'POST'])
def task_list(request):
    if request.method == 'GET':
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

@api_view(['PATCH','DELETE'])
def task_detail(request, pk):
    task = Task.objects.get(pk=pk)

    if request.method == 'DELETE':
        task.delete()
        return Response(status)

    serializer = TaskSerializer(
        task,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)    