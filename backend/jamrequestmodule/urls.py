"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/users/', views.UserList.as_view(actions={'get': 'list', 'post': 'create'}), name='user-list'),
    path('api/users/<int:pk>/', views.UserDetail.as_view(actions={'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='user-detail'),

    path('api/experiencelevels/', views.ExperienceLevelList.as_view(actions={'get': 'list', 'post': 'create'}), name='experiencelevel-list'),
    path('api/experiencelevels/<int:pk>/', views.ExperienceLevelDetail.as_view(actions={'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='experiencelevel-detail'),

    path('api/instruments/', views.InstrumentList.as_view(actions={'get': 'list', 'post': 'create'}), name='instrument-list'),
    path('api/instruments/<int:pk>/', views.InstrumentDetail.as_view(actions={'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='instrument-detail'),

    path('api/jamrequests/', views.JamRequestList.as_view(actions={'get': 'list', 'post': 'create'}), name='jamrequest-list'),
    path('api/jamrequests/<int:pk>/', views.JamRequestDetail.as_view(actions={'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='jamrequest-detail'),

    path('api/jamresponses/', views.JamResponseList.as_view(actions={'get': 'list', 'post': 'create'}), name='jamresponse-list'),
    path('api/jamresponses/<int:pk>/', views.JamResponseDetail.as_view(actions={'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='jamresponse-detail'),

    path('api/musicgenres/', views.MusicGenreList.as_view(actions={'get': 'list', 'post': 'create'}), name='musicgenre-list'),
    path('api/musicgenres/<int:pk>/', views.MusicGenreDetail.as_view(actions={'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='musicgenre-detail'),

    path('api/usergenres/', views.UserGenreList.as_view(actions={'get': 'list', 'post': 'create'}), name='usergenre-list'),
    path('api/usergenres/<int:pk>/', views.UserGenreDetail.as_view(actions={'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='usergenre-detail'),

    path('api/userinstruments/', views.UserInstrumentList.as_view(actions={'get': 'list', 'post': 'create'}), name='userinstrument-list'),
    path('api/userinstruments/<int:pk>/', views.UserInstrumentDetail.as_view(actions={'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='userinstrument-detail'),

    path('api/usermedia/', views.UserMediaList.as_view(actions={'get': 'list', 'post': 'create'}), name='usermedia-list'),
    path('api/usermedia/<int:pk>/', views.UserMediaDetail.as_view(actions={'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='usermedia-detail'),

    path('api/userreviews/', views.UserReviewList.as_view(actions={'get': 'list', 'post': 'create'}), name='userreview-list'),
    path('api/userreviews/<int:pk>/', views.UserReviewDetail.as_view(actions={'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='userreview-detail'),

    path('api/user-details/<int:pk>/', views.UserDetailsView.as_view(), name='user-details'),

    path("update_server/", views.update, name="update"),
    path('', views.index),

    path('api/login_user', views.login_user, name='login'),
    path('checkserver', views.checkserver),
]

