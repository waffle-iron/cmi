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

```pyhon
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







[^1]: ¿Hacemos _kimosabi_?
[^2]: Esa en la que espera cambios en los archivos e iniciar una tarea.
[^3]: Cuando diga _compactar_ ustedes lean _minify_.
[^4]: Por si ocupan: http://goo.gl/mRz6s9
[^5]: Ni modo, ando en plan auditor: en un proceso hay secuencias e interacciones, los puntos de contacto se entre secuencias son las interacciones, aqui se nombran como `pipes`.
