(function(){
  "use strict";

  angular.module('core.controllers', [])
    .controller('CMIUtilsController', CMIUtilsController)
    .controller('PolicyController', PolicyController)
    .factory("PolicyFactory", PolicyFactory);

  CMIUtilsController.$inject = ['$scope', 'PolicyFactory'];
  PolicyController.$inject = ['$scope', 'PolicyFactory'];
  PolicyFactory.$inject = ['$resource'];

  function CMIUtilsController($scope, PolicyFactory) {
    $scope.date = new Date();
    $scope.politicas = PolicyFactory.get();
  }

  function PolicyFactory($resource) {
    return $resource(
      "/api/v1.0/politica/",
      {},
      { 'get': {method: "GET", isArray: false}}
    );
  }

  function PolicyController($scope, PolicyFactory) {
    PolicyFactory.get(function(data){
      $scope.policy = data.results[0];
    });
  }
})();
