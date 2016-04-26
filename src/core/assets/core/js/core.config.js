(function(){
"use strict";

  // configuración de las marcas
  angular.module('core.config', [])
    .config(marcasConfig);

  function marcasConfig($interpolateProvider){
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
  }

})();