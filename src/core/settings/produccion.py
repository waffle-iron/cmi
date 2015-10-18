# -*- coding: UTF-8 -*-

#         app: mx.ine.tlax.sgc.cmi
#      módulo: settings.produccion
# descripción: Configuración para producción del CMI
#       autor: Javier Sanchez Toledano
#       fecha: domingo, octubre 18 de 2015

__author__ = 'Javier Sanchez Toledano'

from .base import *
from os import environ

DEBUG = False
ALLOWED_HOSTS = []
INSTALLED_APPS += (

)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': environ.get('DB_NAME'),
        'USER': environ.get('DB_USER'),
        'PASSWORD': environ.get('DB_PASS'),
        'HOST': environ.get('DB_HOST'),
        'PORT': environ.get('DB_PORT'),
    }
}
SECRET_KEY = environ.get('SECRET_KEY')