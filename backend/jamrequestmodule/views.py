# views.py
import datetime
import http.client
import json
from typing import List
from urllib.parse import quote

import environ
import pkg_resources
import pytz
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (Clips, ExperienceLevel, Instrument, JamRequest, JamResponse,
                     MusicGenre, Profile, UserFavoriteJamRequest,
                     UserFavoriteProfile, UserMedia, UserReview)
from .serializers import (ClipsSerializer, ExperienceLevelSerializer, InstrumentSerializer,
                          JamRequestSerializer, JamRequestSimpleSerializer,
                          JamResponseSerializer, MusicGenreSerializer,
                          ProfileSerializer, UserFaveProfileSerializer,
                          UserFavoriteJamRequestSerializer,
                          UserMediaSerializer, UserReviewByUserSerializer,
                          UserReviewForUserSerializer, UserReviewSerializer)


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


class ClipsDetail(viewsets.ModelViewSet):
    queryset = Clips.objects.all()
    serializer_class = ClipsSerializer


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

    def destroy(self, request):
        profid = request.data.get("profileid")
        jrid = request.data.get("jrid")
        UserFavoriteJamRequest.objects.filter(profileid_id=profid,jrid_id=jrid).delete()
        return Response({"status":"success"})

class UserFaveProfileList(viewsets.ModelViewSet):
    queryset = UserFavoriteProfile.objects.all()
    serializer_class = UserFaveProfileSerializer

    def destroy(self, request):
        profid = request.data.get("profileid")
        favoriteid = request.data.get("favorite_profileid")
        UserFavoriteProfile.objects.filter(profileid_id=profid,favorite_profileid=favoriteid).delete()
        return Response({"status":"success"})


class ClipLink(viewsets.ModelViewSet):
    def create(self, request):

        profile_id = request.data.get("profile_id")
        if not Profile.objects.filter(id=profile_id).exists():
            return Response({"status":"error", "message": f"Profile ID {profile_id} does not exist"})

        link = request.data.get("clip_to_link")
        profile_to_link = Profile.objects.get(id=profile_id)
        profile_clips = profile_to_link.clips()

        for clip in profile_clips:
            if clip.link == link:
                return Response({"status":"error", "message": f"The provided clip has already been linked to profile ID {profile_id}"})

        new_clip = Clips.objects.create(link=link, profile_id=profile_to_link)

        return Response({"status":"success", "new_clip_id": new_clip.id})

    def destroy(self, request):
        clip_id = request.data.get("clip_id")
        if not Clips.objects.filter(id=clip_id).exists():
            return Response({"status":"error", "message": f"Clip ID {clip_id} does not exist"})
        Clips.objects.filter(id=clip_id).delete()
        return Response({"status":"success"})

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
def getUserJamRequests(request, profile_id):
    jam_requests = JamRequest.objects.filter(profileid=profile_id)
    return Response(JamRequestSerializer(jam_requests, many=True).data)

@api_view(('GET',))
def getJamResponseForRequest(request, request_id):
    jam_responses = JamResponse.objects.filter(jrid_id=request_id)
    return Response(JamResponseSerializer(jam_responses, many=True).data)

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


@api_view(('GET',))
def getUserClipsOfUserId(request, profile_id):
    user_clips = Clips.objects.filter(profile_id=profile_id).all()
    user_clips_data = ClipsSerializer(user_clips, many=True).data
    return JsonResponse(user_clips_data, safe=False)

@api_view(('POST',))
def jamRequestOpen(request, request_id):
    jr = JamRequest.objects.get(id=request_id)
    jr.status='Open'
    jr.save()
    return Response("success", status=status.HTTP_200_OK)

@api_view(('POST',))
def jamRequestClose(request, request_id):
    jr = JamRequest.objects.get(id=request_id)
    jr.status='Close'
    jr.save()
    return Response("success", status=status.HTTP_200_OK)


@api_view(('GET',))
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
            # join results using profile ID of JamRequest to get zipcode of requestor's ID
            profile_ids_of_jam_requestors = list(jam_results.values_list('profileid_id', flat=True))

            # extract zip codes for profiles of all current jam requests
            profiles = Profile.objects.filter(pk__in=profile_ids_of_jam_requestors)
            profile_id_to_zip_code = {profile.pk: profile.zipcode for profile in profiles}

            # filter to only those that are valid zip codes
            requestor_zipcodes = list(profile_id_to_zip_code.values())
            valid_zip_codes = [zip_code for zip_code in requestor_zipcodes if _is_valid_zip_code(zip_code)]

            candidate_zipcodes = ','.join(valid_zip_codes)

            zip_codes_within_range = getZipcodesWithinDistance(
                searching_user_zipcode, candidate_zipcodes, distance_miles)

            profile_ids_in_range = [profile_id for profile_id, zip_code in profile_id_to_zip_code.items()
                                    if zip_code in zip_codes_within_range]

            jam_results = jam_results.filter(profileid_id__in=profile_ids_in_range)

    serialized_reviews = JamRequestSimpleSerializer(jam_results, many=True)
    return JsonResponse(serialized_reviews.data, safe=False)

@api_view(('GET',))
def searchUsers(request):
    searcher_profile_id = request.data.get("searcher_profile_id")
    searching_user = Profile.objects.filter(pk=searcher_profile_id).values('zipcode')
    searching_user_zipcode = searching_user[0]['zipcode']

    if searching_user_zipcode == "" or searching_user_zipcode is None:
        return JsonResponse({'error':'Searching user does not have a zipcode in their profile. Zipcode is required to perform a distance search.'}, status=400)

    profiles = Profile.objects.filter(hidden=False).exclude(pk=searcher_profile_id)
    instrument_id = request.data.get("instrumentid")
    genre_id = request.data.get("genreid")
    distance_miles = request.data.get("distance_miles")

    if instrument_id:
        profiles = profiles.filter(instruments__id=instrument_id)
    if genre_id:
        profiles = profiles.filter(genres__id=genre_id)
    if distance_miles:
        are_distance_search_prereqs_met = all([
            distance_miles is not None and int(distance_miles) > 0,
            _is_valid_zip_code(searching_user_zipcode)]
        )

        if are_distance_search_prereqs_met:
            # extract zip codes for profiles
            profile_id_to_zip_code = {prof.pk: prof.zipcode for prof in profiles}

            # filter to only those that are valid zip codes
            profile_zipcodes = list(profile_id_to_zip_code.values())
            valid_zip_codes = [zip_code for zip_code in profile_zipcodes if _is_valid_zip_code(zip_code)]
            candidate_zipcodes = ','.join(valid_zip_codes)

            zip_codes_within_range = getZipcodesWithinDistance(
                searching_user_zipcode, candidate_zipcodes, distance_miles)

            profile_ids_in_range = [profile_id for profile_id, zip_code in profile_id_to_zip_code.items()
                                    if zip_code in zip_codes_within_range]

            profiles = profiles.filter(id__in=profile_ids_in_range)

    serialized_profiles = ProfileSerializer(profiles, many=True)
    return JsonResponse(serialized_profiles.data, safe=False)


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
