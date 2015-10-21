# -*- coding: UTF-8 -*-

#         app: mx.ine.sgc.cmi
#      módulo: core.models
# descripción: Modelos básicos del núcleo del CMI
#  __author__: Javier Sanchez Toledano
#       fecha: oct 19, 2015

from __future__ import unicode_literals
from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from django.utils.encoding import python_2_unicode_compatible
from django.contrib.auth.models import BaseUserManager


class PipolManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('Debe ser una dirección de correo válida.')

        if not kwargs.get('username'):
            raise ValueError('Debe ser un nombre de usuario válido.')

        pipol = self.model(
            email=self.normalize_email(email), username=kwargs.get('username')
        )
        pipol.set_password(password)
        pipol.save()

        return pipol

    def create_superuser(self, email, password, **kwargs):
        pipol = self.create_user(email, password, **kwargs)
        pipol.is_admin = True
        pipol.save()
        return pipol


@python_2_unicode_compatible
class Pipol(AbstractBaseUser):
    '''
    Clase para gestionar los usuarios del cuadro de mando integral.
    Incluye la posibilidad de incluir otras entidades y poder filtrar
    de acuerdo con ello.
    '''
    TLAXCALA = 29
    ENTIDADES = (
        (TLAXCALA, 'Tlaxcala'),
    )

    JL = 0
    JD01 = 1
    JD02 = 2
    JD03 = 3
    SITIOS = (
        (JL, 'Junta Local'),
        (JD01, '01 Junta Distrital'),
        (JD02, '02 Junta Distrital'),
        (JD03, 'O3 Junta Distrital')
    )

    VEL = 'VEL'
    VSL = 'VSL'
    VRL = 'VRL'
    VOL = 'VOL'
    VCL = 'VCL'
    VED = 'VED'
    VSD = 'VSD'
    VRD = 'VRD'
    VOD = 'VOD'
    VCD = 'VCD'
    JMM = 'JMM'
    JOSA = 'JOSA'
    JOCE = 'JOCE'
    RA = 'RA'

    PUESTOS = (
        (VEL, 'Vocal Ejecutivo de Junta Local'),
        (VSL, 'Vocal Secretario de Junta Local'),
        (VRL, 'Vocal del RFE de Junta Local'),
        (VCL, 'Vocal de Capacitación de Junta Local'),
        (VOL, 'Vocal de Organización de Junta Local'),
        (VED, 'Vocal Ejecutivo de Junta Distrital'),
        (VSD, 'Vocal Secretario de Junta Distrital'),
        (VRD, 'Vocal del RFE de Junta Distrital'),
        (VCD, 'Vocal de Capacitación de Junta Distrital'),
        (VOD, 'Vocal de Organización de Junta Distrital'),
        (JOSA, 'JOSA'),
        (JMM, 'Jefe de Monitoreo a Módulos'),
        (JOCE, 'Jefe de Cartografía'),
        (RA, 'Rama Administrativa')
    )

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=40, unique=True)

    nombre = models.CharField(max_length=40, blank=True)
    paterno = models.CharField(max_length=40, blank=True)
    materno = models.CharField(max_length=40, blank=True)
    rfc = models.CharField(max_length=13, blank=True)

    is_admin = models.BooleanField(default=False)

    entidad = models.PositiveSmallIntegerField(default=29, choices=ENTIDADES)
    sitio = models.PositiveSmallIntegerField(choices=SITIOS, blank=True, null=True)
    puesto = models.CharField(max_length=4, choices=PUESTOS, blank=True, null=True)
    is_mspe = models.BooleanField(default=False)
    is_activo = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = PipolManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    def get_full_name(self):
        return ' '.join([self.nombre, self.paterno, self.materno])

    def get_short_name(self):
        return self.nombre


