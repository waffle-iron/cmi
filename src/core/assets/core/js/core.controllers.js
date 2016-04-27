(function(){
  "use strict";
  
  angular.module('core.controllers', [])
    .factory("PolicyFactory", PolicyFactory)
    .factory("AuthenticationFactory", AuthenticationFactory)
    .controller('PortadaController', PortadaController)
    .controller('PolicyListController', PolicyListController)
    .controller('RegisterController', RegisterController);

  PolicyFactory.$inject = ['$resource'];
  AuthenticationFactory.$inject = ['$cookies', '$http'];
  PortadaController.$inject = ['$scope', 'PolicyFactory', '$sce'];
  PolicyListController.$inject = ['$scope', 'PolicyFactory', "$sce"];
  RegisterController.$inject = ['$location', '$scope', 'AuthenticationFactory'];

  function PolicyFactory($resource) {
    return $resource(
      "/api/v1.0/politica/",
      {},
      { 'get': {method: "GET", isArray: false}}
    );
  }

  function AuthenticationFactory($cookies, $http) {
    var Authentication = {
      login: login,
      register: register
    };
    return Authentication;
    function register(email, password, username) {
      return $http.post('/api/v1.0/pipols/', {
        username: username,
        password: password,
        email   : email
      });
    }
    function login(email, password){
      return $http.post('/api/v1.0/login/', {
        email   : email,
        password: password
      })
    }
  }

  function PortadaController($scope, PolicyFactory, $sce) {
    PolicyFactory.get(function(data){
      $scope.policy = data.results[0];
    });
  }

  function PolicyListController($scope, PolicyFactory, $sce) {
    PolicyFactory.get(function(data){
      $scope.policies = data.results;
    });
  }
  
  function RegisterController($location, $scope, AuthenticationFactory){
    var vm = this;
    vm.register = register;
    function register() {
      AuthenticationFactory.register(vm.email, vm.password, vm.username);
    }
  }


})();