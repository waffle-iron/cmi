# -*- coding: UTF-8 -*-

#         app: mx.ine.tlax.cmi
#      módulo: core.admin
# descripción: Administración de pipol
#  __author__: Javier Sanchez Toledano
#       fecha: octubre 22 de 2015

from django.contrib import admin
from django.utils.translation import gettext as _
from django.contrib.auth.admin import UserAdmin
from .models import Pipol


class PipolAdmin(UserAdmin):
    fieldsets = (
        (None, {'fields': [('email', 'username', 'password')]}),
        (_('Personal info'), {'fields': ('first_name', 'last_name')}),
        (_('INE'), {'fields': ('entidad', 'sitio', 'puesto', )}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )


admin.site.register(Pipol, PipolAdmin)
