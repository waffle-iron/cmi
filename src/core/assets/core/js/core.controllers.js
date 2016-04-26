(function(){
  "use strict";
  
  angular.module('core.controllers', [])
    .factory("PolicyFactory", PolicyFactory)
    .controller('PortadaController', PortadaController)
    .controller('PolicyListController', PolicyListController);

  PolicyFactory.$inject = ['$resource'];
  PortadaController.$inject = ['$scope', 'PolicyFactory'];
  PolicyListController.$inject = ['$scope', 'PolicyFactory'];

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

  function PolicyListController($scope, PolicyFactory) {
    PolicyFactory.query(function(data){
      $scope.policies = data.results;
    });
  }


})();