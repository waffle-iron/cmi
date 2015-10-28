:Title: Un nuevo PipolSerializer
:Date: 2015-10-24 1:58:01 p.m.
:Category: Desarrollo Web
:Tags:  Desarrollo Web, Django, REST Framework

Continuo ahora con el tutorial, que empezamos desde hace unos días. Vamos a agregar una nueva vista y a compararla con la que ya tenemos actualmente. Al final esta es la que vamos a usar.

<script src="https://gist.github.com/jstoledano/e7e34f49035bda082e7d.js"></script>

Además de incluir el campo `password` en la tupla `fields`, definimos a este campo de forma _explícita_ al principio de la clase `PipolSerial` y la razón es poder pasarle el argumento `required=False`. Todos los campos en `fields` son obligatorios, pero no queremos actualizar la contraseña del usuario a menos que pongamos uno nuevo.

Asi funcionan casi todos los sitios, te muestran el campo de contraseña, pero no se actualiza a menos que haya una nueva y se repita en la confirmación.

Por eso, también está definido el campo `confirm_password` del mismo modo que `password` para que no cambiemos la contraseña por accidente.

También debemos observar el argumento `write_only=True`. Se usa para que la contraseña del usuario, aunque se haya ofuscado, no debe ser visible para el cliente en la respuesta AJAX.

    class Meta:

La subclase `Meta` define los metadatos que el serializador necesita para operar.

        model = Pipol

Ya que estamos heredando el serializador de `serializers.ModelSerializer`, tiene sentido indicarle que modelo queremos serializar. Al especificar el modelo, tenemos la garantía que solo los atributos de ese modelo o los campos creados explícitamente pueden serializarse. Mas adelante hablaremos de como crear estos últimos.

        fields = ('id', 'email', 'username', 'created_at', 'updated_at',
                  'first_name', 'last_name', 'rfc',
                  'entidad', 'sitio', 'puesto', 'orden',
                  'is_staff', 'is_active',
                  'password', 'confirm_password')

El atributo `fields` de la clase `Meta` es donde especificamos los campos del modelo `Pipol` que van a ser _serializados_. Hay que tener cuidado cuando especificamos los campos a _serializar_ porque hay algunos, como `is_superuser`, no deben exponerse a los clientes por razones de seguridad.

        read_only_fields = ('created_at', 'updated_at',)

Cuando hicimos [el modelo `Pipol`](http://yo.toledano.org/revision-del-modelo-de-usuarios/), por razones de trazabilidad creamos los campos `created_at` y `updated_at`, pero debido a sus características debemos especificar que son de solo lectura.

    def create(self, validated_data):
        # ...

    def update(self, instance, validated_data):
        # ...

Convertir un objeto de Python en un JSON se llama _serialización_. El proceso contrario, es decir, convertir un JSON en un objeto de Python se llama __*deserialización*__ y es controlado por los métodos `.create()` y `.update()`. Cuando creamos un objeto, como `Pipol`, se usa el método `.create()`. Cuando se actualiza un registro, se usa el método `.update()`.

        instance.username = validated_data.get(
            'username', instance.username)
        instance.email = validated_data.get('email', instance.email)

Vamos a permitir que el usuario actualice su nombre de usuario (`username`) y su correo electrónico (`email`). Si esas claves están presentes en el array de diccionarios, lo usaremos como un nuevo valor. De otro modo, se usuará el valor actual de la `instancia`. En este ejemplo, `instancia` es un objeto de tipo `Pipol`.

        password = validated_data.get('password', None)
        confirm_password = validated_data.get('confirm_password', None)

        if password and confirm_password and password == confirm_password:
            instance.set_password(password)
            instance.save()

Antes de actualizar la contraseña del usuario, necesitamos confirmar que se han proporcionado valores tanto para el campo `password`, como para el campo `password_confirmation. Luego debemos verificar que esos campos tienen valores idénticos.

Luego de verificar que las contraseñas pueden actualizarse, usaremos el método `Pipol.set_password()` para realizar la actualización. El método `.set_password()` se encarga de almacenar las contraseñas de forma segura.

> La verdad es que este método para actualizar la contraseña es medio... medio... o sea, no lo uses en producción, pero para el ejemplo está correcto.

        update_session_auth_hash(self.context.get('request'), instance)

Cuando se actualiza la contraseña de un usuario, su marca de autenticación de sesión debe actualizarse explícitamente. Si no lo hacemos, el usuario no sera autenticado en la siguiente solicitud y tendrá que registrarse de nuevo.

## Conclusión

No deberíamos tener problemas al acceder a nuestros datos usando el serializador (aunque no veo el formato JSON) en ningún lado. Usando `shell` de Django podemo ver lo siguiente.

    In [1]: from core.models import Pipol
    In [2]: from core.serializers import PipolSerial
    In [3]: pipol = Pipol.objects.latest('created_at')
    In [4]: serial_pipol = PipolSerial(pipol)
    In [5]: serial_pipol.data.get('email')
    Out[5]: 'pipol@example.com'
    In [6]: serial_pipol.data.get('username')
    Out[6]: 'username'

Que es lo que queríamos lograr.