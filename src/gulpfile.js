/**
 * Created by toledano on 06/11/15.
 */

// inicializa gulp
var gulp = require('gulp');

// incluye los plugin
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var debug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass') ;
var notify = require("gulp-notify") ;
var bower = require('gulp-bower');

// Configuración
var config = {
  sassPath: './sources/sass',
  bowerDir: './bower_components' 
}

// tarea bower
gulp.task('bower', function() { 
  return bower()
    .pipe(gulp.dest(config.bowerDir)) 
});


// Se define la tarea `scripts`
gulp.task('scripts', function() {
  gulp.src(['./sources/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('script.js'))
    .pipe(debug())
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/'));
});
