from django.http import jsonResponse 

# Create your views here.
def home(request):
    return jsonResponse({   "message": "Welcome to DevTrack!",
        "developer": "Ramees",
        "framework": "Django"})