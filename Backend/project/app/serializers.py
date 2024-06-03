from rest_framework import serializers
from .models import CustomUser
from .models import UserProfile



class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email','first_name','last_name', 'password']


class UserUpdateSerializer(serializers.ModelSerializer):
    profile_pic = serializers.ImageField(required=True)
    class Meta:
        model = UserProfile
        fields = ['profile_pic']