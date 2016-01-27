Title:  Curso de Angular, 1   
Date: 2015-11-07 20:18:14  
Category: Desarrollo Web  
Tags:  AngularJS, CMI, JavaScript, TypeScript  
Tarea: TG-24  
Summary:

__AngularJS__ es un marco de trabajo, un _framework_ que amplía las capacidades de HTML al proporcionarle una nueva sintaxis, lo que permite que este lenguaje de marcado sea apto para el desarrollo de aplicaciones web.

Con AngularJS podemos introducir nuevos elementos y atributos que almacenen datos especiales. Por ejemplo, podemos crear un elemento nuevo de HTML, digamos `<calendario />`, que nos permita seleccionar una fecha, o un elemento `<drop-zone />` para soporte de arrastrar y soltar en una aplicación.

> #### Modelo, Vista, Lo-que-sea  
AngularJS es un _Framework MVLQS_ (Modelo-Vista-Lo_que_sea), dónde *lo_que_sea* significa __lo que sea que funcione para tí__.Esto quiere decir que AngularJS puede usarse tanto como un Modelo-Vista-Control (MVC), o con el paradigma Modelo-Vista-Vista-Modelo (MVVM). En realidad lo que importa es que podemos contruir aplicaciones sólidas con una gran estructura y diseño con el mínimo de esfuerzo.

## Conceptos básicos de AngularJS

Antes de entrar de lleno en el curso[^1] debemos conocer algunos conceptos y componentes de AngularJS.

1. __Modelo__: Al igual que en Django, un modelo describe un objeto del negocio, por ejemplo, una persona, la productividad de un módulo, un incidente crítico, la evidencia de una meta, etc. En AngularJS, los modelos del negocio son simples OJaS (_Objetos de JavaScript_).
2. __Vista__: La vista es lo que los usuarios ven cuando visitan una página, es decir, el resultado del proceso de compilar las directivas y expresiones, y luego enlazarlas en el entorno del proceso. Las plantillas en Django.
3. __Controlador__: La lógica de negocio que dirige nuestra aplicación.
4. __Alcance__: En inglés, _scope_, es un contexto que almacena modelos de datos y funciones. Un controlador, generalmente, almacena sus modelos y funciones en un alcance.
5. __Directivas__: Son aquellas que le enseñan a HTML una nueva sintaxis. Amplía el lenguaje de marcado con elementos y atributos propios.
6. __Expresiones__: Las expresiones se representan con `{{ }}` en las plantillas de HTML. Se utilizan para acceder a expresiones y funciones dentro de tu alcance.
7. __Plantillas__: Es una página HTML con marcas adicionales en la forma de directivas, como `<calendario />` y expresiones `{{ }}`.

Con estos conceptos tan simples, estamos listos para iniciar nuestra aplicación, sencillita, pero carismática.

## Creando una aplicación con AngularJS

Vamos a crear una aplicación que al conocer nuestros ingresos y el porcentaje que podemos gastar en apps, nos muestre el cálculo. Debe tener dos campos, uno para el ingreso y otro para el porcentaje. También tendrá una marca `<span>` para mostrar el resultado. Lo interesante de esto es que tan pronto se cambie un dato, actualice el resultado.

> Puede parecer una aplicación simple, de verdad, pero hay una aplicación que sirve para controlar el gasto del presupuesto en el CMI y usa esta función, pero usa jQuery

### Objetivo

Actualmente, en la aplicación `sgc_money` del Cuadro de Mando, uso jQuery para hacer algo como esto. Los campos que abonan o restan al presupuesto tienen un evento `onblur()` que llama a la función `saldos()`; dentro de la función, leo los valores de los campos de entrada y luego hago la suma que se presenta en la marca con el _identificador_ `#id_saldo`:

```javascript
function saldos() {
  var saldo = 0;
  var anterior = Number($('#id_anterior').val());
  var ministrado = Number($('#id_ministrado').val());
  var comprobado = Number($('#id_comprobado').val());
  var reintegrado = Number($('#id_reintegrado').val());
  saldo = ((anterior * 100 + ministrado * 100) - (comprobado * 100 + reintegrado * 100)) / 100;
  $('#id_saldo').val(saldo);
};
```

Pero con _AngularJS_ el código anterior no es necesario. _Pa'_ acabar pronto, ¡ni siquiera necesitamos escribir una sola línea de JavaScript! Vean el programa que hace el cálculo de las apps, que es muy parecida a la de `sgc_money`.

