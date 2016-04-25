(function(){
  "use strict";

  angular.module('core.controllers', [])
    .controller('CMIUtilsController', CMIUtilsController)
    .controller('PolicyController', PolicyController)
    .controller('PolicyListController', PolicyListController)
    .controller('PolicyDetailController', PolicyDetailController)
    .factory("PolicyFactory", PolicyFactory);

  CMIUtilsController.$inject = ['$scope', 'PolicyFactory'];
  PolicyController.$inject = ['$scope', 'PolicyFactory'];
  PolicyFactory.$inject = ['$resource'];
  PolicyListController.$inject = ['$scope', 'PolicyFactory'];
  PolicyDetailController.$inject = ['$scope', '$routeParams'];

  function CMIUtilsController($scope, PolicyFactory) {
    $scope.date = new Date();
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

  function PolicyListController($scope, PolicyFactory) {
    PolicyFactory.get(function(data){
      $scope.policies = data.results;
    })
  }

  function PolicyDetailController($scope, $routeParams){
    $scope.policy_revision = $routeParams.revision;
  }
})();
