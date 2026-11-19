
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Task
from .serializers import TaskSerializer


# Home API
def home(request):
    return JsonResponse({
        "message": "Welcome to DevTrack!",
        "developer": "Ramees",
        "framework": "Django",
        "age": 25
    })


# Task List API - GET and POST
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
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)


# Task Detail API - GET, PUT, PATCH and DELETE
@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def task_detail(request, pk):

    task = get_object_or_404(Task, pk=pk)

    # DELETE - Delete a task
    if request.method == 'DELETE':
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # GET - Retrieve a single task
    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    # PUT - Full update
    if request.method == 'PUT':
        serializer = TaskSerializer(
            task,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    # PATCH - Partial update
    if request.method == 'PATCH':
        serializer = TaskSerializer(
            task,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)
