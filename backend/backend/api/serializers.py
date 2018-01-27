from rest_framework import serializers
from .models import memes, tags

class memesSerializer(serializers.ModelSerializer):
    class Meta:
        model = memes
        fields = ('id', 'name', 'url')

class tagsSerializer(serializers.ModelSerializer):
    memes = memesSerializer()
    class Meta:
        model = tags
        fields = ('id', 'name', 'probability', 'memes')

