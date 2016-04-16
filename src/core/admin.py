# -*- coding: UTF-8 -*-

#         app: mx.ine.tlax.cmi
#      módulo: core.admin
# descripción: Administración de pipol
#  __author__: Javier Sanchez Toledano
#       fecha: octubre 22 de 2015

from django import forms
from django.contrib import admin
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.utils.translation import gettext as _

from .models import Pipol, Politica


class PipolChangeForm(UserChangeForm):
    email = forms.EmailField(label='Correo electrónico')

    class Meta:
        model = Pipol
        fields = ('email', 'username',)


class PipolCreateForm(UserCreationForm):
    email = forms.EmailField(
        label='Correo Electrónico',
        help_text='Escriba un correo electrónico',
    )

    def __init__(self, *args, **kwargs):
        super(PipolCreateForm, self).__init__(*args, **kwargs)
        self.fields['email'].required = True

    def save(self, commit=True):
        pipol = super(PipolCreateForm, self).save(commit=False)
        pipol.email = self.cleaned_data['email']
        if commit:
            pipol.save()
        return pipol

    class Meta:
        model = get_user_model()
        fields = ('email', 'username',)


class PipolAdmin(UserAdmin):
    add_form = PipolCreateForm
    add_fieldsets = (
        (None, {'fields': [('email', 'username', 'password1', 'password2')],
                'classes': ('aligned', ),
                }),
    )

    form = PipolChangeForm
    fieldsets = (
        (None, {'fields': [('email', 'username', 'password')]}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'rfc')}),
        (_('INE'), {'fields': ('entidad', 'sitio', 'puesto', )}),
        (_('Permissions'), {'fields': (
            'is_active', 'is_staff', 'is_superuser',
            'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )


class PoliticaAdmin(admin.ModelAdmin):
    pass


admin.site.register(Pipol, PipolAdmin)
admin.site.register(Politica, PoliticaAdmin)
