module.exports = function(grunt) {

  // Configuración del proyecto.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // :task: concat
    // :package: grunt-contrib-concat
    concat: {
      options: {
        // define una cadena de texto que se coloca entre cada archivo unido
        separator: ' '
      },
      dist: {
        // los archivos a unir
        src: ['sources/js/*.js'],
        // la ubicacion de la salida concatenada
        dest: 'sources/tmp/js/<%= pkg.name %>.js'
      }
    },

    // :task: uglify
    // :package: grunt-contrib-uglify
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd/mmm/yyyy") %> */\n'
      },
      build: {
        files: {
          'assets/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    // :task: qunit
    // :package: grunt-contrib-qunit
    qunit: {
        files: ['sources/test/**/*.html']
    },

    // :task: jshint
    // :package: grunt-contrib-jshint
    jshint: {
      // se define que archivos se van a limpiar
      files: ['gruntfile.js', 'sources/**/*.js'],
      // se configura JSHint (tal como se indica en http://www.jshint.com/docs/)
      options: {
        // aqui van las opciones, si los valores por
        // omisión no son suficientes
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },

    // :task: watch
    // :package: grunt-contrib-watch
    watch: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'qunit']
    },

    // :task: twbs
    // :package: grunt-twbs
    twbs: {
        target:{
            options: {
                less: './sources/less/',
                dest: 'assets/css/<%= pkg.name %>.min.css',
                cmd: 'dist'
            }
        }
    },

    // :task: sync
    // :package: grunt-sync
    

  });


  // Carga los plugins que nos proporcionan las tareas.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-twbs');

  // La(s) tarea(s) por default.
  grunt.registerTask('default', ['concat', 'uglify', 'jshint', 'qunit']);

};
