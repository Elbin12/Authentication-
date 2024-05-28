from django.shortcuts import render
from rest_framework import generics

from rest_framework.views import APIView

from .models import User
from .serializers import userSerializer

# Create your views here.



class sampleView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = userSerializer