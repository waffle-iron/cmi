Title: Modelo de usuario personal    
Date: 2015-10-19 7:56:15 p.m.
Category: Desarrollo Web
Tags: django, user model

Sin duda, la principal debilidad del actual cuadro de mando es la carencia de un adecuado control de usuarios. Ni siquiera puedo decir que sea malo, es que no existe. Y con las mejoras planeadas para el nuevo CMI, contar con un modelo de usuarios moderno y funcional es indispensable. De hecho, el perfil de usuarios es la caracerística toral y eje del sistema de roles y seguridad.

Ya había intentado tener un modelo propio de usuarios y no resultó, o mas bien, resulto el Frankenstein que usamos actualmente. En esta ocasión estoy decidido a aprovechar esa oportunidad de mejora.

El problema con el modelo `User` que tiene por default el Django es que solo contiene información muy básica. No puede ampliarse para que tenga más información, por ejemplo, el sitio de adscripción o si es miembro del servicio profesional o de la rama administrativa son datos que no forman parte de `User` y no podemos agregar así nomás.

El modelo `User` hereda la mayoría de sus características del modelo `AbstractUserModel`. Y nosotros vamos a usar este útimo modelo para crear el nuestro, `Pipol` con las mismas funcionalidades de `User`[^1] pero con esas características que nos interesan, como el sitio y el puesto.

Además, este modelo está dentro del mismísimo núcleo. Y es que la mayoría de los tutoriales nos dicen que hagamos una app exclusiva para el control de usuarios, pero yo soy un rebelde y quiero que el control de usuarios sea el núcleo del sistema, a donde las otras aplicaciones se conecten.

Este el el modelo que vamos a usar, que contiene los datos que necesitamos. Lo vamos a crear en `core/models.py`.

```python
from django.contrib.auth.models import AbstractBaseUser
from django.db import models
from __future__ import unicode_literals
from django.utils.encoding import python_2_unicode_compatible


@python_2_unicode_compatible
class Pipol(AbstractBaseUser):
    '''
    Clase para gestionar los usuarios del cuadro de mando integral.
    Incluye la posibilidad de incluir otras entidades y poder filtrar
    de acuerdo con ello.
    '''
    ENTIDADES = (
        (29, 'Tlaxcala'),
    )
    SITIOS = (
        (0, 'Junta Local'),
        (1, '01 Junta Distrital'),
        (2, '02 Junta Distrital'),
        (3, 'O3 Junta Distrital')
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
```

Vamos a revisar detalladamente nuestro modelo.

```
from __future__ import unicode_literals
from django.utils.encoding import python_2_unicode_compatible

@python_2_unicode_compatible
class Pipol(AbstractBaseUser):
```

Lo primero que notamos es el decorador `@python_2_unicode_compatible` y es que actualmente el CMI usa Python 2.7, pero vamos a migrar a Python 3[^2], por lo que siguiendo las [indicaciones de Django](https://goo.gl/GlAkuH), usamos el decorador para no tener que escribir dos funciones, una `__unicode__` y otra `__str__`.


[^1]: La ofuscación de la contraseña, la gestión de sesiones, etc.
[^2]: Al paso que vamos, seguro será Python 3.6.
