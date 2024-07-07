from rest_framework import serializers
from .models import CustomUser
from .models import UserProfile



class userSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True) 
    profile_pic = serializers.ImageField(source='user_profile.profile_pic', read_only=True)
    print(confirm_password,'llll')  
    class Meta:
        model = CustomUser
        fields = ['email','first_name','last_name', 'password','confirm_password','profile_pic']

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        if password != confirm_password:
            raise serializers.ValidationError("Passwords do not match.")
        return data


class UserUpdateSerializer(serializers.ModelSerializer):
    profile_pic = serializers.ImageField(required=True)
    class Meta:
        model = UserProfile
        fields = ['profile_pic']