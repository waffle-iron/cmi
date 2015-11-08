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





<!-- Notas -->
[^1]: Recuerden que en realidad estamos desarrollando una aplicación para el Cuadro de Mando Integral. Este curso es para tapar algunos hoyos en mis conocimientos.
