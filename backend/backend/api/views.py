from rest_framework import generics
from .serializers import memesSerializer, tagsSerializer
from .models import memes, tags
from rest_framework.response import Response

from rest_framework.views import APIView

# Create your views here.


class CreateMemesView(generics.ListCreateAPIView):
    queryset = memes.objects.all()
    serializer_class = memesSerializer

    def perform_create(self, serializer):
        serializer.save()


class DetailsMemesView(generics.RetrieveUpdateDestroyAPIView):
    queryset = memes.objects.all()
    serializer_class = memesSerializer

class CreateTagsView(generics.ListCreateAPIView):
    queryset = tags.objects.all()
    serializer_class = tagsSerializer

    def perform_create(self, serializer):
        serializer.save()


class DetailsTagsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = tags.objects.all()
    serializer_class = tagsSerializer
