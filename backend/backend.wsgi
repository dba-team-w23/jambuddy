import os
import sys
from pathlib import Path
from django.core.wsgi import get_wsgi_application

# Set your current working directory
os.environ['DJANGO_PROJECT_PATH'] = str(Path(__file__).absolute().parent.parent)

# Path to the project directory
sys.path.append(os.environ['DJANGO_PROJECT_PATH'])

# Activate your virtual environment
activate_env=os.path.expanduser(os.environ['DJANGO_PROJECT_PATH']) + "/venv/bin/activate_this.py"
exec(open(activate_env).read(),dict(__file__=activate_env))

# Start your application
application = get_wsgi_application()
