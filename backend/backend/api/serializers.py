from rest_framework import serializers
from .models import Meme,Tag

class MemeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Meme
        fields = ('id', 'name', 'url')

    def create(self, validated_data):
        """
        Create and return a new `Meme` instance, given the validated data.
        """
        return Meme.objects.create(**validated_data)

class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ('id', 'name', 'probability', 'meme')

    def create(self, validated_data):
        """
        Create and return a new `Tag` instance, given the validated data.
        """
        return Tag.objects.create(**validated_data)





