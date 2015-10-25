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

t
