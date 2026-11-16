from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('api/tasks/',views.task_list,name='task_list'),
    path('api/tasks/<int:pk>/',views.task_detail,name='task_detail')
]