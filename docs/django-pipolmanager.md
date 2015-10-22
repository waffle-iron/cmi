Title: Gestor de Usuarios con Django    
Date: 2015-10-20 7:04:44 p.m.
Category: dev

Ya tenemos un modelo personal para usuarios llamado `Pipol`, ahora vamos a crear el gestor, o sea el `PipolManager` con el que vamos a proporcionar dos métodos necesarios por Django para asegurar que puede usarse para crear usuarios.

El siguiente código lo vamos a colocar encima de nuestro modelo, porque tiene que ir primero.

```python
from django.contrib.auth.models import BaseUserManager


class PipolManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        if not email:
            raise ValueError('Debe ser una dirección de correo válida.')

        if not kwargs.get('username'):
            raise ValueError('Debe ser un nombre de usuario válido.')

        account = self.model(
            email=self.normalize_email(email), username=kwargs.get('username')
        )

        account.set_password(password)
        account.save()

        return account

    def create_superuser(self, email, password, **kwargs):
        account = self.create_user(email, password, **kwargs)

        account.is_admin = True
        account.save()

        return account
```

Igual que en el [artículo anterior](http://yo.toledano.org/modelo-de-usuario-personal-2/) vamos a analizarlo, punto por punto.

```python
        if not email:
            raise ValueError('Debe ser una dirección de correo válida.')

        if not kwargs.get('username'):
            raise ValueError('Debe ser un nombre de usuario válido.')
```

Tenemos que asegurar que tanto la dirección de correo electrónico como el nombre de usuario son válidos (por ejemplo, que no estén repetidos) o no están presentes y debemos lanzar una _excepción_ cuando una situación de esta se presente.

```python
        pipol = self.model(
            email=self.normalize_email(email), username=kwargs.get('username')
        )
```

Ya que no tenemos en  `PipolManager` el atributo `model`, `self.model` se refiere al `model` definido en `BaseUserManager`. Este es el estándar de `settings.AUTH_USER_MODEL`, que cambiaremos en un momento para que apunte a la clase `Pipol`.

```python
    def create_superuser(self, email, password, **kwargs):
        pipol = self.create_user(email, password, **kwargs)
        pipol.is_admin = True
        pipol.save()
        return pipol
```

Tal vez el principio más importante de Django sea __DRY__, que quiere decir _No te repitas_ o _Don't Repeat Yourself_, por eso, en lugar de repetir el código para crear un superusuario, simplemente dejamos que lo haga `create_user` y solo agregamos la clave `pipol.is_admin`.

### Estableciendo AUTH_USER_MODEL

Aunque ya tenemos el model `Pipol`, el comando `python manage.py createsuperuser` todabía crea objetos `User`. Esto es porque Django todavía cree que `User` es el modelo que debe usar para identificación.

Para indicarle a Django que debe emplear `Pipol`, debemos actualizar la configuración `settings.AUTH_USER_MODEL`.

Vamos a `core/settings/base.py` y agregamos al final:

```python
AUTH_USER_MODEL = 'core.Pipol'
```

Ahora solo tenemos que instalar la aplicación para poder realizar las migraciones. En este mismo archivo, agregamos `core`[^1] a la lista de `INSTALLED_APPS`.


```python
INSTALLED_APPS = (
    # ...,
    'core',
)
```

## Migración de aplicaciones

En Django, la acción de _migrar_ significa realizar cambios en la base de datos. Hay varios escenarios posibles para la _migración_. Veamos.

- Cuando las tablas indicadas por los modelos no existen, al _migrar_ es cuando se crean. 
- Cuando las tablas existen y se desaparece un campo, al migrar se aplican los cambios necesarios, es decir, se borran el o los cambios indicados.
- Cuando la tabla existe, _pero no tiene datos_ y se hay uno o más campos adicionales en el modelo, estos se agregan sin más.
- Cuando la tabla existe _y tiene datos_, y hay uno o mas campos adicionales en el modelo, se agregan con un dato por default que debe ser indicado de forma obligatoria.
- Creo que esos son los escenarios más comunes.

Al migrar nuestra aplicación esto es lo que sucede.

```bash
(core)toledano@toledano src (feature/user-model) $ python manage.py  migrate --settings=core.settings.local 
Operations to perform:
  Synchronize unmigrated apps: staticfiles, core, debug_toolbar, messages
  Apply all migrations: admin, contenttypes, auth, sessions
Synchronizing apps without migrations:
  Creating tables...
    Creating table core_pipol
    Running deferred SQL...
  Installing custom SQL...
Running migrations:
  Rendering model states... DONE
  Applying contenttypes.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0001_initial... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying sessions.0001_initial... OK
```

Y como ya existen las tablas, podemos crear el superusuario.

```
(core)toledano@toledano src (feature/user-model) $ python manage.py createsuperuser  --settings=core.settings.local 
Email: js.toledano@example.com
Username: toledano
Password: 
Password (again): 
Superuser created successfully.
```


[^1]: Creo que llamar `core` al núcleo no es una muy buena idea.
