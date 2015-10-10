module.exports = function(grunt) {

  // Configuración del proyecto.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd/mmm/yyyy") %> */\n'
      },
      build: {
        src: 'sources/<%= pkg.name %>.js',
        dest: 'assets/<%= pkg.name %>.min.js'
      }
    }
  });

  // Carga el plugin que nos proporciona la tarea "uglify".
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // La(s) tarea(s) por default.
  grunt.registerTask('default', ['uglify']);

};
