(function(){
  "use strinct";

  angular.module('core.routers', ['ngRoute'])
    .config(rutasCore);

  rutasCore.$inject = ['$routeProvider'];

  function rutasCore($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'static/core/pages/home.html',
        controller : 'PortadaController'
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