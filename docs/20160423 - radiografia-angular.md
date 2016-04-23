Title: Radiografía del alance en AngularJS
Date: 2016-04-23 14:02:12
Category: Desarollo Web
Tags: angularjs, $scope,
Summary:

Ahora que estoy decidido a mejorar el Cuadro de Mando Integral y convertirlo en una aplicación de una sola página (en inglés se llama _Single Page Application_) mi primera opción es el framework __AngularJS__, del que no sabía nada, por lo que estoy aprendiendo con el famoso método científico llamado _"a la Malagueña"_, es decir, sobre la marcha.

El primer concepto que debo aprender, que es el más fácil para mi, es el de alcance porque es idéntico al de Django, aunque en AngularJS se llama _$scope_. El `$scope` es un objeto de JavaScript que contiene un conjunto de valores y claves relacionadas con nuestra aplicación[^1], de la siguiente manera:

    var miObjeto = { 
        nombre: 'AngularJS', 
        creador: 'Javier Sanchez' 
    }


[^1]: Es un tipo diccionario de Django y al igual que el alcance de Django colocamos las cosas que queremos que estén disponibles en la sesión. 

El alcance ---como cualquier otro objeto de JavaScript--- puede tener propiedades y funciones relacionadas. La única diferencia es que, por lo general, no creamos los objetos del alcance manualmente. Es AngularJS quien crea y coloca los objetos[^2] en él.

[^2]: En idioma AngularJS _colocar objetos en el alcance_ se llama __inyectar__. No se espanten.

En el mundo de AngularJS, un objeto `$scope` es útil para colocar los valores de nuestros modelos, los cuales se presentan en la vista. Por ejemplo, si colocamos en el alcance el siguiente objeto: `$scope.saludo = 'Hola'` podemos acceder a su contenido en la plantilla usando la expresión `{$ $scope.saludo $}`.

Todas las aplicaciones de AngularJS tienen por lo menos un alcance llamado `$rootScope` que se crea cuando agregamos la directiva `ng-app` a cualquier elemento de HTML. En otras palabras, cuando nuestra aplicación de AngularJS arranca se crea el `$rootScope` de forma automática. Luego, conforme vamos agregando a los distintos elementos las directivas `ng-controller`, se crean alcances _hijos_ que heredan las propiedades de `$rootScope`. Incluso, podemos anidar los alcances colocando una directiva `ng-controller` dentro de otra. Veamos el siguiente ejemplo: 

```html5
<div ng-app> <!-- se crea el $rootScope -->
  <div ng-controller="ControllerExterior"> 
    <!-- se crea un alcance (llamado alcance 1) que hereda de $rootScope -->
    <div ng-controller="ControllerInterior">
      <!-- se crea un alcance hijo (llamado alcance 2) que hereda desde el alcance 2 -->
    </div>
  </div>
</div>
```

`$rootScope` es la madre de todos los alcances y como resultado, todas sus propiedades están disponibles de forma implícita en el alcance 2. De igual forma, el alcance 2 tiene acceso a todas las propiedades del alcance 1.

---

Esto es todo por el momento en lo que se refiere al alcance, pero lo que sigue es muy interesante: como usar AngularJS y Django al mismo tiempo.