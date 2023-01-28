from django.http import JsonResponse
from datetime import datetime
import pytz

from django.shortcuts import render, get_object_or_404
from jamrequestmodule.models import Instrument


def instrument_list(request):
    instruments = Instrument.objects.all()
    return JsonResponse(list(instruments.values()), safe=False)


def instrument_detail(request, instrument_id):
    instrument = get_object_or_404(Instrument, pk=instrument_id)
    return render(request, 'instruments/instrument_detail.html', {'instrument': instrument})



def index(request):
    utc_time = datetime.now(pytz.utc)
    current_time = utc_time.strftime("%-I:%S %p")
    current_date = utc_time.strftime("%A %m %-Y")

    data = {
            'utc_time': current_time,
            'utc_date': current_date,
        }

    return JsonResponse(data)
