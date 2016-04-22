(function(){
  "use strict";

  angular.module('core.controllers', [])
    .controller('CMIUtils', CMIUtils)
    .controller('PolicyController', PolicyController)
    .factory("PolicyFactory", PolicyFactory);

  CMIUtils.$inject = ['$scope', 'PolicyFactory'];
  PolicyController.$inject = ['$scope', '$http'];
  PolicyFactory.$inject = ['$resource'];

  function CMIUtils($scope, PolicyFactory) {
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

  function PolicyController($scope, $http) {
    $http.get('/api/v1.0/actual/')
      .success(function (data) {
        $scope.policy = data;
    });
  }
})();
