# serializers.py

from rest_framework import serializers

from .models import (ExperienceLevel, Instrument, JamRequest, JamResponse,
                     MusicGenre, Users, UserGenre, UserInstrument, UserMedia,
                     UserReview)


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        db_table = Users
        fields = '__all__'

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

