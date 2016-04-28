(function(){
  "use strict";
  
  angular.module('core.controllers', [])
    .controller('PortadaController', PortadaController)
    .controller('PolicyListController', PolicyListController)
    .controller('RegisterController', RegisterController)
    .controller('LoginController', LoginController);
  
  PortadaController.$inject = ['$scope', 'PolicyFactory', '$sce'];
  PolicyListController.$inject = ['$scope', 'PolicyFactory', "$sce"];
  RegisterController.$inject = ['$location', '$scope', 'Authentication'];
  LoginController.$inject = ['$location', '$scope', 'Authentication'];

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
  
  function RegisterController($location, $scope, Authentication){
    var vm = this;
    vm.register = register;
    activate();

    /**
    * @name register
    * @desc Try to register a new user
    * @param {string} email The email entered by the user
    * @param {string} password The password entered by the user
    * @param {string} username The username entered by the user
    * @returns {Promise}
    * @memberOf core.services.Authentication
    */
    function register(email, password, username) {
      return $http.post('/api/v1/accounts/', {
        username: username,
        password: password,
        email: email
      }).then(registerSuccessFn, registerErrorFn);

      /**
      * @name registerSuccessFn
      * @desc Log the new user in
      */
      function registerSuccessFn(data, status, headers, config) {
        Authentication.login(email, password);
      }

      /**
      * @name registerErrorFn
      * @desc Log "Epic failure!" to the console
      */
      function registerErrorFn(data, status, headers, config) {
        console.error('Epic failure!');
      }
    }

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf core.controllers.RegisterController
    */
    function activate() {
      // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }
  }

  function LoginController($location, $scope, Authentication) {
    var vm = this;
    vm.login = login;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf thinkster.Autenticacion.controllers.LoginController
    */
    function activate() {
      // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }

    /**
    * @name login
    * @desc Log the user in
    * @memberOf thinkster.Autenticacion.controllers.LoginController
    */
    function login() {
      Authentication.login(vm.email, vm.password);
    }
  }
})();