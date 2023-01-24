from django.http import JsonResponse
from datetime import datetime
import pytz


def index(request):
    utc_time = datetime.now(pytz.utc)
    current_time = utc_time.strftime("%-I:%S %p")
    current_date = utc_time.strftime("%A %m %-Y")

    data = {
            'utc_time': current_time,
            'utc_date': current_date,
        }

    return JsonResponse(data)
