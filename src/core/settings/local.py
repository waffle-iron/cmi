# -*- coding: UTF-8 -*-

#         app: mx.ine.tlax.sgc.cmi
#      módulo: settings.local
# descripción: Configuración para desarrollo local de CMI
#       autor: Javier Sanchez Toledano
#       fecha: domingo, octubre 18 de 2015

__author__ = 'Javier Sanchez Toledano'

from .base import *
from os import environ

DEBUG = True
ALLOWED_HOSTS = []
INSTALLED_APPS += (
    'debug_toolbar',
)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': PROJECT_DIR.child('data', 'cmi.db'),
    }
}

SECRET_KEY = 'kg[:{L[Rm >zT+~e-&;JR?Us,tN~-@c9wPXyS}Y)JfZo[W>Kr8-[y|5~O^,j4p&T'

