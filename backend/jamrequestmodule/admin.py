from django.contrib import admin

from .models import (ExperienceLevel, Instrument, JamRequest, JamResponse,
                     MusicGenre, UserGenre, UserInstrument, UserMedia,
                     UserReview, Profile)


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'email', 'phone')


class ExperienceLevelAdmin(admin.ModelAdmin):
    list_display = ('id', 'level')


class InstrumentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'type')


class JamRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'profileid', 'instrumentid', 'genreid', 'location', 'exp_level', 'status')


class JamResponseAdmin(admin.ModelAdmin):
    list_display = ('id', 'jrid', 'profileid', 'status')


class MusicGenreAdmin(admin.ModelAdmin):
    list_display = ('id', 'genre')


class UserGenreAdmin(admin.ModelAdmin):
    list_display = ('id', 'profileid', 'genreid')


class UserInstrumentAdmin(admin.ModelAdmin):
    list_display = ('id', 'profileid', 'instrumentid', 'exp_level')


class UserMediaAdmin(admin.ModelAdmin):
    list_display = ('id', 'profileid', 'type', 'location', 'seconds')


class UserReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'profileid', 'reviewerid', 'rating')


admin.site.register(Profile, ProfileAdmin)
admin.site.register(UserInstrument, UserInstrumentAdmin)
admin.site.register(UserGenre, UserGenreAdmin)
admin.site.register(JamRequest, JamRequestAdmin)
admin.site.register(JamResponse, JamResponseAdmin)
admin.site.register(ExperienceLevel, ExperienceLevelAdmin)
admin.site.register(Instrument, InstrumentAdmin)
admin.site.register(MusicGenre, MusicGenreAdmin)
admin.site.register(UserReview, UserReviewAdmin)
admin.site.register(UserMedia, UserMediaAdmin)
