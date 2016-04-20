angular.module('core.controllers', [])
  .controller('PoliticController', PoliticController)
  .factory("PoliticsFactory", PoliticsFactory);

// PoliticController.$inject = ['$scope', '$http'];

function PoliticController($scope, $http) {
  $http.get('/api/v1.0/actual/')
    .success(function (data) {
      $scope.politica = data;
  });
}

function PoliticsFactory($resource) {
  return $resource(
    "http://localhost:8000/api/v1.0/politica/?format=json",
    {},
    {get: {method: "GET", isArray: true}}
  )
}