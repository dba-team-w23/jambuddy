# serializers.py

from django.conf import settings
from rest_framework import serializers

from .models import (ExperienceLevel, Instrument, JamRequest, JamResponse,
                     MusicGenre, Profile, UserGenre, UserInstrument, UserMedia,
                     UserReview, UserFavoriteJamRequest, UserFavoriteProfile)


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        db_table = Profile
        fields = ['id', 'last_login','date_joined','username','first_name','last_name',
            'email','street','street2','city','state','zipcode','phone','photo','note',
            'instruments','genres','exp_level']
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

class ExperienceLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienceLevel
        db_table = ExperienceLevel
        fields = '__all__'

class InstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        db_table = Instrument
        fields = '__all__'

class JamRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = JamRequest
        db_table = JamRequest
        fields = '__all__'

        list_serializer = serializers.ListSerializer(child=serializers.IntegerField())

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['instrument'] = InstrumentSerializer(instance.instrumentid).data
        representation['genre'] = MusicGenreSerializer(instance.genreid).data
        representation['requestor_profile'] = ProfileSerializer(instance.profileid).data
        return representation

class JamResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = JamResponse
        db_table = JamResponse
        fields = '__all__'

class MusicGenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = MusicGenre
        db_table = MusicGenre
        fields = '__all__'

class UserGenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGenre
        db_table = UserGenre
        fields = '__all__'

class UserInstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInstrument
        db_table = UserInstrument
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['instrument'] = InstrumentSerializer(instance.instrumentid).data
        representation['exp_level'] = ExperienceLevelSerializer(instance.exp_level).data
        return representation

class UserMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMedia
        db_table = UserMedia
        fields = '__all__'

class UserReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserReview
        db_table = UserReview
        fields = '__all__'

class UserFavoriteJamRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFavoriteJamRequest
        db_table = UserFavoriteJamRequest
        fields = ['profileid','jrid']


class UserFaveProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFavoriteProfile
        db_table = UserFavoriteProfile
        fields = ['profileid','favorite_profileid']

