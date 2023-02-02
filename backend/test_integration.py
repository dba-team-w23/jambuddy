import requests
from settings import (API_HOST, API_PORT)


def test_backend_api():
    api_url = f"http://{API_HOST}:{API_PORT}/api/"
    response = requests.get(api_url)
    assert response.status_code == 200
    assert response.json() == {'message': 'API is working!'}