```html
<!doctype html>
<html lang="es" ng-app>
  <head>
    <title>Ya no compres apps</title>
  </head>
  <body ng-init="salary=0;percentage=0">
    ¿Cuánto ganas?
    <input type="text" ng-model="quincena">
    <br/>

    Qué tanto quieres gastar en apps?
    <input type="text" ng-model="porciento">%
    <br/>

    La cantidad que puedes gastar es
    <span>{{salary*percentage*0.01}}</span>

    <script src="lib/angular/angular.js"></script>
  </body>
</html>
```

Para llegar a este punto, primero debemos instalar AngularJS y configurarlo correctamente.

### Instalar AngularJS

La mejor manera de tener funcionando AngularJS en nuestra aplicación es usar una Red de Distribución de Contenidos (CDN en inglés), que distribuye una versión _legible_ que puede consultarse en caso de errores y una versión compactada. Esta última es la que se recomienda usar en producción.

Para usar la versión de AngularJS en la CDN, debemos agregarla a nuestra plantilla.

```html
<!doctype html>
<html ng-app>
  <head>
    <title>Control de Incidentes Críticos</title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js"></script>
  </head>
  <body>
  </body>
</html>
```

> Las versiones de AngularJS se pueden interpretar fácilmente, ya que están formadas por tres partes: la versión mayor, que en este caso es uno; la versión menor, que cuando es par es estable y cuando es nón, es de desarrollo, y la última parte es un consecutivo de cambios o revisiones. La versión 1, en el ejemplo es estable versión 4 y va en la revisión 7, o sea, 1.4.7.

También podemos instalar AngularJS con Bower, `bower install angular --save-dev`, que instala los archivos que necesitamos en su respectivo directorio.

Como me gusta la mala vida, esta es la versión, la instalada, que voy a usar.  Entonces tengo que hacer un pequeño ajuste a mi tarea `script` de Gulp para concatenarlo con los otros archivos `.js` que tengo. Pero eso será después, cuando esté el sitio en producción.

Mientras tango haré una tarea `angular` que será idéntica a la de `icons`. Esta es:

```javascript
// configuración
var config = {
  // ... otras configuraciones
  angularDir: bowerDir + '/angular'
}

// tarea angular
gulp.task('angular', function(){
  gulp.src([config.angularDir + '/angular.js'])
    .pipe(gulp.dest('./assets/js'));
})

// la tarea `default`
  gulp.task('default', ['bower', 'icons', 'angular', 'css', 'scripts']);
```

Como ya vimos, hay que agregar este archivo a nuestra plantilla.

```html
<script src="/js/angular.js" charset="utf-8"></script>
```

### Estructura de una aplicación de AngularJS

Creo que me estoy enredando, pero revisemos: Ya establecimos que vamos a hacer: una aplicación; ya determinamos el objetivo; ya explicamos como se instala AngularJS y ahora vamos a ver como se estructura una aplicación.

