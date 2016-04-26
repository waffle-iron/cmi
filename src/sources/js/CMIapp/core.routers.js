(function(){
  angular.module('core.routers', ['ngRoute'])
    .config(['$routeProvider',
      function ($routeProvider) {
        $routeProvider
          .when('policy/', {
            templateUrl: 'core/partials/policy-list.html',
            controller: 'PolicyListController'
          })
          .when('policy/:revision', {
            templateUrl: 'core/partials/policy-detail.html',
            controller: 'PolicyDetailController'
            })
          .otherwise({
            redirectTo: '/'
            });
      }]);
})();