from rest_framework import serializers
from .models import memes, tags

class memesSerializer(serializers.ModelSerializer):
    class Meta:
        model = memes
        fields = ('id', 'name', 'url')

class tagsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = tags
        fields = ('id', 'name', 'probability', 'memesId')

