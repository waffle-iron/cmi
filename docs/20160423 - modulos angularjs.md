Title: Los módulos en AngularJS    
Date: 2016-04-23 20:16:29  
Category: Desarrollo Web  
Tags: angularjs   
Summary:   

Creo que una de las primeras cosas que deben hacerse cuando se trabaja con AngularJS es crear una estructura que haga eficiente el mantenimiento del código fuente usando **módulos**. Un módulo de AngularJS es un contenedor que agrupa diferentes componentes de nuestras aplicaciones bajo un nombre común.

Para comprender mejor cómo lograr una estructura eficaz y eficiente en AngularJS vamos a crear una pequeña aplicación y a _consumirla_ con AngularJS.

!!! notice "La Política de la Calidad"
    Vamos a controlar los cambios de la política de la calidad. Inicialmente vamos a registrar todas las versiones de la política de la calidad y una API RESTful que suministre la lista de todas las versiones existentes. La aplicación de AngularJS _consumirá_ esta API y primero mostrará solo la versión actual de la política; un enlace adicional nos mostrará el histórico de las políticas y en una versión posterior comparará una versión con cualquier otra y señalará los cambios.

## El modelo de la Política (Django)

Nuestro modelo es muy simple, porque solo tiene tres campos: uno para el número de revisión, otro para la fecha de aprobación y otro para el contenido de la política.

```python
from django.db import models


class TimeStampedModel(models.Model):
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Politica(TimeStampedModel):
    revision = models.PositiveSmallIntegerField()
    fecha = models.DateField()
    politica = models.TextField()

    class Meta:
        ordering = ('-revision', )
```


Usamos un modelo abstracto para controlar las fechas de creación y modificación y ordenamos el histórico de las políticas por número de revisión. No tiene mucho misterio todavía.

!!! error "Un control más preciso"
    En una versión más profesional de este control de las políticas, debería registrarse también el usuario que hace la modificación y contar con validaciones adicionales, como el número de versión que no debe repetirse o la fecha de aprobación que debe ser posterior a la de la revisión próxima pasada.

### El serializador para la política

Para convertir un objeto `Politica` en un objeto _serializable_ para nuestra API, [Django REST Framework][drf] hace el trabajo por nosotros. 

    from rest_framework import serializers
    from .models import Politica

    class PoliticaSerializer(serializers.ModelSerializer):
        class Meta:
            model = Politica
            fields = ('revision', 'fecha', 'politica')

Como pueden ver, es algo muy simple crear este serializador.

### Cómo crear la API de la política

Con los dos elementos anteriores estamos listos para crear la API, 


Structuring your code is the key to writing maintainable software. The good news is that with AngularJS you can easily divide your front-end source code into reusable components, called modules. An AngularJS module is basically a container that groups together different components of your application under a common name. If you look at the Angular Seed project that we downloaded in Chapter 1, you can see that there are different modules defined in the files controllers.js, directives.js, filters.js , services.js, etc. In our main JavaScript file, app.js, we have a module myApp which depends on the above modules (yes, modules can depend on other modules). Finally, in the HTML we tell AngularJS to start bootstrapping our app using myApp module as the starting point. This is done by writing ng-app='myApp'in the HTML.

[drf]: http://www.django-rest-framework.org/