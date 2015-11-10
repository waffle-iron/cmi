Title: Programación modular con AngularJS   
Date: 2015-11-08 15:44:06
Category: Desarrollo Web
Tags:  AngularJS, Data Bindings, Services, Controllers
Summary:


Estructurar correctamente nuestro código es clave para mantenerlo y actualizarlo. Entonces, es una buena noticia que en AngularJS puedas dividir el código en componentes reutilizables llamados __módulos__. En AngularJS, un módulo es, básicamente, un contenedor que agrupa diferentes componentes de una aplicación en un nombre común.

En el ejemplo de [artículo anterior](http://yo.toledano.org/dev/curso-de-angular-1/) tenemos nuestro archivo principal en `app.js` y también tenemos nuestro controlador en `controller.js`, pero también hay otros módulos que podemos definir, como `directives.js`, `filters.js` y `services.js`. También tenemos unda directiva en HTML que marca con `ng-app='misApps` el inicio de nuestra aplicación de AngularJS.

<div class="referencia">
  <img src="http://media.toledano.org/images/2015/angularjs-banner.jpg" alt="Angular JS by Google" />
  <div class="reference">
    <strong>Módulos internos</strong>
    <p>
      AngularJS tiene varios módulos internos. El módulo <code>ng</code> define muchas directivas, filtro y servicios que está a nuestra disposición. De hecho, ya vimos dos de ellas: <code>ng-model</code> y <code>ng-controller</code>. Del mismo modo , nosotros podemos crear nuestros propios módulos y usarlos en nuestras aplicaciones.
    </p>
  </div>
</div>

AngularJS necesita conocer los diferentes módulos que componen nuestra aplicación y como están enlazadas, y para lograrlo, dividimos nuestra app en diferentes módulos y especificamos sus dependencias. Veamos, con un ejemplo más complejo como hacerlo.

## Crear un módulo con AngularJS

Para crear un módulo, necesitamos llamar a la función `angular.module()`. El primer argumento de la función es el nombre del módulo. El segundo argumento es una matriz que especifica los módulos adicionales de los que depende este. Si el módulo no tiene dependencias, se pasa una matriz en blanco.

```javascript
angular.module('primerModulo', []);                         // define un módulo sin dependencias
angular.module('primerModulo', ['moduloA', 'moduloB']);     // define un módulo con 2 dependencias
```

Ya que tenemos un módulo, podemos agregarle diferentes componentes. Es como crear un paquete en Python, declaras tus dependencias en `import`. La llamada a `angular.module()` regresa una referencia al módulo creado. Por ejemplo, para agregar un controlador al módulo de arriba, hacemos esto:

```javascript
(function() {
  var primerModulo = angular.module('firstmodule', []);
  primerModulo.controller('PrimerControlador', function($scope){
    // mi primer controlador
  });
  primerModulo.directiva('PrimeraDirectiva', function() {
    return {};
  });
})();
```

> Este método se llama IIFE (Expresión funcional invocada inmediatamente) y
evita que contaminemos el alcance `$scope` global con variables innecesarias. AgularJS cuando encuentra un módulo con dos argumentos (y el último es para dependencias) AngularJS crea un nuevo módulo. Las llamadas subsecuentes a `angular.module()` con un solo argumento (solo el nombre del módulo), hacen que AngularJS recupere el módulo que había creado.

O sea que el código anterior podemos escribirlo de forma más simple:

```javascript
angular.module('primerModule, []');
angular.module('primerModule').controller('PrimerControlador', function($scope){
  // mi super controlador
});
angular.module('primerModule').directive('PrimeraDirectiva', function(){
  return {
    // mi primera directiva
  };
});
```

O si de plano te quieres ver muy _cremoso_, puedes hacerlo así:

```javascript
angular.module('primerModule', [])
  .controller('PrimerControlador', function($scope){
    // mi super controlador
  })
  .directiva('PrimeraDirectiva', function(){
    return {
      // mi primera directiva
    };
  });

> El código anterior funciona, porque cada función que llamas en el módulo `angular.module()` (como `controller()`, `directive()`, etc.) regresa una refrencia al propio módulo. Es decir, que las llamadas pueden encadenarse y puedes agregar diferentes componentes de esta manera.

## Para qué sirven los controladores

La tarea de un controlador es aumentar el contexto `$scope` agregándole modelos y funciones que pueden ser utilizados por la vista. Un controlador no es otra cosa sino una función constructor de un objeto que es _instanciada_[^1] cuando AngularJS encuentra la directiva `ng-controller` en HTML. En otro artículo veremos mas sobre el contexto `$scope`, pero como ya vimos, el `$scope` es la interface que une tabto al controlador como a la vista.

Para ver como agregar propiedades y funciones al contexto, vamosa escribir un controlador que pase la fecha y hora actual, además de un nombre a una vista usando el `$scope`.

```javascript
angular.module('miApp', [])
  .controller('SaludaControl', function($scope){
    $scope.hoy = new Date();  // crea el modelo 'hoy' en el contexto
    $scope.saludo = 'Hola';   // crea el modelo 'saludo' en el contexto
  });
```

Un controlador se registra llamando al constructo `controller()` en `angular.module()`. La función `controller()` toma dos argumentos: el primero es el nombre del controlador y el segundo es


[^1]: Yo entiendo el verbo _instanciar_ como crear una copia de trabajo. Lo ´se, soy un loquillo.
