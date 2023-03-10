workers = 2
threads = 4
timeout = 120
bind = "0.0.0.0:8000"
accesslog = '-'
errorlog = '-'
loglevel = 'info'
pythonpath = '/backend/'

# Serve static files
# Replace '/backend/static' with the path to your static files
# Replace '/backend/media' with the path to your media files
# Replace 'sea-turtle-app' with the name of your project
# Replace 'jamrequestmodule' with the name of your Django app
# Note that this configuration assumes you have already collected your static files using 'python manage.py collectstatic'
static_files = {
    '/static': '/backend/static',
    '/media': '/backend/media'
}
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
from whitenoise import WhiteNoise
application = WhiteNoise(application, root='/backend/static/sea-turtle-app', prefix='static/')
application.add_files('/backend/media/', prefix='media/')