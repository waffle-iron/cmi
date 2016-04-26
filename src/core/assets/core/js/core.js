// creación del módulo
var cmiCore = angular.module('cmiCore', [
  'ngRoute',
  'ngResource',
  'ngSanitize',
  'core.config',
  'core.routers',
  'core.controllers'
]);

cmiCore.controller('CoreController', function($scope) {
    $scope.message = 'Hola, Mundo!';
});

cmiCore.controller('AboutController', function($scope) {
    $scope.message = 'Esta es la página "Acerca de"';
});

cmiCore.controller('ContactController', function($scope) {
    $scope.message = 'Esta es la página de "Contacto", aquí podemos poner un formulario';
});