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




[^1]: ¿Hacemos _kimosabi_?
[^2]: Esa en la que espera cambios en los archivos e iniciar una tarea.
[^3]: Cuando diga _compactar_ ustedes lean _minify_.
[^4]: Por si ocupan: http://goo.gl/mRz6s9