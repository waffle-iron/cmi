(function(){
  angular.module('core.routers', [])
    .config(['$routeProvider',
      function ($routeProvider) {
        $routeProvider
          .when('/api/v1.0/politica/:revision/', {
            templateUrl: 'core/partials/policy-detail.html',
            controller: 'PolicyDetailController'
            })
          .otherwise({
            redirectTo: '/'
            });
      }]);
})();