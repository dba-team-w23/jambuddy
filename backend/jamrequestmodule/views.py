# views.py
from rest_framework import generics
from .models import Instrument
from .serializers import InstrumentSerializer
from django.http import JsonResponse
from datetime import datetime
import pytz

from django.shortcuts import render, get_object_or_404
from jamrequestmodule.models import Instrument


class InstrumentList(generics.ListCreateAPIView):
    queryset = Instrument.objects.all()
    serializer_class = InstrumentSerializer

class InstrumentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Instrument.objects.all()
    serializer_class = InstrumentSerializer


def index(request):
    utc_time = datetime.now(pytz.utc)
    current_time = utc_time.strftime("%-I:%S %p")
    current_date = utc_time.strftime("%A %m %-Y")

    data = {
            'utc_time': current_time,
            'utc_date': current_date,
        }

    return JsonResponse(data)
