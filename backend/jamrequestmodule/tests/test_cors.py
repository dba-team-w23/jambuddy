import requests
import pytest


def test_backend_api_cors():
    API_URL = "https://dbajamteam.pythonanywhere.com/api/users/"
    response = requests.get(API_URL)
    assert response.headers.get("access-control-allow-origin") == "*"
