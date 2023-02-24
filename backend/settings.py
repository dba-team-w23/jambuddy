"""
Django settings for project project.

Generated by 'django-admin startproject' using Django 3.0.7.

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

import os
import environ

env = environ.Env()
environ.Env.read_env()

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')

ALLOWED_HOSTS = [
    '0.0.0.0',
    'localhost',
    'http://localhost:3000',
    'http://localhost:8000',
    'http://dbajamteam.pythonanywhere.com',
    'https://dbajamteam.pythonanywhere.com',
    'dbajamteam.pythonanywhere.com',
    'sea-turtle-app-zggz6.ondigitalocean.app',
    ]
# pythonanywhere.com is the host that Docker uses to run application

INSTALLED_APPS = [
    'rest_framework',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'jamrequestmodule',
    # 'corsheaders',
]

MIDDLEWARE = [
    # These should work per Django docs, but when enabled, PythonAnywhere VirtualEnv does not load.
    # The error states corsheaders/signals.py received an unexpected keyword argument 'providing_args'
    # StackOverflow suggests this is an issue with dependencies (Django and CorsHeaders mismatch)
    # Both within, and outside of, the VirtualEnv, Django and CorsHeaders are both the most up-to-date versions: which per the docs are compatible
    # Whyyyyy is this happening???
    # 'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # "jamrequestmodule.middleware.CorsMiddleware",

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

AUTH_USER_MODEL = 'jamrequestmodule.Profile'

CORS_ALLOW_ALL_ORIGINS = True

# Used by Django Debug Toolbar
INTERNAL_IPS = ['127.0.0.1']


ROOT_URLCONF = 'jamrequestmodule.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'jamrequestmodule.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases

# For ElephantSQL (PostgreSQL) Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('POSTGRES_USER'),
        'USER': env('POSTGRES_USER'),
        'PASSWORD': env('POSTGRES_PASSWORD'),
        'HOST': env('POSTGRES_HOST'),
        'PORT':'5432'
    }
}

# For Local Development (Not tied to ElephantSQL)
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }

# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

API_PORT = env('API_PORT')
API_HOST = env('API_HOST')

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ]
}

APPEND_SLASH = False

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, 'static')


# this should be put at the end of the settings.py file
# CORS_ORIGIN_WHITELIST = [
#      'http://localhost:3000'
# ]

# CORS_ORIGIN_WHITELIST = ['*']

# CORS_ORIGIN_ALLOW_ALL = False

# CORS_ORIGIN_WHITELIST = [
#      "http://jambuddy.vercel.app",
#      "https://jambuddy.vercel.app",
#      'http://localhost:3000',
#      'https://localhost:3000',
#      'http://localhost:8000',
#      'https://localhost:8000',
# ]

# CORS_ORIGIN_REGEX_WHITELIST = (
#     r'^(https?://)?(www\.)?(jambuddy\.vercel\.app|localhost:3000)\.*$'
# )

# CORS_ALLOWED_ORIGINS = [
#      "http://jambuddy.vercel.app",
#      "https://jambuddy.vercel.app",
#      "http://jambuddy.vercel.app/",
#      "https://jambuddy.vercel.app/",
#      'http://localhost:3000',
#      'https://localhost:3000',
#      'http://localhost:8000',
#      'https://localhost:8000',
# ]

CORS_ALLOW_ALL_ORIGINS = True
# CORS_ALLOW_CREDENTIALS = True

