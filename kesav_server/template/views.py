from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def index(request):
	context_dict = "Hello"
	return render(request, 'template/template.html', context_dict)

def index2(request):
	context_dict = "Hello"
	return render(request, 'new-electrostatics.html', context_dict)

def index3(request):
	context_dict = "Wtevs"
	return render(request, 'audio-test.html', context_dict)