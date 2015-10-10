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

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd/mmm/yyyy") %> */\n'
      },
      build: {
        src: 'sources/tmp/js/<%= pkg.name %>.js',
        dest: 'assets/js/<%= pkg.name %>.min.js'
      }
    }
  });

  // Carga los plugins que nos proporcionan las tareas.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // La(s) tarea(s) por default.
  grunt.registerTask('default', ['uglify']);

};
