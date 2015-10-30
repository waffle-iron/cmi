Title: Vistas serializadas en Django    
Date: 2015-10-28 8:20:55 p.m.
Category: Desarrollo Web
Tags: django, rest, angular
Summary: 

En este punto, ya tenemos el modelo y los serializadores para representar a nuestros usuarios. Ahora necesitamos contruir el sistema de autenticación[^1]. Esto implica que debemos crear las vistas e interfaces para que los usuarios se registren, ingresen y salgan del sistema. 

Y como no podemos _acreditar_ a usarios que no existen, suena bastante coherente empezar con el registro.

PAra registrar un nuevo usuarios, necesitamos un punto de acceso a la API que sirva para crear objetos `Pipol`, un servicio de AngularJS que haga la solicitud AJAX a la API y el formulario de registro. Vamos a empezar con el punto de acceso a la API.

### Cómo crear _viewsets_ para una API

Vamos a abrir el archivo `core/views.py` y vamos a reemplazar su contenido con el siguiente código.

```python
from rest_framework import permissions, viewsets

from authentication.models import Account
from authentication.permissions import IsAccountOwner
from authentication.serializers import AccountSerializer


class AccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsAccountOwner(),)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Account.objects.create_user(**serializer.validated_data)

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)
```

Analicemos esta vista línea por línea.


    class AccountViewSet(viewsets.ModelViewSet):

El módulo Django REST Framework ofrece una característica llamada _viewsets_. Un _viewset_, como su nombre lo indica es _un conjunto de vistas_. Específicamente, `ModelViewSet` no entrega una interface para listar, crear, obtener, actualizar y destruir objetos del modelo dado.

```
    lookup_field = 'username'
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
```

Aquí lo que hicimos fue definir el _queryset_ y el serializador con el que el _viewset_ va a operar. Django REST Framework usa estos objetos para realizar las operaciones que mencionamos antes. Debemos notar que hemos especificado el atributo `lookup_field`, que como mencionamos anteriormente, usará el campo `username` del modelo `Pipol` para buscar las cuentas, en lugar del campo `id`. 

```python
    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsAccountOwner(),)
```

El único usuario que puede llamar a métodos _«peligrosos»_ (como `update()` y `delete()`) es el dueño de la cuenta. Por lo tanto, primero debemos verificar que el usuario se ha acreditado y luego llamar al verificador de permisos personalizado que veremos un poco más adelante. Este caso no aplica cuando el método HTTP es `POST`. Lo que queremos es que cualquier usuario pueda crear una cuenta.

Si el método HTTP de la solicitud (`GET`, `POST`, etc.) es _«seguro»_, entonces, cualquiera puede usar el punto de acceso.

```python
    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Account.objects.create_user(**serializer.validated_data)

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)
```

Cuando creamos un objeto usando el método `.save()` del serializador, los atributos del objeto se establecen de forma literal. Esto signigica que si el usuario registra como contraseña la palabra `'contraseña'`, entonces debemos almacenar en el campo `password` la palabra `'contraseña`. Esto puede ser un problema por dos razones: primero, almacenar contraseñar en formato de texto es un grave problema de seguridad y segundo, Django ofusca[^2] las contraseñas antes de compararlas, así que el usuario no podría usar `'contraseña'` así nomás.

En este ejemplo, resolvemos el problema sobre-escribiendo el método `.create()` usado por el _viewset_, usando `Pipol.objects.create_user()` para crear el objeto `Pipol.`

## Los permisos para Pipol

Para poder hacer esa cosa de los permisos, `IsPipolOwner()`, primero debemos crear el archivo `core/permissions.py` con el siguiente contenido.


```python
from rest_framework import permissions


class IsPipolOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, account):
        if request.user:
            return account == request.user
        return False
```

[^1]: Pues suena horrible, pero asi se dice. Creo que la palabra correcta es __acreditación__.

[^2]: En informática, __ofuscar__ se refiere a encubrir el significado de una comunicación haciéndola más confusa y complicada de interpretar.