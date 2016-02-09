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
  sourcesDir: './sources',
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
});

// tarea fuentes
gulp.task('fuentes', function(){
  gulp.src([
    config.sourcesDir + '/css/styles.css',
    config.bowerDir + '/bootstrap-material-design/dist/css/*.min.css',
    config.bowerDir + '/ngDialog/css/*.min.css',
    config.bowerDir + '/snackbarjs/dist/*.min.css'
  ]).pipe(gulp.dest('./assets/css'));

  // javascript
  gulp.src([
      config.sourcesDir + '/js/**/*.js',
      config.bowerDir + '/jquery/dist/jquery.min.js',
      config.bowerDir + '/bootstrap/dist/js/*.min.js',
      config.bowerDir + '/bootstrap-material-design/dist/js/*.min.js',
      config.bowerDir + '/underscore/*min.js',
      config.bowerDir + '/angular-route/*.min.js',
      config.bowerDir + '/ngDialog/js/*.min.js',
      config.bowerDir + '/angular-cookies/*.min.js',
      config.bowerDir + '/snackbarjs/dist/*.min.js'
  ]).pipe(gulp.dest('./assets/js'));

});

// tarea bootstrap
gulp.task('sass', function() { 
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
//   gulp.task('default', ['bower', 'icons', 'angular', 'css', 'scripts']);
gulp.task('default', ['fuentes', 'sass', 'angular'])