# views.py
import datetime
import environ
import http.client
import json
import pytz
import pkg_resources

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from jamrequestmodule.models import Instrument
from rest_framework import generics, status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from urllib.parse import quote
from typing import List

from .models import (ExperienceLevel, Instrument, JamRequest, JamResponse,
                     MusicGenre, UserFavoriteJamRequest, UserFavoriteProfile, UserMedia,
                     UserReview, Profile)
from .serializers import (ExperienceLevelSerializer, InstrumentSerializer,
                          JamRequestSerializer, JamRequestSimpleSerializer, JamResponseSerializer,
                          MusicGenreSerializer, UserFavoriteJamRequestSerializer,
                          UserFaveProfileSerializer, UserMediaSerializer,
                          UserReviewSerializer, UserReviewForUserSerializer, UserReviewByUserSerializer,
                          ProfileSerializer)

class UserList(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class UserDetail(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ExperienceLevelList(viewsets.ModelViewSet):
    queryset = ExperienceLevel.objects.all().order_by('id')
    serializer_class = ExperienceLevelSerializer

class ExperienceLevelDetail(viewsets.ModelViewSet):
    queryset = ExperienceLevel.objects.all()
    serializer_class = ExperienceLevelSerializer


class InstrumentList(viewsets.ModelViewSet):
    queryset = Instrument.objects.all().order_by('name')
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
    queryset = MusicGenre.objects.all().order_by('genre')
    serializer_class = MusicGenreSerializer

class MusicGenreDetail(viewsets.ModelViewSet):
    queryset = MusicGenre.objects.all()
    serializer_class = MusicGenreSerializer


class UserFaveJamReqList(viewsets.ModelViewSet):
    queryset = UserFavoriteJamRequest.objects.all()
    serializer_class = UserFavoriteJamRequestSerializer

class UserFaveProfileList(viewsets.ModelViewSet):
    queryset = UserFavoriteProfile.objects.all()
    serializer_class = UserFaveProfileSerializer

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
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def retrieve(self, request, *args, **kwargs):
        user = self.get_object()
        user_media = UserMedia.objects.filter(profileid=user).all()
        user_reviews = UserReview.objects.filter(profileid=user).all()

        user_serializer = ProfileSerializer(user)
        user_media_serializer = UserMediaSerializer(user_media, many=True)
        user_reviews_serializer = UserReviewSerializer(user_reviews, many=True)

        return Response({
            'user': user_serializer.data,
            'media': user_media_serializer.data,
            'reviews': user_reviews_serializer.data
        })

@api_view(('GET',))
def getUserFaveJamReqs(request, profile_id):
    fave_req_ids = UserFavoriteJamRequest.objects.filter(profileid=profile_id).values_list('jrid', flat=True)
    ids = [int(fave_req_id) for fave_req_id in fave_req_ids]
    ids.sort()

    jam_requests = JamRequest.objects.filter(id__in=ids).all()

    return Response({'jamrequest_ids': ids, 'jamrequests': JamRequestSerializer(jam_requests, many=True).data})


@api_view(('GET',))
def getUserFaveProfiles(request, profile_id):
    fave_profile_ids = UserFavoriteProfile.objects.filter(profileid=profile_id).values_list('favorite_profileid', flat=True)
    ids = [int(fave_profile_id) for fave_profile_id in fave_profile_ids if fave_profile_id != profile_id and fave_profile_id != None]
    ids.sort()

    profiles = Profile.objects.filter(id__in=ids).all()

    return Response({'profile_ids': ids, 'profiles': ProfileSerializer(profiles, many=True).data})

@api_view(('GET',))
def getUserMedia(request, profile_id):
    user_media = UserMedia.objects.filter(profileid=profile_id).all()
    ser_media = UserMediaSerializer(user_media, many=True)
    return Response({
        'media': ser_media.data
    })

@api_view(('GET',))
def getUserReviewsForUser(request, profile_id):
    user_reviews = UserReview.objects.filter(profileid=profile_id)
    ser_reviews = UserReviewForUserSerializer(user_reviews, many=True)
    return JsonResponse(ser_reviews.data, safe=False)

@api_view(('GET',))
def getUserReviewsByUser(request, profile_id):
    user_reviews = UserReview.objects.filter(reviewerid=profile_id).all()
    ser_reviews = UserReviewByUserSerializer(user_reviews, many=True)
    return JsonResponse(ser_reviews.data, safe=False)

@api_view(('GET','POST',))
def searchJamRequests(request):
    jam_results = JamRequest.objects.filter(status="Open")
    instrument_id = request.data.get("instrumentid")
    genre_id = request.data.get("genreid")
    exp_level_id = request.data.get("explevel")
    daysback = request.data.get("daysback")
    distance_miles = request.data.get("distance_miles")
    searching_user_zipcode = request.data.get("from_zipcode")

    if instrument_id:
        jam_results = jam_results.filter(instruments__id=instrument_id)
    if genre_id:
        jam_results = jam_results.filter(genres__id=genre_id)
    if exp_level_id:
        jam_results = jam_results.filter(exp_level__id=exp_level_id)
    if daysback:
        jam_results = jam_results.filter(created__gte=datetime.datetime.now() - datetime.timedelta(days=daysback))

    if distance_miles:
        are_distance_search_prereqs_met = all([
            distance_miles is not None and int(distance_miles) > 0,
            _is_valid_zip_code(searching_user_zipcode)]
        )
    
        if are_distance_search_prereqs_met:
            # join results using profile ID of JamRequestory to get zipcode of requestor's ID
            profile_ids_of_jam_requestors = list(jam_results.values_list('profileid_id', flat=True))
            
            # extract zip codes for profiles of all current jam requests
            profiles = Profile.objects.filter(pk__in=profile_ids_of_jam_requestors)
            profile_id_to_zip_code = {profile.pk: profile.zipcode for profile in profiles}

            # filter to only those that are valid zip codes
            requestor_zipcodes = list(profile_id_to_zip_code.values())
            valid_zip_codes = [zip_code for zip_code in requestor_zipcodes if _is_valid_zip_code(zip_code)]

            candidate_zipcodes = ','.join(valid_zip_codes)

            zip_codes_within_range = getZipcodesWithinDistance(searching_user_zipcode, candidate_zipcodes, distance_miles)

            profile_ids_in_range = [profile_id for profile_id, zip_code in profile_id_to_zip_code.items() if zip_code in zip_codes_within_range]

            jam_results = jam_results.filter(profileid_id__in=profile_ids_in_range)


    ser_reviews = JamRequestSimpleSerializer(jam_results, many=True)
    return JsonResponse(ser_reviews.data, safe=False)



def _is_valid_zip_code(input: str or None) -> bool:
    if input is None:
        return False
    input = input.strip()
    if len(input) == 5 and input.isdigit():
        return True
    elif len(input) == 10 and input[5] == '-' and input[:5].isdigit() and input[6:].isdigit():
        return True
    else:
        return False

def index(request):
    utc_time = datetime.datetime.now(pytz.utc)
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
    path = request.META.get('HTTP_HOST') 
    message = "Host is '" + path + "' -- "

    #Gather important library versions
    message += "Libraries: "
    libraries_to_display = ["Django", "django-cors-headers", "django-cors-middleware"]
    for library in libraries_to_display:
        version = pkg_resources.get_distribution(library).version
        message += library + " v" + version + ", "

    date = datetime.datetime.now().strftime("%m/%d/%Y %H:%M:%S")
    message += " -- Server time is: " + date
    return Response(data=message, status=status.HTTP_200_OK)


@csrf_exempt
@api_view(['POST'])
def login_user(request):
    username = request.data.get('username', None)
    password = request.data.get('password', None)

    user = authenticate(request, username=username, password=password)

    if user is not None and user.is_authenticated:
        login(request, user)
        return Response({"status":1, "profile_id":user.pk}, status=status.HTTP_200_OK)
    else:
        return Response({"status":0, "error":"Invalid username or password"}, status=status.HTTP_200_OK)

@api_view(['POST'])
def logout_user(request):
    logout(request)
    return Response({"status":0}, status=status.HTTP_200_OK)


def getZipcodesWithinDistance(from_zipcode: str, candidate_zipcodes: str, distance: List[str]) -> List[str]:
    env = environ.Env()
    environ.Env.read_env()
    zip_api_token = env('ZIP_API_TOKEN')
    api_endpoint = "/rest/{}/multi-distance.json/{}/{}/mile".format(zip_api_token, from_zipcode, candidate_zipcodes)
    api_endpoint = quote(api_endpoint)  # url-encode the zipcode CSV list

    headers = {'Content-type': 'application/json'}
    result_zipcodes = [from_zipcode]
    try:
        conn = http.client.HTTPConnection('www.zipcodeapi.com', 80, timeout=10)
        conn.request("GET", api_endpoint, "", headers)
        response = conn.getresponse()
        result = json.loads(response.read().decode())

        if response.status != 200:
            print("Error connecting to zipcodeapi.com, err:", result['error_msg'])

        zip_distances:dict = result['distances']
        for zip,dist in zip_distances.items():
            if dist < distance:
                result_zipcodes.append(zip)
       
    except Exception as e:
        print("Error connecting to zipcodeapi.com, err:", e)

    finally:
        conn.close() 
    
    return result_zipcodes


# class JamRequestList(viewsets.ModelViewSet):
#     filter_params = [
#         'instrument_name',
#         'instrument_type',
#         'genre',
#         'location',
#         'status',
#         'requestor_username',
#     ]

#     def get_queryset(self):
#         queryset = JamRequest.objects.all()

#         filter_lookup = {
#             'instrument_name': 'instrumentid__name',
#             'instrument_type': 'instrumentid__type',
#             'genre': 'genreid__genre',
#             'location': 'location',
#             'status': 'status',
#             'requestor_username': 'profileid__username',
#         }
#         for client_key, backend_key in filter_lookup.items():
#             if self.request.query_params.get(client_key):
#                 client_value = self.request.query_params.get(client_key)
#                 case_insensitive_client_value = client_value.lower()
#                 queryset = queryset.filter(
#                     **{f'{backend_key}__icontains': case_insensitive_client_value}
#                 )
#         return queryset

#     serializer_class = JamRequestSerializer
