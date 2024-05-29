from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from .serializers import userSerializer

# Create your views here.



class sampleView(APIView):
    # queryset = User.objects.all()
    # serializer_class = userSerializer

    def post(self, request):
        data = request.data
        print(data,'user data')
        return Response({'message': 'Data received'}, status=status.HTTP_200_OK)

