Title: Revisión del Modelo de Usuarios 
Date: 2015-10-21 13:30:44 p.m.
Category: dev

Bueno, pues me equivoqué. Necesitaba algunas características que requerían inicialmente solo de agregar campos al modelo usuario, usando el modelo `AbstractUser`, pero el tutorial que estaba siguiendo insiste en usar el correo electrónico como nombre de usuario, pues es ahí donde las cosas no funcionaron para mi.

Lo que hice en realidad fue comprender como se formaba el modelo de usuario en Django y reproducirlo. Efectivamente, repetí el modelo, con algunas modificaciones, pero en el proceso aprendí mucho.

## El modelo User de Django

El modelo `User` de Django está formado por el modelo `AbstractUser` que a su vez hereda sus características de dos modelos más: `AbstractBaseUser` y `PermissionMixin`.

`AbstractBaseUser` nos da los campos `password` y `last_login` y una serie de métodos relacionados con la contraseña y seguridad.

`AbstractUser` los campos `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active` y `date_joined`, además de los métodos `get_full_name`, `get_short_name` y `email_user`.

Por su parte, el modelo `PermissionMixin` nos da, entre otras cosas, el campo `is_superuser`, las relaciones `groups` y `user_permissions` y una serie de útiles métodos relacionados con permisos.

## El modelo Pipol

Decidí recrear la funcionalidad de `AbstractUser` para aprender mejor como funciona este modelo. Basícamente copié y pegué el [código fuente de Django](https://github.com/django/django/blob/stable/1.8.x/django/contrib/auth/models.py) y agregué los cambios que necesitaba para mi modelo.

Los campos que necesito son los siguientes:

```python
    rfc = models.CharField(
        'RFC', max_length=13, blank=True,
        help_text='Escriba el RFC del usuario'
    )
```

Algunas aplicaciones del CMI requieren conocer el Registro Federal de Contribuyentes. Hay un proyecto de Django llamado [_Local Flavors_](http://django-localflavor.readthedocs.org/en/latest/localflavor/mx/#) que nos proporciona una serie de auxiliares específicos para México, tal vez lo use más adelante.

```python
    entidad = models.PositiveSmallIntegerField(default=29, choices=ENTIDADES)
    sitio = models.PositiveSmallIntegerField(
        choices=SITIOS, blank=True, null=True
    )
    puesto = models.CharField(
        max_length=4, choices=PUESTOS, blank=True, null=True
    )
```

Nos permiten ubicar a los funcionarios. No había decidido usar el campo `orden` hasta ahora, pero ya que domino el modelo de usuarios, incluso si decido quitarlo mas adelante, gracias a las migraciones será una tarea trivial.

```python
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

Dejo estos campos, de nuevo, pensando en que tal vez la aplicación que estoy desarrollando los use en el futuro. Si no es así, siempre podré borrarlos.

```python
    @property
    def is_mspe(self):
        if self.puesto == RA:
            return False
        else:
            return True
```

`is_mspe` simplemente identifica a los miembros del servicio profesional y así no tiene que ser un campo. Aunque como un campo podría usarlo como un filtro. Ya veremos más adelante.

Al final este es el modelo.

```python
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
            Required. 30 characters or fewer. Letters, digits and
            @/./+/-/_ only.
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

    entidad = models.PositiveSmallIntegerField(default=TLAXCALA, choices=ENTIDADES)
    sitio = models.PositiveSmallIntegerField(
        choices=SITIOS, blank=True, null=True
    )
    puesto = models.CharField(
        max_length=4, choices=PUESTOS, blank=True, null=True
    )
    orden = models.PositiveSmallIntegerField()

    is_staff = models.BooleanField(
        _('staff status'),
        default=False,
        help_text=_('Designates whether the user can log into this admin site.'),
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
```

### El gestor de objetos PipolManager

El `PipolManager` es básicamente el mismo que viene con Django. 

```python
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
```

Ya sé que estoy repitiendo, pero el proceso me ayudó a comprender como funciona.




