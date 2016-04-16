# -*- coding: UTF-8 -*-

#         app: mx.ine.sgc.cmi
#      módulo: core.models
# descripción: Modelos básicos del núcleo del CMI
#  __author__: Javier Sanchez Toledano
#       fecha: oct 19, 2015

from __future__ import unicode_literals

from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.core import validators
from django.core.mail import send_mail
from django.db import models
from django.utils import timezone
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import gettext as _

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


class TimeStampedModel(models.Model):
    """
    Es una clase abstracta basada en la clase Model que proporciona
    campos ``creacion``y ``actualizacion`` que se actualizan automáticamente.
    """
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class PipolManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, username, email, password, **extra_fields):
        """
        Creates and saves a User with the given username, email and password.
        """
        if not username:
            raise ValueError('The given username must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, email, password, **extra_fields)

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(username, email, password, **extra_fields)


@python_2_unicode_compatible
class Pipol(AbstractBaseUser, PermissionsMixin):
    """
    Clase para gestionar los usuarios del cuadro de mando integral.
    Incluye la posibilidad de incluir otras entidades y poder filtrar
    de acuerdo con ello.
    """
    email = models.EmailField(
        _('email'), unique=True,
        help_text='Escriba un correo electrónico',
    )
    username = models.CharField(
        _('username'),
        max_length=30,
        unique=True,
        help_text=_('''
            Obligatorio. 30 caracteres o menos. Letras, números
            ó @ . + - _ solamente.
        '''),
        validators=[
            validators.RegexValidator(
                r'^[\w.@+-]+$',
                _('Enter a valid username. This value may contain only '
                  'letters, numbers ' 'and @/./+/-/_ characters.')
            ),
        ],
        error_messages={
            'unique': _("A user with that username already exists."),
        },
    )

    first_name = models.CharField(
        _('Nombre'),
        max_length=70, blank=True
    )
    last_name = models.CharField(max_length=70, blank=True)
    rfc = models.CharField(
        'RFC', max_length=13, blank=True,
        help_text='Escriba el RFC del usuario'
    )

    entidad = models.PositiveSmallIntegerField(
        default=TLAXCALA, choices=ENTIDADES)
    sitio = models.PositiveSmallIntegerField(
        choices=SITIOS, blank=True, null=True
    )
    puesto = models.CharField(
        max_length=4, choices=PUESTOS, blank=True, null=True
    )
    orden = models.PositiveSmallIntegerField(default=99)

    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_(
            'Determina quienes pueden acceder al área interna.'),
    )
    is_active = models.BooleanField(
        _('active'),
        default=True,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = PipolManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """
        Sends an email to this User.
        """
        send_mail(subject, message, from_email, [self.email], **kwargs)

    @property
    def is_mspe(self):
        if self.puesto == RA:
            return False
        else:
            return True


class Politica(TimeStampedModel):
    revision = models.PositiveSmallIntegerField("Revisión")
    fecha = models.DateField("Fecha", help_text="Fecha de aprobación de la revisión")
    politica = models.TextField("Política", help_text="Contenido de la poítica de la calidad")

    class Meta:
        verbose_name = 'Política'
        verbose_name_plural = 'Políticas'

    def __str__(self):
        return "%02d - %s" % (self.revision, self.fecha)
