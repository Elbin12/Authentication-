from rest_framework import serializers



class userSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name'
        )