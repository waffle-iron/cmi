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
  bowerDir: './bower_components' ,
  angularDir: './bower_components/angular'
}

// tarea bower
gulp.task('bower', function() { 
  bower()
    .pipe(gulp.dest(config.bowerDir)) 
});

// tarea fontawesome
gulp.task('icons', function() { 
  gulp.src([
    config.bowerDir + '/font-awesome/fonts/**.*',
    config.bowerDir + '/bootstrap-sass/assets/fonts/bootstrap/**.*'
  ])
    .pipe(gulp.dest('./assets/fonts')); 
});

// tarea angular
gulp.task('angular', function(){
  gulp.src([config.angularDir + '/angular.js'])
    .pipe(gulp.dest('./assets/js'));
})

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

// la tarea watch
 gulp.task('watch', function() {
  gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
});

// la tarea `default`
  gulp.task('default', ['bower', 'icons', 'angular', 'css', 'scripts']);
