# serializers.py

from rest_framework import serializers

from .models import (ExperienceLevel, Instrument, JamRequest, JamResponse,
                     MusicGenre, User, UserGenre, UserInstrument, UserMedia,
                     UserReview)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserInstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInstrument
        fields = '__all__'


class UserGenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGenre
        fields = '__all__'


class JamRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = JamRequest
        fields = '__all__'


class JamResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = JamResponse
        fields = '__all__'


class ExperienceLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExperienceLevel
        fields = '__all__'


class InstrumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instrument
        fields = '__all__'


class MusicGenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = MusicGenre
        fields = '__all__'


class UserReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserReview
        fields = '__all__'


class UserMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserMedia
        fields = '__all__'
