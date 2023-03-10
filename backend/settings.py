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
from django.conf.urls.static import static

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

INSTALLED_APPS = [
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'jamrequestmodule',
    'rest_framework',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# MISC APP ENV VARS
API_PORT = env('API_PORT')
API_HOST = env('API_HOST')
AUTH_USER_MODEL = 'jamrequestmodule.Profile'
APPEND_SLASH = False
# library corsheaders.CorsModel did not specify PK, this suppresses the warning
DEFAULT_AUTO_FIELD = 'django.db.models.AutoField'
WSGI_APPLICATION = 'jamrequestmodule.wsgi.application'

ALLOWED_HOSTS = ['*']
CORS_ALLOW_ALL_ORIGINS = True       #New versions of cors library
CORS_ORIGIN_ALLOW_ALL = True        #Older versions of cors library

# ALLOWED_HOSTS = [
#     '0.0.0.0',
#     'localhost',
#     'http://localhost:3000',
#     'http://localhost:8000',
#     'sea-turtle-app-zggz6.ondigitalocean.app',
# ]

# #New Versions of cors library
# CORS_ALLOWED_ORIGINS = [
#      "http://jambuddy.vercel.app",
#      "http://jambuddy.vercel.app/",
#      "https://jambuddy.vercel.app",
#      "https://jambuddy.vercel.app/",
#      'http://localhost:3000',
#      'https://localhost:3000',
#      'http://localhost:8000',
#      'https://localhost:8000',
# ]

# #Older Versions of cors library
# CORS_ORIGIN_WHITELIST = CORS_ALLOWED_ORIGINS


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

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ]
}

# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Used by Django Debug Toolbar
INTERNAL_IPS = ['127.0.0.1']
ROOT_URLCONF = 'jamrequestmodule.urls'

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')