> Estoy aprendiendo AngularJS de la forma más difícil, creando la estructura de la aplicación desde cero, en primer lugar porque, como dije, estoy aprendiendo; en segundo, porque no es una aplicación verdadera; y en tercero, porque no sé, todavía, como se integrará la aplicación de AngularJS, con mis proyectos de Django.
> Pero deben saber que hay un proyecto llamado [Angular Seed](https://github.com/angular/angular-seed/) que contiene la estructura básica y que solo tienen que clonar para tener una estructura completa y funcional.

Una aplicación mínima, como la que estoy construyendo, consta de una página web y de un conjunto de archivos que contienen el código de la aplicación. Por supuesto que se separan por propositos de orden y gestión, pero no es obligatorio.

Además, es una buena práctica colocar las hojas de estilo en un directorio `css`, los archivos de JavaScript en uno `js`, las imágenes en un directorio `img` y las fuentes en `fonts`.

En esto del paradigma MVC, hay un lugar para cada cosa y cada cosa debe estar en su lugar.  El principal beneficio de esto es que la lógica del negocio (el modelo) se separa de la interface del usuario (la vista). El siguiente beneficio es que, si quieres arreglar el error en un componente o modificar su funcionalidad, sabrás exacteamente dónde encontrarlo, por lo que el mantenimiento será más fácil. Mantener la estructura de tu aplicación en módulos separados permite que puedas cargarlos y verificarlos de forma independiente.

Necesitamos, entonces varios componentes, que son:

1. El __Controlador__: El controlador maneja las entradas, llama al código que gestiona las reglas del negocio y comparte datos con la vista usando el `$scope`. La _lógica del negocio_ es lo que hace una aplicación. En la aplicación de `productividad`, por ejemplo, la lógica del negocio se encarga de recolectar los datos de los módulos y determinar la productividad, de acuerdo a la configuración de cada módulo. En AngularJS la lógica se realiza dentro de un __servicio__ y se inyecta al controlador. Usando el _servicio_ nuestro controlador obtiene los datos y los coloca en el objeto `$scope` para que la vista pueda mostrarlos. De este modo, el controlador solo debe preocuparse del `$scope` y no de la presentación. Si el día de mañana decides cambiar toda la UIx de tu página web, la lógica del negocio será la misma porque el controlador está completamente separado de la vista.
2. El __Modelo__: El modelo representa los datos del negocio. La interface del usuario es la proyección del modelo en un momento dado a través de la vista.
3. La __Vista__: La vista solo se encarga de mostrar los datos y está desacoplada de la lógica del negocio. Solo debe actualizarse cuando el modelo de datos asociado cambia. En AngularJS, la vista lee los datos del modelo contenido en el `$scope` que previamente ha sido configurado por el controlador y lo muestra usando plantillas. Esto ayuda que el _front end_, la presentación, pueda desarrollase en paralelo.

> #### El alcance es el contexto
> Piensa en el `$scope` o alcace como en el contexto de Django, que es la forma en la que el controlador y la vista están relacionados. No comparten nada, excepto el contexto o `$scope`. Por lo que podemos, por ejemplo, cambiar el tema completo de la aplicaicón y usar Foundation en lugar de Bootstrap, sin que tengamos que modificar la lógica del negocio.

Bueno, después del choro de la estructura de una aplicación, vamos a modificar nuestra aplicación para que se ajuste a estos conceptos.

Vamos a crear un el archivo `js/app.js` con este contenido.

```js
angular.module('misApps', [
  'misApps.controllers'
]);
```

`misApps` es nuestro módulo principal, el que se carga al iniciar la aplicación. Este módulo depende de otro llamado `controllers` que crearemos a continuación.

```js
angular.module('misApps.controllers', [])
  .controller('ControlQuincena', function($scope){
    $scope.quincena = 0;
    $scope.porcentaje = 0;
    $scope.resultado = function() {
      return $scope.quincena * $scope.porcentaje * 0.01;
    };
});
```

El objeto `$scope` se pasa al construnctor de la función  de `ControlQuincena`. Luego creamos dos atributos en el `$scope`, `quincena` y `porcentaje`, para que estén disponibles en la vosta. También creamos una función `resultado()` dentro de nuestro `scope` que calcula cuánto podemos gastar en apps y devuelve el resultado. Esta función también está disponible en la vista.

Nuestra plantilla ahora debe verse así:

```html
<!DOCTYPE html>
<html lang="es" ng-app="misApss">
  <head>
   <title>Comprador de Aplicaciones</title>

  </head>
  <body ng-controller="ControlQuincena">
    ¿Cuánto ganas?
    <input type="text" ng-model="quincena">
    <br/>

    Qué tanto quieres gastar en apps?
    <input type="text" ng-model="porcentaje">%
    <br/>

    La cantidad que puedes gastar es
    <span>{{ resultado() }}</span>

    <script src="/js/angular.js" charset="utf-8"></script>
    <script src="js/app.js" charset="utf-8"></script>
    <script src="js/controllers.js" charset="utf-8"></script>
    <script>document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')</script>
  </body>
</html>
```

En nuestra plantilla, el atributo `ng-controller` inicializa el controlador `ControlQuincena` y le pasa el contexto `$scope`. En este caso, el controlador se aplica a todo el elemento `<body>`, por lo tanto, las propiedades y atributos del contexto `$scope` pueden llamarse directamente desde cualquier lugar entre `<body>` y `</body>`.

Como puedes ver, nos referimos a las propiedades del modelo usando `ng-model`. Este modelo se actualiza cada vez que actualizamos los valores en los campos respectivos. También llamamos a la función `result()` del contexto `$scope` dentro de la expresión `{{ }}` y se vuelve a llamar cada vez que los campos `quincena` y `porcentaje` de nuestro modelo cambian. Como resultado, el DOM siempre se actualiza con el valor correcto que resulte.

> #### Buenas prácticas
> Cuando creamos un modelo en un controlador, debemos nombrarlo usando Mayúsculas Iniciales tipo __PascalCase__, porque es una recomendación de JavaScript que los constructores deben seguir este modelo, y como en AngularJS los controladores son, de hecho, constructores, pues... eso.

## Conclusión

Así es, en su forma más básica, una aplicación de AngularJS. El tema es tan amplio como Python o Django. Pero este es el conocimiento mínimo para empezar.

En nuestro siguiente capítulo veremos con algo mas de detalle los modelos, controladores y los famosos _Data Bindings_.


<!-- Notas -->
[^1]: Recuerden que en realidad estamos desarrollando una aplicación para el Cuadro de Mando Integral. Este curso es para tapar algunos hoyos en mis conocimientos.
