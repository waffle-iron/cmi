# -*- coding: UTF-8 -*-

#         app: mx.ine.tlax.sgc.cmi
#      módulo: settings.base
# descripción: Configuración común para el desarrollo de CMI
#       autor: Javier Sanchez Toledano
#       fecha: domingo, octubre 18 de 2015


__author__ = 'Javier Sanchez Toledano'

from unipath import Path
from os import environ

PROJECT_DIR = Path(__file__).ancestor(3)

MEDIA_ROOT = PROJECT_DIR.child("media")
MEDIA_URL = '/media/'

STATIC_URL = '/static/'
STATIC_ROOT = PROJECT_DIR.child("static")
STATICFILES_DIRS = (
    "assets",
)
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'compressor.finders.CompressorFinder',
)
COMPRESS_ENABLED = environ.get('COMPRESS_ENABLED', False)

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
    )
}

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

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'compressor',
    'rest_framework',

    'core'
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
)

ROOT_URLCONF = 'core.urls'
WSGI_APPLICATION = 'core.wsgi.application'

LANGUAGE_CODE = 'es-mx'
TIME_ZONE = 'Mexico/General'
USE_I18N = True
USE_L10N = True
USE_TZ = True

AUTH_USER_MODEL = 'core.Pipol'
