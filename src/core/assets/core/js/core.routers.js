(function(){
  "use strict";

  angular.module('core.routers', ['ngRoute'])
    .config(rutasCore);

  rutasCore.$inject = ['$routeProvider'];

  function rutasCore($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'static/core/pages/home.html',
        controller : 'PortadaController'
        })
      .when('/register', {
        templateUrl : 'static/core/pages/register.html',
        controller  : 'RegisterController',
        controllerAs: 'vm'
        })
      .when('/login', {
        templateUrl: 'static/core/pages/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
        })
      .when('/policies', {
        templateUrl : 'static/core/pages/policies.html',
        controller  : 'PolicyListController'
        })
      .otherwise({
        redirectTo : '/'
        });
  }
})();