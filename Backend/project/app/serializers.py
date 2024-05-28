from rest_framework import serializers
from .models import User



class userSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name'
        )
        model = User