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



[^1]: Pues suena horrible, pero asi se dice. Creo que la palabra correcta es __acreditación__.