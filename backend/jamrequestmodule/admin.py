from django.contrib import admin

from .models import Instrument


class InstrumentAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'type')


admin.site.register(Instrument, InstrumentAdmin)
