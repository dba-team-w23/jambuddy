from django.contrib import admin

from .models import (ExperienceLevel, Instrument, JamRequest, JamResponse,
                     MusicGenre, UserMedia,
                     UserReview, Profile)


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'email', 'phone')


class ExperienceLevelAdmin(admin.ModelAdmin):
    list_display = ('id', 'level')


class InstrumentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'type')


class JamRequestAdmin(admin.ModelAdmin):
    list_display = ('id', 'profileid', 'zipcode', 'status', 'note')


class JamResponseAdmin(admin.ModelAdmin):
    list_display = ('id', 'jrid', 'profileid', 'status')


class MusicGenreAdmin(admin.ModelAdmin):
    list_display = ('id', 'genre')


class UserMediaAdmin(admin.ModelAdmin):
    list_display = ('id', 'profileid', 'type', 'location', 'seconds')


class UserReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'profileid', 'reviewerid', 'rating')


admin.site.register(Profile, ProfileAdmin)
admin.site.register(JamRequest, JamRequestAdmin)
admin.site.register(JamResponse, JamResponseAdmin)
admin.site.register(ExperienceLevel, ExperienceLevelAdmin)
admin.site.register(Instrument, InstrumentAdmin)
admin.site.register(MusicGenre, MusicGenreAdmin)
admin.site.register(UserReview, UserReviewAdmin)
admin.site.register(UserMedia, UserMediaAdmin)
