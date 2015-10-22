Title: Una aplicación de Django y AngularJS      
Date: 2015-10-18 2:29:38 p.m.  
Category: webdev  
Tags:  django, angular, RESTful, fullstack  
Summary: Construyendo una aplicación con Django, RESTful y AngularJS

La siguiente versión del Cuadro de Mando requiere el uso de tecnologías más modernas, como API, REST y _Single Page Applications_. Esto implica no solo la creación del _backend_, y un tema agradable en el _frontend_, sino de verdadera interactividad del lado del cliente. Hay tres o cuatro tecnologías en las que me quiero enfocar para la SPA: [AngularJS](https://angularjs.org) de Google, [ReactJS](http://facebook.github.io/react/) de Facebook, [EmberJS](http://emberjs.com) y [Aurelia.IO](http://aurelia.io).

La idea es contruir una interfaz programática de acceso y consumirla con cualquier cliente. Como cada una de las aplicaciones es independiente, solo tengo que contruir una API y cada _app_ puede usar uno de estos _JavaScript Frameworks_. 

Pero vamos a empezar con __AngularJS__.

En este serie[^1] vamos a ver de forma muy simple como es que podemos usar Django y AngularJS. Como la aplicación es real, trataré de tomar las mejores decisiones y usar las mejores prácticas de programación[^2].

## El entorno de programación

En un [artículo anterior](http://goo.gl/w5XPdm) nos quedamos en que ya teníamos nuestro tema configurado. Teníamos un archivo `packages.json` para los módulos de __NodeJS__, un archivo `bower.json` para los módulos de __Bower__ y un archivo `Gruntfile.js` para nuestras tareas de __Grunt__. Pero ninguno de los tutoriales consultados pone la configuración del entorno como algo _sencillito_, así que vamos a tener que reconstruir el entorno con un poco de _ingeniería inversa_.

### El entorno virtual de Python+Django

Vamos a empezar con [Django][django] y el conjunto de requisitos para nuestro sistema. Pero primero debemos crear nuestro entorno virtual, con `mkvirtualenv core`. Y después vamos a instalar los paquetes sugeridos. 

La lista incluye, además de Django, al paquete 

- [**Django REST Framework**][drf] - El conjunto de herramientas que con el que vamos a crear la API de cuadro de mando integral, versión 3.2 
- [**Nested Routers for Django Rest Framework**][drf-nested] - Un paquete para crear ruteadores y registros anidados[^3]
- [**Django Database URL**][dburl] - Un paquete para usar databases con URL, como en Heroku, inspirados en [12factor](http://goo.gl/mRk4Hw).
- **Unipath** - Un paquete para gestionar las rutas de los archivos, que se usa en el CMI.

Hay otras dependiencias en el proyecto, pero no las necesitamos por el momento. Y la que se llama `django-appconf` no va con el proyecto.

Así que vamos a instalar con `pip install`: `django`, `djangorestframework`, `drfnested-routers` y `dj-database-url`. Y este es el resultado final del comando `pip freeze`:

```
dj-database-url==0.3.0
Django==1.8.5
djangorestframework==3.2.4
drf-nested-routers==0.10.0
Unipath==1.1
wheel==0.24.0
```

### El entorno de Bower

Vamos a necesitar, además, los siguientes paquetes con **Bower**, por los que se van a instalar con la marca  `--save-dev` y al final veremos como va nuestro `bower.json`:

```json
  "devDependencies": {
    "bootstrap": "~3.3.5",
    "angular": "~1.4.7",
    "angular-route": "~1.4.7",
    "angular-cookies": "~1.4.7",
    "bootstrap-material-design": "~0.3.0",
    "jquery": "~2.1.4",
    "ng-dialog": "ngDialog#~0.5.5",
    "underscore": "~1.8.3"
  }
```

### La gestión de tareas con Gulp

> Uno de los requisitos del tutorial es **Gulp**, una herramienta de gestión de tareas que sigue un camino diferente a Grunt, ya que privilegia el código sobre la configuración. Así que también vamos por Gulp.

El concepto de trabajo de **Gulp** incluye _flujos_ de procesos y de tareas, es decir, un conjunto ordenado de actividades que transforman elementos de entrada en resultados. La salida de una tarea es, comúnmente, la entrade de la siguiente[^4]. 

Con **Gulp** el archivo de tareas es código, no es un archivo de configuración. Usamos librerías independientes para hacer las cosas. Los _plugins_ son simples y hacen una y sola cosa, muchos son una simple función de menos de 20 líneas, además las tareas se ejecutan concurrentemente de un modo que puede hacerse un diagrama de flujo.

Como no sabemos nada de Gulp, vamos a instalarlo sin preguntar, por ahora solo sigamos estos pasos:

1. Instalamos gulp globlamente  
    ```
    (core)toledano@toledano src (develop) $ npm install --global gulp
    ```
2. Instalamos `gulp` en nuestro archivo de dependencias:
    ```
    (core)toledano@toledano src (develop) $ npm install gulp --save-dev
    ```
1. Creamos un archivo `gulpfile.js`
    ```
    var gulp = require('gulp');
    var ngAnnotate = require('gulp-ng-annotate');
    var uglify = require('gulp-uglify');

    gulp.task('default', ['build'], function () {
    });

    gulp.task('build', function () {
      return gulp.src('sources/js/**/*.js')
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'));
    });
    ```
   
Nos quedamos así, por el momento. Más adelante veremos más a detalle como usar `gulp`.

> A mi me sale un error cuando ejecuto `$ gulp`, pero luego lo resolveré.

## Creando el proyecto con Django

El proyecto `core` es el núcleo del Cuadro de Mando[^5]. Todas las apps del CMI inician con una _app_ `core`, pero no tiene ninguna caracterísitca mas que gestionar el proyecto durante el desarrollo de la _app_. Pero este `core`  es el verdadero, el que se usará en producción, por lo tanto usará todas las características que ya ofrece el CMI, pero mejores.

El proyecto se crea de la forma habitual `django-admin startproject core` y así se crea la estructura básica.

```
(core)toledano@toledano src (develop) $ tree core
src
├── core
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── manage.py
```

### Configurar PyCharm

Ahora voy a configurar __PyCharm__ para asegurarme que funciona con la configuración usada en el CMI.

Primero debemos configurar el soporte a Django. En _Preferences_ > _Project: cmi_core_ > _Project Interpreter_ seleccionamos el entorno virtual que estamos usando `core`.

![Project Interpreter](http://media.toledano.org/images/2015/pycharm_project_interpreter.png)

También es importante configurar la escturtura del proyecto para que PyCharm sepa dónde encontrará los archivos, la configuración está en el mismo grupo que la opción anterior.

![Project Structure](http://media.toledano.org/images/2015/project_sctucture.png)

La siguiente opción es para indicarle a __PyCharm__ dónde están los archivos de nuestro proyecto, en _Preferences_ > _Languages & Frameworks_ > _Django_:

![Soporte para Django](http://media.toledano.org/images/2015/pref_django.png)

Y por último configuramos un servidor de pruebas, que podamos ver en `loalhost`, en el menú _Run_ > _Run ..._ > _Edit Configurations_ creamos un nuevo _Django server_:

![Django Server](http://media.toledano.org/images/2015/django_server.png)

Podemos ver que nuestro proyecto está bien configurado, cuando ejecutamos este servidor y vemos la conocida página de pruebas de un proyecto de Django vacío. Y además la consola de PyCharm nos da toda la información que necesitamos.

![Django running...](http://media.toledano.org/images/2015/django_running.png)

### La configuración del núcleo del CMI

Al contrario de una app en desarrollo que va muy bien con la configuración que crea `django-admin startproject`, el núcleo tiene una configuración un tanto diferente, ya que usará una configuración múltiple. 

Obvio, esto requerirá de cambios en la configuración de PyCharm, pero son mínimos.

Básicamente, uso una configuración para desarrollo (en mi lap), una para pruebas (en una VPS) y una para producción (en el servidor del CMI). Claro que tienen muchas configuraciones en común, por eso, hay un archivo llamado `base.py`.

Pero primero, hay que crear el módulo de configuración, en un directorio llamado `settings` creamos un archivo vacío `__init__.py` y dentro ponemos los archivos de configuración.

Este es el archivo `base.py`:

```python
# -*- coding: UTF-8 -*-

#         app: mx.ine.tlax.sgc.cmi
#      módulo: settings.base
# descripción: Configuración común para el desarrollo de CMI
#       autor: Javier Sanchez Toledano
#       fecha: domingo, agosto 18 de 2013


__author__ = 'Javier Sanchez Toledano'

from unipath import Path

PROJECT_DIR = Path(__file__).ancestor(3)
MEDIA_ROOT = PROJECT_DIR.child("media")
STATIC_URL = '/static/'
MEDIA_URL = '/media/'
STATIC_ROOT = PROJECT_DIR.child("static")
STATICFILES_DIRS = (
    "assets",
)

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'core'
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
)

ROOT_URLCONF = 'core.urls'
WSGI_APPLICATION = 'core.wsgi.application'

LANGUAGE_CODE = 'es-mx'
TIME_ZONE = 'Mexico/General'
USE_I18N = True
USE_L10N = True
USE_TZ = True
```

El archivo `local.py` contiene la configuración usada durante el desarrollo, incluye la configuración de la base de datos, de a mentiritas, y una `SECRET-KEY` también usada en desarrollo:

```python
# -*- coding: UTF-8 -*-

#         app: mx.ine.tlax.sgc.cic
#      módulo: settings.local
# descripción: Configuración para desarrollo local de CIC
#       autor: Javier Sanchez Toledano
#       fecha: lunes, 26 de enero, 2015

__author__ = 'Javier Sanchez Toledano'

from .base import *
from os import environ

DEBUG = True
TEMPLATE_DEBUG = True
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

SECRET_KEY = "5JJ4Nh|j(|k[jw4*-D~$S?54C,9gwl/Q_5t`Tw%*+ZUIA-~itK}zo++<K&|N|R-X"
```

Como pueden ver, durante el desarrollo, uso una base de datos SQLite y todos los datos están expuestos, pero para producción, la cosa cambia.

Para producción uso PostgreSQL, y los datos se toman de las variables de entorno, por lo que no están visibles en la configuración.

```python
# -*- coding: UTF-8 -*-

#         app: mx.ine.tlax.sgc.cmi
#      módulo: settings.produccion
# descripción: Configuración para producción del CMI
#       autor: Javier Sanchez Toledano
#       fecha: jueves, 16 de enero, 2015

__author__ = 'Javier Sanchez Toledano'

from .base import *
from os import environ

DEBUG = False
TEMPLATE_DEBUG = False
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
```

Para usar esta configuración en la consola tendríamos que usar:

```
(core)toledano@toledano src (develop) $ python manage.py runserver --settings=core.settings.local
Performing system checks...

System check identified no issues (0 silenced).
```

Ahora que todo está funcionando, podemos crear las tablas en la base de datos:

```
(core)toledano@toledano src (develop) $ python manage.py migrate --settings=core.settings.local
Operations to perform:
  Synchronize unmigrated apps: staticfiles, core, debug_toolbar, messages
  Apply all migrations: admin, contenttypes, auth, sessions
Synchronizing apps without migrations:
  Creating tables...
    Running deferred SQL...
  Installing custom SQL...
Running migrations:
  Rendering model states... DONE
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying sessions.0001_initial... OK
```

Y al administrador del sitio.

```
(core)toledano@toledano src (develop) $ python manage.py createsuperuser --settings=core.settings.local
Username (leave blank to use 'toledano'): 
Email address: js.toledano@mi_correo_esta_en_todos_lados.com
Password: 
Password (again): 
Superuser created successfully.
```


En el siguiente artículo vamos a crear el nuevo modelo de Usuario, un paso clave en el nuevo cuadro de mando.


[^1]: En este momento no sé cuántos artículos sean necesarios... 
[^2]: Esta serie toma lo mejor de varios artículos que he encontrado en la red: [este](https://goo.gl/XdBPF7), [este](http://goo.gl/LhP0be) y también [este](http://glynjackson.org/weblog/tutorial-using-angularjs-django/).
[^3]: Sea eso lo que sea.
[^4]: ¿Les parece conocida la definición? ¡Pues claro! Es la definición de un sistema, según la norma ISO 9000.
[^5]: Por algo me llaman _el obvio_.

[django]: http://goo.gl/bLMgU8
[drf]: http://goo.gl/G7nxf6
[drf-nested]: http://goo.gl/uyioax
[dburl]: http://goo.gl/ULZ2Wp

