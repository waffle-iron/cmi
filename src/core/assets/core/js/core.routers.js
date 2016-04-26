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
      .when('/acerca', {
        templateUrl : 'static/core/pages/acerca.html',
        controller  : 'AboutController'
        })
      .when('/contacto', {
        templateUrl: 'static/core/pages/contacto.html',
        controller : 'ContactController'
        })
      .otherwise({
        redirectTo : '/'
        });
  }
})();