angular.module('core.controllers', [])
  .controller('PoliticController', PoliticController);

// PoliticController.$inject = ['$scope', '$http'];

function PoliticController($scope, $http) {
  $http.get('/api/v1.0/actual/')
    .success(function (data) {
      $scope.politica = data;
  });
}