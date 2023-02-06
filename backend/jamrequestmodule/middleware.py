from django.conf import settings


class CorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        origin = request.META.get("HTTP_ORIGIN", "")
        if origin in settings.CORS_ORIGIN_WHITELIST:
            response["Access-Control-Allow-Origin"] = origin
        return response
