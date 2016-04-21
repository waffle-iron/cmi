angular.module('core.controllers', [])
  .controller('PolicyController', PolicyController)
  .factory("PolicyFactory", PolicyFactory);

PolicyFactory.$inject = ['$resource'];

function PolicyFactory($resource) {
  return $resource(
    "/api/v1.0/politica/?format=json",
    {},
    {get: {method: "GET", isArray: true}}
  );
}


function PolicyController($scope, PolicyFactory) {
  $http.get('/api/v1.0/actual/')
    .success(function (data) {
      $scope.policy = data;
  });
}

