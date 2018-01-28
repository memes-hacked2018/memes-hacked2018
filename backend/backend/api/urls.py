from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from api import views
# from .views import CreateMemesView, DetailsMemesView, CreateTagsView, DetailsTagsView

urlpatterns = {
    url(r'^memes/$', views.MemeList.as_view()),
    url(r'^memes/(?P<pk>[0-9]+)/$', views.MemeDetail.as_view()),
    url(r'^tags/$', views.TagList.as_view()),
    url(r'^tags/(?P<pk>[0-9]+)/$', views.TagDetail.as_view()),
    # url(r'^memes/(?P<pk>[0-9]+)/$', DetailsMemesView.as_view(), name="details"),
    # url(r'^tags/$', CreateTagsView.as_view()),
    # url(r'^tags/(?P<pk>[0-9]+)/$', DetailsTagsView.as_view(), name="details"),
}

urlpatterns = format_suffix_patterns(urlpatterns)