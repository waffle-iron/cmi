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
