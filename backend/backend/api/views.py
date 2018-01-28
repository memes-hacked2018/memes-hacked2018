from .models import Meme, Tag
from .serializers import MemeSerializer, TagSerializer
from rest_framework import generics
from django.utils.safestring import mark_safe
from django.http import JsonResponse

import json

def add_meme():
    return

def js(topic="meme"):
    meme_ids = list(Meme.objects.all().values_list('id', flat=True))
    obj_list = {}
    obj = {}
#     data = {}
# data['key'] = 'value'
# json_data = json.dumps(data)
    for ids in meme_ids:
        meme_url = list(Meme.objects.all().filter(id=ids).values_list('url', flat=True))
        tag_list = dict(Tag.objects.all().filter(meme_id=ids).values_list('name','probability'))
        print(ids)
        print(meme_url)
        print(tag_list)
        obj_list['url'] = meme_url
        obj_list['id'] = ids
        obj_list['tags'] = tag_list
        obj[ids] = obj_list
    # ol=json.dumps(vars(obj_list))
    data = json.dumps(obj)
    return JsonResponse(data, safe=False)
    # user_list = user_list.exclude(username = request.session['username'])
    # user_list = list(user_list)
    # context_dict['user_list'] = mark_safe(json.dumps(user_list))
    # return mark_safe(json.dumps(obj))


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