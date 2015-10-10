module.exports = function(grunt) {

  // Configuración del proyecto.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // :task: concat
    // :package: grunt-contrib-concat
    concat: {
      options: {
        // define una cadena de texto que se coloca entre cada archivo unido
        separator: ';'
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
    }

  });

  // Carga los plugins que nos proporcionan las tareas.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // La(s) tarea(s) por default.
  grunt.registerTask('default', ['concat', 'uglify']);

};
