(function(){
"use strict";

  // configuración de las marcas
  angular.module('core.config', [])
    .config(marcasConfig)
    .run(run);

  run.$inject = ['$http'];

  function marcasConfig($interpolateProvider){
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
  }

  function run($http) {
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
  }

})();