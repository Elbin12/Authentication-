from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate, login, logout 

from .models import CustomUser
from .serializers import userSerializer

import jwt, datetime
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.



class Register(APIView):
    # queryset = User.objects.all()
    # serializer_class = userSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = request.data
        print(data)
        serializer = userSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors)
        
        CustomUser.objects.create_user(email=serializer.validated_data['email'], first_name=serializer.validated_data['first_name'], password=serializer.validated_data['password'], last_name=serializer.validated_data['last_name'])
        print(serializer.data)
        print(data,'user data')
        return Response({'message': 'Data received'}, status=status.HTTP_200_OK)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        print(email, password)

        user = CustomUser.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('User not found')
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')

        # user = authenticate(username=email, password=password)
        # if user is None:
        #     raise AuthenticationFailed('Invalid Password')
        login(request, user)
        refresh = RefreshToken.for_user(user)
        refresh["first_name"] = str(user.first_name)
        content = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'isAdmin': user.is_superuser,
        }

        return Response(content, status=status.HTTP_200_OK)