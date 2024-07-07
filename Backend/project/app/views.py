from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate, login, logout 
from rest_framework.parsers import MultiPartParser, FormParser

from .models import CustomUser, UserProfile
from .serializers import userSerializer, UserUpdateSerializer

import jwt, datetime
from rest_framework_simplejwt.tokens import RefreshToken

from django.conf import settings
# Create your views here.



class AdminOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        print(request.user, request.user.is_staff,'klkl')
        return request.user and request.user.is_staff


class Register(APIView):
    # queryset = User.objects.all()
    # serializer_class = userSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        data = request.data
        print(data)
        serializer = userSerializer(data=data)
        if serializer.is_valid():
            CustomUser.objects.create_user(email=serializer.validated_data['email'], first_name=serializer.validated_data['first_name'], password=serializer.validated_data['password'], last_name=serializer.validated_data['last_name'])
            print(serializer.data,'lsllsl')
            print(data,'user data')
            return Response({'message': 'Data received'}, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response(serializer.errors)

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
            'isAdmin': user.is_superuser,
        }

        response = Response(content, status=status.HTTP_200_OK)

        response.set_cookie(
            key = settings.SIMPLE_JWT['AUTH_COOKIE'],
            value = str(refresh.access_token),
            secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        response.set_cookie(
            key = 'refresh_token',
            value = str(refresh),
            secure = settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly = settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite = settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )
        print(response, 'response')
        return response


class Profile(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        print('user', request)
        user_profile = CustomUser.objects.get(email=request.user)
        serializer = userSerializer(user_profile)
        print(user_profile, serializer.data)
        return Response({'message':serializer.data}, status=status.HTTP_200_OK)


class UpdateProfile(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request):
        print('lll', request.data, request.user)

        user_profile = UserProfile.objects.get_or_create(user=request.user)[0]
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        pic = request.data.get('pic')

        if first_name:
            request.user.first_name = first_name
        if last_name:
            request.user.last_name = last_name
        if email:
            request.user.email = email
        request.user.save()

        if pic:
            user_profile.profile_pic = pic
        user_profile.save()
        user_profile = CustomUser.objects.get(email=request.user)
        serializer = userSerializer(user_profile)
        return Response(serializer.data)


class AdminHome(APIView):
    permission_classes = [AdminOnly]
    def get(self, request):
        all_users = CustomUser.objects.all()
        serializer = userSerializer(all_users, many=True)
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        print(request,'llll',request.COOKIES)
        print('vannu')

        logout(request)
        try:
            refresh_token = request.COOKIES.get("refresh_token")
            print(refresh_token,'token')
            token = RefreshToken(refresh_token)
            print('000')
            token.blacklist()
            print('pppp')
            response = Response(status=status.HTTP_205_RESET_CONTENT)
            print(';;')
            response.delete_cookie('refresh_token')
            response.delete_cookie('access_token')
            response.delete_cookie('csrftoken')
            return response
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class AdminEdit(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        print(request.data)
        unique = request.data.get('unique_first_name')
        user_profile = CustomUser.objects.filter(first_name=unique).first()
        print(user_profile)
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        email = request.data.get('email')
        pic = request.data.get('pic')

        if first_name:
            user_profile.first_name = first_name
        if last_name:
            user_profile.last_name = last_name
        if email:
            user_profile.email = email
        user_profile.save()
        serializer = userSerializer(user_profile)
        return Response(serializer.data,status=status.HTTP_200_OK)


class AdminDelete(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        print(request.data)
        first_name = request.data.get('first_name')
        user_profile = CustomUser.objects.filter(first_name=first_name).first()
        user_profile.delete()
        return Response(status=status.HTTP_200_OK)


class AdminSearch(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        search = request.data.get('search')
        print(search)
        users = CustomUser.objects.filter(first_name__startswith=search)
        if not users.exists():
            return Response({'error': 'No user found with the provided username'}, status=status.HTTP_404_NOT_FOUND)
        print(users)
        serializer = userSerializer(users, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

# class CreateUser(APIView):
#     def post(self, request):
        