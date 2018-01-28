from .models import Meme, Tag
from .serializers import MemeSerializer, TagSerializer
from rest_framework import generics


class MemeList(generics.ListCreateAPIView):
    queryset = Meme.objects.all()
    serializer_class = MemeSerializer


class MemeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Meme.objects.all()
    serializer_class = MemeSerializer

class TagList(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class TagDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer