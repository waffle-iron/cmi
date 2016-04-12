Title: Qué es Gulp    
Date: 2015-11-06 8:13:24 p.m.
Category: Desarro Web
Tags:  gulp.js, node.js
Summary: Qué es y para qué sirve gulp.

Antes de continuar con la implementación del nuevo cuadro de mando, necesito (otra vez) conocer algunos el uso de de
__Gulp.JS__ que es un sistema de gestión de tareas, muy utilizado actualmente. Supongo que será parecido a Grunt, pero
ya veremos.

## Qué es Gulp.JS

Dicen que no tiene caso invertir tiempo en aprender una herramienta si no sabes que problemas resuelve. Pues bueno, se
supone que __Gulp__ resuelve el problema de la repetición. Muchas de las tareas que hacemos[^1] lo que desarrollamos
aplicaciones para la web se repiten una y otra vez todos los días y pueden simplificarse automatizándolas. Entre más
tareas repetitivas automaticemos, más tiempo tendremos para las tareas no repetitivas o sea, seremos más productivos.


> Esperen... ¿qué eso no lo hace ya GruntJS?


Gulp es un gestor de tareas escrito en JavaScript que nos permite automatizar tareas como...

- Construir y compactar librerías y hojas de estilo
- Recargar el navegador cuando modificamos un archivo
- Ejecutar una batería de pruebas
- Ejecutar análisis de código
- Compilar Less o SASS en CSS
- Copiar los archivos modificados a un directorio de salida.

> Bueno, hasta aquí hace lo mismo que Grunt.JS.

## Grunt vs Gulp

Ya conocemos que es [Grunt](http://yo.toledano.org/dev/como-usar-grunt/), un gestor de tareas escrito en JavaScript
que usa Node.JS. Bueno, pues resulta que Gulp.JS es lo mismo. Mejor dicho, _hacen lo mismo_. Y no hay razón para que,
si ya lo estamos usando, dejemos de usarlo en favor de Gulp.JS.

Pero aquí se trata de aprender, así que vamos a hacer una comparativa entre ambos gestores.

- Los _plugins_ de Grunt con frecuencia realizan varías tareas. Con Gulp, los plugins están diseñados para hacer _una
sola cosa_.
- Grunt requiere de plugins para una función tan básico como _watch_[^2]. Gulp, tiene funcionalidades básicas incorporadas.
- Grunt usa archivos de configuración en JSON. Gulp, usa código JavaScript.

El concepto más importante en Gulp, son los _flujos de proceso_ o _**streams**_. Hagan de cuenta que los archivos viajan
por tuberías; en algún punto de esa tubería, se toma una acción. Por ejemplo, para guardar todos nuestros archivos en
una tubería tipo _scripts_, haríamos:

1. concatenar todos los archivos en uno solo
1. remover los comandos `console` y `debugger`
1. compactar[^3] el código
1. colocar el archivo en una ubicación específica

> Eso si lo entiendo. Un proceso es un conjunto de actividades que transforman elementos de entrada en un resultado.
Con frecuencia los resultados de un proceso son la entrada de otro. Además la secuencia y la interacción están claramente
definidas. _Si, me gusta el concepto_.

Dice el tutorial que estoy leyendo[^4] que esto es una reminicencia del encadenamiento de jQuery que aplica un conjunto
 de acción en orden secuencial.

```python
$("#element").text("hello world!").addClass("myclass").fadeIn();
```

### Las tareas básicas de Gulp

En realidad se llama API y esta API de Gulp nos proporciona cinco funciones básicas, pero suficientes y bastantes.

Función | Descripción
--------|-------------
gulp.task(nombre, fn) | Registra la función `fn` con un `nombre`
gulp.run(tasks...) | Ejecuta las tareas indicadas con el máximo de concurrencia
gulp.watch(glob, fn) | Ejecuta la función `fn` cuando ocurre un cambio en `glob`
gulp.src(glob) | Crea con `glob` un flujo de lectura que se puede enviar por tuberías
gulp.dest(carpeta) | Crea un flujo de escritura en la `carpeta` usando el flujo recibido

## Cómo instalar GulpJS

Primero debemos asegurarnos que tenemos instalado NodeJS. Hay dos versiones actualmente, la [4.2.2](https://nodejs.org/dist/v4.2.2/)
que es LTS o sea de soporte a largo plazo y la [5.0.0](https://nodejs.org/dist/v5.0.0/) que es la versión estable.

Yo uso la versión 5.0.0.

```
toledano@toledano koding (master) $ node -v
v5.0.0
```

Y también debemos tener una versión actual de `npm`:

```
toledano@toledano cmi_core (gulpjs) $ npm -v
3.3.6
```

Con estos dos elementos, instalamos `gulp` como paquete global, es decir con la bandera `-g`, recuerden que si no usan `nvm` deben tener permisos de administrador (`sudo`) en Mac OS X o Linux.

```
toledano@toledano cmi_core (gulpjs) $ npm install -g gulp
/Users/toledano/.nvm/v5.0.0/bin/gulp -> /Users/toledano/.nvm/v5.0.0/lib/node_modules/gulp/bin/gulp.js
/Users/toledano/.nvm/v5.0.0/lib
```

Para verificar que se haya instalado, podemos pedir la versión:

```
toledano@toledano cmi_core (gulpjs) $ gulp -v
[12:42:31] CLI version 3.9.0
[12:42:31] Local version 3.9.0
```

## El proyecto con Gulp

Vamos a configurar el mismo proyecto que tenemos actualmente con Grunt. La tarea `default` realiza las siguientes actividades.

1. Sincroniza nuestras modificaciones a Bootstrap
2. Une los archivos `.js` en un solo, o sea _concatena_
3. Compacta los archivos `.js`, es decir, los _uglifyca_
4. Los verifica con `jshint`
5. Envía los `.css` y los `.js` al directorio de `assets`

Si lo logramos, nos cambiamos a Gulp, si no... pues no.

### Paso 1. Instalar Gulp en el archivo `packages.json`:

```
toledano@toledano src (gulpjs) $ npm install gulp --save-dev
cmi@2.0.0 /Users/toledano/proyectos/cmi_core/src
└── gulp@3.9.0
```

> Se supone que esto crea un archivo `gulpfile.js` vacío, y creo que si lo hizo, pero yo lo borré. No sé que hacer para recuperarlo.

### Paso 2. Cómo instalar un plugin

Pues creo que con NodeJS todo se instala igual, con `--save-dev`. El plugin es el `jshint` que verifica los archivos `.js`... creo.

Como ya no tengo el susodicho archivo `gulpfile.js`, haré uno nuevo.

```javascript
/**
 * Created by toledano on 06/11/15.
 */

// inicializa gulp
var gulp = require('gulp');

// incluye los plugin
var jshint = require('gulp-jshint');

// Se define la tarea `jshint`
gulp.task('jshint', function() {
  gulp.src('./sources/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
```

Definimos un flujo de proceso que incluye las siguientes actividaes:

1. Se inicializa Gulp
2. Se incluye el plugin `gulp-jshint` en un objeto llamado `jshint`
3. Se define la proceso `jshint`, se crea un flujo (con `gulp.src()`) que tiene dos _interacciones_[^5] o _pipes_:
    4. La primera realiza la verificación de `jshint` con el flujo indicado
    5. La segunda, envía los errores a la consola

Veamos como funciona este proceso, ejecutando `gulp jshint`. Pero la verdad es que no tengo ningún archivo, todavía, así que usaré unos inventadosy sencillitos, uno de ellos con un error, para ver que pasa, estos son los archivos:

```js
test = new Date();
month = test.getMonth();
month = (month * 1) + 1;
day = test.getDate();
year = test.getFullYear();
console.log("(",month,"/",day,"/",year,")");
```

Este archivo, llamado `01-uno.js` solo muestra la fecha actual.

```js
console.log("Este archivo está de mas")
```

Este solo imprime un mensaje tonto, pero ojo, le falta un punto y coma.

```
toledano@toledano src (gulpjs) $ gulp jshint
[23:18:27] Using gulpfile ~/proyectos/cmi_core/src/gulpfile.js
[23:18:27] Starting 'jshint'...
[23:18:27] Finished 'jshint' after 15 ms
sources/js/02-dos.js: line 1, col 40, Missing semicolon.

1 error
```

### Paso 3. Procesos complejos con Gulp

Ni tan complejos, la verdad. Pero ya que limpiamos los archivos con `jshint`, vamos a concatenarlos, uniéndolos en uno solo, eliminando los comentarios, los espacios extra y colocando la salida en el directorio `src/assets/js`.

Recuerden que en Gulp los plugin hacen una cosa, y el proceso descrito en el párrafo anterior se compone de tres actividades, que realizaran tres plugins, respectivamente:

- `gulp-concat` que unirá los archivos,
- `gulp-strip-debug` que eliminará los comentarios, y
- `gulp-uglify` que elimina espacios sobrantes

Se instalan como ya sabemos:

```
npm install gulp-concat --save-dev
npm install gulp-strip-debug --save-dev
npm install gulp-uglify --save-dev
```

Estos mismos plugins, los incluímos en el archivo `gulpfile.js`, en la sección correspondiente. Y definimos la tarea, que se llama `scripts`:

```javascript
// Se define la tarea `scripts`
gulp.task('scripts', function() {
  gulp.src(['./source/js/*.js'])
    .pipe(concat('script.js'))
    .pipe(comments())
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/'));
});
```

El proceso se crea con `gulp.src()` que toma todos los archivos que encuentre en la ruta indicada y crea un flujo que pasa por:

1. `concat` que crea el archivo `script.js` con los archivos que unió,
2. `comments` que elimina los comanterios,
3. `uglyfly` que elimina espacios extras y
4. el flujo pasa a la tarea `gulp.dest()` que graba el archivo `scripts.js` en la ruta indicada.

Veamos si es cierto.

```
toledano@toledano src (gulpjs) $ gulp scripts
[23:44:07] Using gulpfile ~/proyectos/cmi_core/src/gulpfile.js
[23:44:07] Starting 'scripts'...
[23:44:07] Finished 'scripts' after 20 ms
```

¡Funcionó! Se creó el archivo `script.js`:

```javascript
test=new Date,month=test.getMonth(),month=1*month+1,day=test.getDate(),year=test.getFullYear();
```

Como pueden ver, a tarea que llamé `comments` en realidad elimina los mensajes a la consola que uso para depurar la ejecución de los archivos. _Tal vez deba cambiarle el nombre_.

## Modificando Bootstrap con Gulp

Ahora lo que quiero hacer es aplicar mis propias modificaciones a la instalación de Bootstrap y para complicarnos la vida un poco más, voy a usar la versión _Sass_ de [Bootstrap v4](http://v4-alpha.getbootstrap.com/), porque a partir de la versión 4, será el compilador usado.

> Bootstrap usa Grunt para compilarse, por lo que tenemos que usar otro método de construcción, uno propio, usando Gulp.

El proceso sigue siendo el mismo:

1. Copiar mis modificaciones al directorio de Bootstrap
2. Generar la versión de distribución y
3. Copiarla al directorio `assets`

Por supuesto, a este proceso hay que aplicarle el proceso anterior.


### Qué necesitamos

Hay un paquete de Bower para Bootstrap que usa Sass. Vamos a instalar ese y además el de Font Awesome[^6].

```
bower install bootstrap-sass-official --save  
bower install fontawesome --save
```

También necesitamos ciertos plugins de Glup, que enlisto a continuación.

- `gulp-ruby-sass`: una interface para usar el compilador Sass,
- `ruby-notify`: que es una interface con el sistema de notificaciones de tu sistema operativo,
- `gulp-bower`: una interface con bower.

Se instalan, como de costumbre, con `--save-dev`:

```
npm install gulp gulp-ruby-sass gulp-notify gulp-bower --save-dev
```

### El proceso

Ya tenemos todas nuestras dependencias, ahora hay que programar el proceso en nuestro archivo `gulpfile.js`

Como primer paso, agregamos los plugins:

```
var sass = require('gulp-ruby-sass') ;
var notify = require("gulp-notify") ;
var bower = require('gulp-bower');
```

En segundo lugar, creamos una variable con datos de configuración para facilitarnos la vida.

```
// Configuración
var config = {
  sassPath: './sources/sass',
  bowerDir: './bower_components' 
}
```

En el directorio `sources/sass` están los archivos de mi tema, mejor dicho estáran, porque en el ejercicio anterior las modificaciones las hice con `less`; en el directorio `bower_components` están los paquetes que baja Bower.

### La tarea `bower`

En mi proyecto, Bower instala, además de Bootstrap y de Font Awesome, AngularJS, y se trata de automatizar todo, incluyendo la instalación de estos componentes, por lo tanto, vamos a crear una tarea que ejecute `bower install` desde Gulp.

```
// tarea bower
gulp.task('bower', function() { 
  return bower()
    .pipe(gulp.dest(config.bowerDir)) 
});
```

Así de simple:

```
toledano@toledano src (gulpjs) $ gulp bower
[13:13:33] Using gulpfile ~/proyectos/cmi_core/src/gulpfile.js
[13:13:33] Starting 'bower'...
[13:13:33] Using cwd:  /Users/toledano/proyectos/cmi_core/src
[13:13:33] Using bower dir:  ./bower_components
[13:13:33] bower cached git://github.com/angular/bower-angular.git#1.4.7
[13:13:33] bower validate 1.4.7 against git://github.com/angular/bower-angular.git#~1.4.7
[13:13:34] bower cached git://github.com/jquery/jquery.git#2.1.4
[13:13:34] bower validate 2.1.4 against git://github.com/jquery/jquery.git#~2.1.4
[13:13:34] bower cached git://github.com/angular/bower-angular-route.git#1.4.7
[13:13:34] bower validate 1.4.7 against git://github.com/angular/bower-angular-route.git#~1.4.7
[13:13:34] bower cached git://github.com/twbs/bootstrap-sass.git#3.3.5
[13:13:34] bower validate 3.3.5 against git://github.com/twbs/bootstrap-sass.git#~3.3.5
[13:13:34] bower cached git://github.com/angular/bower-angular-cookies.git#1.4.7
[13:13:34] bower validate 1.4.7 against git://github.com/angular/bower-angular-cookies.git#~1.4.7
[13:13:34] bower cached git://github.com/likeastore/ngDialog.git#0.5.5
[13:13:34] bower validate 0.5.5 against git://github.com/likeastore/ngDialog.git#~0.5.5
[13:13:34] bower cached git://github.com/FortAwesome/Font-Awesome.git#4.4.0
[13:13:34] bower validate 4.4.0 against git://github.com/FortAwesome/Font-Awesome.git#~4.4.0
[13:13:34] bower cached git://github.com/jashkenas/underscore.git#1.8.3
[13:13:34] bower validate 1.8.3 against git://github.com/jashkenas/underscore.git#~1.8.3
[13:13:38] bower cached git://github.com/jquery/jquery.git#2.1.4
[13:13:38] bower validate 2.1.4 against git://github.com/jquery/jquery.git#>= 1.9.0
[13:13:45] bower install bootstrap-sass#3.3.5
[13:13:45] bower install angular#1.4.7
[13:13:45] bower install angular-cookies#1.4.7
[13:13:45] bower install jquery#2.1.4
[13:13:45] bower install angular-route#1.4.7
[13:13:45] bower install ng-dialog#0.5.5
[13:13:45] bower install font-awesome#4.4.0
[13:13:45] bower install underscore#1.8.3
[13:13:46] Finished 'bower' after 13 s
```

### La tarea Font Awesome

Si conocen la tipografía [Font Awesome](https://fortawesome.github.io/Font-Awesome/, ¿verdad? Son unos iconos bien padres que se incluyen facilísimo en una página web y sirven para que tu sitio se vea igual que todos.

Esta tarea localiza este componente y mueve las fuentes a nuestro archivo de `assets`. Se configura de esta manera:

```
// tarea fontawesom
gulp.task('icons', function() { 
  gulp.src(config.bowerDir + '/font-awesome/fonts/**.*') 
    .pipe(gulp.dest('./assets/fonts')); 
});
```

Esta tarea crea un flujo con `gulp.src` que contiene todos los archivos que se encuentran en el directorio indicado y se envían por secuenta `pipe` al directorio señalado en `gulp.dest`. Funciona genial.

### La tarea `bootstrap`

El flujo de este proceso se ha simplificado enormemente con respecto al usado en Grunt. Ahora utilizamos un archivo fuente más completo, pero el resultado está más integrado.  Funciona de la siguiente manera:

1. Toma el archivo fuente con `sass`
2. Lo compila, agregando los directorios claves al proceso de compilación
3. Coloca el resultado en la salida indicada.

```javascript
// tarea bootstrap
gulp.task('css', function() { 
  sass(config.sassPath + '/cmi.scss', {
    style: 'compressed',
    loadPath: [
      config.sassPath,
      config.bowerDir + '/bootstrap-sass/assets/stylesheets',
      config.bowerDir + '/font-awesome/scss',
    ]
  })
  .on("error", notify.onError(function (error) {
    return "Equivocación: " + error.message;
  })) 
  .pipe(gulp.dest('./assets/css')); 
});
```

Este proceso captura los errores y los muestra, pero en realidad lo hace todo en un solo paso, y sin archivos intermedios y sin llamadas al proceso de construcción completo de Bootstrap.

### La tarea `scripts` 2

Vimos al inicio de este artículo como se _concatenaban_ los archivos `.js` y lo hicimos con unos _inútiles_ archivos de prueba, pero para la verdadera tarea, queremos combinar los archivos `.js` de Bootstrap. Vamos a modificar la tarea `scripts` para lograr el resultado esperado. Por supuesto, queremos conservar la capacidad de agregar nuestro propios archivos en el resultado combinado, así que este es el resultado.

```javascript
// Se define la tarea `scripts`
gulp.task('scripts', function() {
  gulp.src([
      config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js',
      './sources/js/*.js'
    ])
    // .pipe(jshint())
    // .pipe(jshint.reporter('default'))
    .pipe(concat('cmi.js'))
    .pipe(debug())
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/'));
});
```

> Me doy cuenta que los plugins de Bootstrap deben concatenarse en un [orden específico](https://github.com/twbs/bootstrap-sass/blob/master/assets/javascripts/bootstrap-sprockets.js), por lo que he decidido colocar mis archivos al final del archivo compilado de Bootstrap.

### La tarea `watch`

Ahora que todas las tareas están funcionando, vamos a crear una tarea `watch` para poder modificar nuestro tema de forma sencilla. Como solo espero modificar los archivos `.scss`, solo vamos a buscar cambios en estos y a ejecutar la tarea `css` cuando corresponda.

```javascript
// la tarea watch
 gulp.task('watch', function() {
  gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
});
```

### La tarea `default`

La tarea `default` se ejecuta cuando no especificamos ninguna tarea al llamar a `gulp`. Al igual que en Grunt, es un conjunto de tareas, muy simple de programar.

```
// la tarea `default`
  gulp.task('default', ['bower', 'icons', 'css', 'scripts']);
```

Este proceso llama a las tareas indicadas en ese orden.

## Conclusión

En general me pareció más simple usar Gulp que Gruntfile. El concepto de flujo de procesos es algo que comprendo y que me facilitó entender los `pipes` y los _streams_.

Algo que no mencioné antes, pero que es una ventaja a favor de Gulp, es que usa un sistema de archivos virtuales y una vez que el proceso ha terminado, el resultado se guarda con `gulp.dest`. Eso ahorra muchos pasos intermedios, como los que tenía en mi `Gruntfile.json`.

Mi principal desventaja es mi pésimo dominio de JavaScript, algo en lo que estoy trabajando y que pronto habré solucionado.




<!-- Notas -->
[^1]: ¿Hacemos _kimosabi_?
[^2]: Esa en la que espera cambios en los archivos e iniciar una tarea.
[^3]: Cuando diga _compactar_ ustedes lean _minify_.
[^4]: Por si ocupan: http://goo.gl/mRz6s9
[^5]: Ni modo, ando en plan auditor: en un proceso hay secuencias e interacciones, los puntos de contacto se entre secuencias son las interacciones, aqui se nombran como `pipes`.
[^6]: Siguiendo estas instrcciones: http://goo.gl/ENswPU
