(function(){
  "use strinct";

  angular.module('core.controllers', [])
    .controller('CMIUtils', CMIUtils)
    .controller('PolicyController', PolicyController)
    .factory("PolicyFactory", PolicyFactory);

  CMIUtils.$inject = ['$scope', 'PolicyFactory']
  PolicyController.$inject = ['$scope', '$http'];
  PolicyFactory.$inject = ['$resource'];

  function CMIUtils($scope, PolicyFactory) {
    $scope.date = new Date();
    var $politicas = PolicyFactory.get();
    $scope.politicas = $politicas;
  }

  function PolicyFactory($resource) {
    return $resource(
      "/api/v1.0/politica/?format=json",
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
