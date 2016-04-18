/**
* Register controller
* @namespace core.controllers
*/
(function () {
  'use strict';

  angular
    .module('core.controllers', [])
      .controller('PoliticaController', PoliticaController);

  PoliticaController.$inject = ['$scope'];
  function PoliticaController($scope) {
    $http.get('http://localhost:8000/api/v1.0/actual/').
      success(function(data){
        $scope.politica = data;
      });
  }
})();
