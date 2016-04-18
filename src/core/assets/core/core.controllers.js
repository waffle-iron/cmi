/**
* Register controller
* @namespace core.controllers
*/
(function () {
  'use strict';

  angular
    .module('core.controllers', [])
      .controller('PoliticaController', PoliticaController);

  PoliticaController.$inject = ['$scope', '$http'];
  function PoliticaController($scope, $http) {
    $http.get('http://localhost:8000/api/v1.0/actual/').
      success(function(data){
        $scope.politica = data;
      });
  }
})();
