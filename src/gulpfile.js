/**
 * Created by toledano on 06/11/15.
 */

// inicializa gulp
var gulp = require('gulp');

// incluye los plugin
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var comments = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

// Se define la tarea `scripts`
gulp.task('scripts', function() {
  gulp.src(['./sources/js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('script.js'))
    .pipe(comments())
    .pipe(uglify())
    .pipe(gulp.dest('./assets/js/'));
});