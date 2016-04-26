(function(){
  "use strict";
  
  angular.module('core.controllers', [])
    .factory("PolicyFactory", PolicyFactory)
    .controller('PortadaController', PortadaController);

  PolicyFactory.$inject = ['$resource'];
  PortadaController.$inject = ['$scope', 'PolicyFactory'];

  function PolicyFactory($resource) {
    return $resource(
      "/api/v1.0/politica/",
      {},
      { 'get': {method: "GET", isArray: false}}
    );
  }

  function PortadaController($scope, PolicyFactory) {
    PolicyFactory.get(function(data){
      $scope.policy = data.results[0];
    });
  }


})();