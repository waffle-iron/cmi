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
    // mi primer controladore
  });
  primerModulo.directiva('PrimeraDirectiva', function() {
    return {};
  });
})();
```

> Este método se llama IIFE (Expresión funcional invocada inmediatamente) y
evita que contaminemos el alcance `$scope` global con variables innecesarias. AgularJS cuando encuentra un módulo con dos argumentos