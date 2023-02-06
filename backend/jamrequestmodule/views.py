# views.py
from datetime import datetime

import pytz
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.views.decorators.csrf import csrf_exempt
from jamrequestmodule.models import Instrument
from rest_framework import generics, status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (ExperienceLevel, Instrument, JamRequest, JamResponse,
                     MusicGenre, UserGenre, UserInstrument, UserMedia,
                     UserReview, Users)
from .serializers import (ExperienceLevelSerializer, InstrumentSerializer,
                          JamRequestSerializer, JamResponseSerializer,
                          MusicGenreSerializer, UserGenreSerializer,
                          UserInstrumentSerializer, UserMediaSerializer,
                          UserReviewSerializer,
                          UsersSerializer)


class UserList(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

class UserDetail(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer


class ExperienceLevelList(viewsets.ModelViewSet):
    queryset = ExperienceLevel.objects.all()
    serializer_class = ExperienceLevelSerializer

class ExperienceLevelDetail(viewsets.ModelViewSet):
    queryset = ExperienceLevel.objects.all()
    serializer_class = ExperienceLevelSerializer


class InstrumentList(viewsets.ModelViewSet):
    queryset = Instrument.objects.all()
    serializer_class = InstrumentSerializer
class InstrumentDetail(viewsets.ModelViewSet):
    queryset = Instrument.objects.all()
    serializer_class = InstrumentSerializer


class JamRequestDetail(viewsets.ModelViewSet):
    queryset = JamRequest.objects.all()
    serializer_class = JamRequestSerializer

class JamRequestList(viewsets.ModelViewSet):
    queryset = JamRequest.objects.all()
    serializer_class = JamRequestSerializer


class JamResponseDetail(viewsets.ModelViewSet):
    queryset = JamResponse.objects.all()
    serializer_class = JamResponseSerializer

class JamResponseList(viewsets.ModelViewSet):
    queryset = JamResponse.objects.all()
    serializer_class = JamResponseSerializer


class MusicGenreList(viewsets.ModelViewSet):
    queryset = MusicGenre.objects.all()
    serializer_class = MusicGenreSerializer

class MusicGenreDetail(viewsets.ModelViewSet):
    queryset = MusicGenre.objects.all()
    serializer_class = MusicGenreSerializer


class UserGenreList(viewsets.ModelViewSet):
    queryset = UserGenre.objects.all()
    serializer_class = UserGenreSerializer

class UserGenreDetail(viewsets.ModelViewSet):
    queryset = UserGenre.objects.all()
    serializer_class = UserGenreSerializer


class UserInstrumentList(viewsets.ModelViewSet):
    queryset = UserInstrument.objects.all()
    serializer_class = UserInstrumentSerializer

class UserInstrumentDetail(viewsets.ModelViewSet):
    queryset = UserInstrument.objects.all()
    serializer_class = UserInstrumentSerializer


class UserMediaList(viewsets.ModelViewSet):
    queryset = UserMedia.objects.all()
    serializer_class = UserMediaSerializer

class UserMediaDetail(viewsets.ModelViewSet):
    queryset = UserMedia.objects.all()
    serializer_class = UserMediaSerializer


class UserReviewList(viewsets.ModelViewSet):
    queryset = UserReview.objects.all()
    serializer_class = UserReviewSerializer

class UserReviewDetail(viewsets.ModelViewSet):
    queryset = UserReview.objects.all()
    serializer_class = UserReviewSerializer


class UserDetailsView(generics.RetrieveAPIView):
    queryset = Users.objects.all()
    serializer_class = UsersSerializer

    def retrieve(self, request, *args, **kwargs):
        user = self.get_object()
        user_instruments = UserInstrument.objects.filter(userid=user).all()
        user_media = UserMedia.objects.filter(userid=user).all()
        user_reviews = UserReview.objects.filter(userid=user).all()
        user_genres = UserGenre.objects.filter(userid=user).all()

        user_serializer = UsersSerializer(user)
        user_instruments_serializer = UserInstrumentSerializer(user_instruments, many=True)
        user_media_serializer = UserMediaSerializer(user_media, many=True)
        user_reviews_serializer = UserReviewSerializer(user_reviews, many=True)

        genres = [user_genre.genreid for user_genre in user_genres]
        serialized_genres = MusicGenreSerializer(genres, many=True)


        return Response({
            'user': user_serializer.data,
            'genres': serialized_genres.data,
            'instruments': user_instruments_serializer.data,
            'media': user_media_serializer.data,
            'reviews': user_reviews_serializer.data
        })



@csrf_exempt
def update(request):
    if request.method == "POST":
        '''
        pass the path of the diectory where your project will be
        stored on PythonAnywhere in the git.Repo() as parameter.
        Here the name of my directory is "test.pythonanywhere.com"
        '''
        repo = git.Repo("dbajamteam.pythonanywhere.com/")
        origin = repo.remotes.origin
        origin.pull()
        return HttpResponse("Updated code on PythonAnywhere")
    else:
        return HttpResponse("Couldn't update the code on PythonAnywhere")

def index(request):
    utc_time = datetime.now(pytz.utc)
    current_time = utc_time.strftime("%-I:%S %p")
    current_date = utc_time.strftime("%A %m %-Y")

    data = {
            'page': "Welcome to the test page!",
            'utc_time': current_time,
            'utc_date': current_date,
        }
    return JsonResponse(data)


@api_view(['GET'])
def checkserver(request):
    date = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    message = 'Server check-in successful. Current time is: '
    return Response(data=message + date, status=status.HTTP_200_OK)


@api_view(['POST'])
def login_user(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return Response(data="Login success!", status=status.HTTP_200_OK)
    else:
        return Response(data="Login error!", status=status.HTTP_401_UNAUTHORIZED)
