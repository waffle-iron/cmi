Title: Revisión del Modelo de Usuarios 
Date: 2015-10-21 13:30:44 p.m.
Category: dev

Antes de cerrar el ciclo de esta característica, el tener un nuevo modelo de usuarios tenía que revisar que el modelo que estaba contruyendo fuera compatible con el modelo actual. Y que bueno, porque no son compatibles.

Este es el modelo actual:

```python
SITIO = ( 
  (0, 'Junta Local', ),
  (1, '01 Junta Distrital'),
  (2, '02 Junta Distrital'),
  (3, '03 Junta Distrital') 
)
PUESTOS = (
  ('VEL', 'Vocal Ejecutivo de la Junta Local'),
  ('VSL', 'Vocal Secretario de la Junta Local'),
  ('VRL', 'Vocal del RFE de la Junta Local'),
  ('JOSA', 'JO de Seguimiento y Análisis Distrital'),
  ('JOSAL', 'JO de Seguimiento y Análisis en la JL'),
  ('JOCE', 'Jefe de Cartografía'),
  ('JMM', 'Jefe de Monitoreo a Módulos'),
  ('VED', 'Vocal Ejecutivo de Junta Distrital'),
  ('VSD', 'Vocal Secretario de Junta Distrtital'),
  ('VRD', 'Vocal del RFE de Junta Distrital'),
  ('MC', 'Meta Colectiva'),
  ('VOL', 'Vocal de Organización de la Junta Local'),
  ('VOD', 'Vocal de Organización de Junta Distrital'),
  ('VCL', 'Vocal de Capacitación de la Junta Local'),
  ('VCD', 'Vocal de Capacitación de Junta Distrital'),
  ('RA', 'Rama Administrativa'),
)

class Pipol(AbstractUser):
sitio = models.IntegerField(choices=SITIO, default=0)
puesto = models.CharField (choices=PUESTOS, max_length=5, default='RA')
orden = models.IntegerField(default=99, blank=True, null=True)

def __unicode__ (self):
    return str(self.username)

def get_sitio (self):
    return SITIO[self.sitio][1].upper()

def is_mspe(self):
    if self.puesto == "RA":
        return False
    else:
        return True
```

Veo en este modelo que hay menos campos y uso menos constantes. Pero las principales diferencias son las siguientes:

```python
orden = models.IntegerField(default=99, blank=True, null=True)
```

Hay un campo de `orden`. Existe porque pensaba que había precedencia en el los puestos. O sea que los `VE` van antes que los `VO` y los `L` antes de los `D`. En realidad si me parece interesante el orden, pero debería estar relacionado con el puesto, no con el registro.

```python
def is_mspe(self):
     if self.puesto == "RA":
         return False
     else:
         return True
```

Ya sospechaba que no había necesidad de que `mspe` fuera un campo, porque se puede calcular. Este cambio si se va a nuestro modelo, como propiedad. Así es como quedó.

```python
def _is_mspe(self):
     if self.puesto == RA:
         return False
     else:
         return True
mspe = property(_is_mspe)
```

### Métodos obligatorios

Al intentar usar el modelo, ejecutando el comando `runserver` me aparecía un error relacionado con la ausencia de la propiedad `is_staff`, que se soluciona con  agregando los siguientes métodos y propiedades.

```python
@property
def is_superuser(self):
    return self.is_admin

@property
def is_staff(self):
    return self.is_admin

def has_perm(self, perm, obj=None):
    return self.is_admin

def has_module_perms(self, app_label):
    return self.is_admin
```

## Problemas y mas problemas
Cuando ejecuto el servidor, con la intención de verificar el funcionamiento del área administrativa obtengo una serie de errores relacionados con campos faltantes.

```
ERRORS:
<class 'core.admin.PipolAdmin'>: (admin.E019) The value of 'filter_horizontal[0]' refers to 'groups', which is not an attribute of 'core.Pipol'.
<class 'core.admin.PipolAdmin'>: (admin.E019) The value of 'filter_horizontal[1]' refers to 'user_permissions', which is not an attribute of 'core.Pipol'.
<class 'core.admin.PipolAdmin'>: (admin.E108) The value of 'list_display[2]' refers to 'first_name', which is not a callable, an attribute of 'PipolAdmin', or an attribute or method on 'core.Pipol'.
<class 'core.admin.PipolAdmin'>: (admin.E108) The value of 'list_display[3]' refers to 'last_name', which is not a callable, an attribute of 'PipolAdmin', or an attribute or method on 'core.Pipol'.
<class 'core.admin.PipolAdmin'>: (admin.E116) The value of 'list_filter[0]' refers to 'is_staff', which does not refer to a Field.
<class 'core.admin.PipolAdmin'>: (admin.E116) The value of 'list_filter[1]' refers to 'is_superuser', which does not refer to a Field.
<class 'core.admin.PipolAdmin'>: (admin.E116) The value of 'list_filter[2]' refers to 'is_active', which does not refer to a Field.
<class 'core.admin.PipolAdmin'>: (admin.E116) The value of 'list_filter[3]' refers to 'groups', which does not refer to a Field.
```

Supongo que espero demasiado de la clase `AbstractUser`.
