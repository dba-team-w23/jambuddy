# serializers.py

from django.conf import settings
from rest_framework import serializers

from .models import (Clips, ExperienceLevel, Instrument, JamRequest, JamResponse,
                     MusicGenre, Profile, UserMedia, UserReview, 
                     UserFavoriteJamRequest, UserFavoriteProfile)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'last_login','date_joined','username','first_name','last_name',
            'email','street','street2','city','state','country','zipcode','phone','photo','note','hidden',
            'instruments','genres','instrument_names','genre_names']
        #fields = '__all__'

    def create(self, validated_data):
        user = Profile.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=self.initial_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        return user
    
class ProfileJamRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['username','first_name','last_name', 'email','street','street2','city','state',
                  'zipcode','phone','photo','note', 'instrument_names','genre_names']
        #fields = '__all__'
    
class ClipsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clips
        fields = '__all__'

class ExperienceLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienceLevel
        fields = '__all__'

class InstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = '__all__'

class JamRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = JamRequest
        fields = ['id', 'profileid','note','status','created',
            'instruments','genres','exp_level','instrument_names','genre_names','exp_level_names']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['number_of_responses'] = JamResponse.objects.filter(jrid_id=instance.id).count()
        representation['requestor_profile'] = ProfileJamRequestSerializer(instance.profileid).data
        return representation

class JamRequestSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = JamRequest
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['requestor_profile'] = ProfileSerializer(instance.profileid).data
        return representation



class JamResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = JamResponse
        fields = '__all__'

class MusicGenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = MusicGenre
        fields = '__all__'

# class UserInstrumentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserInstrument
#         db_table = UserInstrument
#         fields = '__all__'

#     def to_representation(self, instance):
#         representation = super().to_representation(instance)
#         representation['instrument'] = InstrumentSerializer(instance.instrumentid).data
#         representation['exp_level'] = ExperienceLevelSerializer(instance.exp_level).data
#         return representation

class UserMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMedia
        fields = '__all__'

class UserReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserReview
        fields = '__all__'

class UserReviewForUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserReview
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['reviewer'] = instance.reviewerid.first_name + " " + instance.reviewerid.last_name[0] + "."
        representation['reviewer_location'] = instance.reviewerid.city + ", " + instance.reviewerid.state
        return representation        

class UserReviewByUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserReview
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['for_user'] = instance.profileid.first_name + " " + instance.profileid.last_name[0] + "."
        representation['for_user_location'] = instance.profileid.city + ", " + instance.profileid.state
        return representation


class UserFavoriteJamRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFavoriteJamRequest
        fields = ['profileid','jrid']


class UserFaveProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFavoriteProfile
        fields = ['profileid','favorite_profileid']
