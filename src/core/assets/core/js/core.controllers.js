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
      getAuthenticatedAccount: getAuthenticatedAccount,
      isAuthenticated: isAuthenticated,
      login: login,
      register: register,
      setAuthenticatedAccount: setAuthenticatedAccount,
      unauthenticate: unauthenticate
    };
    return Authentication;
    function register(email, password, username) {
      return $http.post('/api/v1.0/pipols/', {
        username: username,
        password: password,
        email   : email
      });
    }

    /**
     * @name getAuthenticatedAccount
     * @desc Return the currently authenticated account
     * @returns {object|undefined} Account if authenticated, else `undefined`
     * @memberOf thinkster.authentication.services.Authentication
     */
    function getAuthenticatedAccount() {
      if (!$cookies.authenticatedAccount) {
        return;
      }
      return JSON.parse($cookies.authenticatedAccount);
    }

    /**
     * @name isAuthenticated
     * @desc Check if the current user is authenticated
     * @returns {boolean} True is user is authenticated, else false.
     * @memberOf thinkster.authentication.services.Authentication
     */
    function isAuthenticated() {
      return !!$cookies.authenticatedAccount;
    }

    /**
     * @name setAuthenticatedAccount
     * @desc Stringify the account object and store it in a cookie
     * @param {Object} user The account object to be stored
     * @returns {undefined}
     * @memberOf thinkster.authentication.services.Authentication
     */
    function setAuthenticatedAccount(account) {
      $cookies.authenticatedAccount = JSON.stringify(account);
    }

    /**
     * @name unauthenticate
     * @desc Delete the cookie where the user object is stored
     * @returns {undefined}
     * @memberOf thinkster.authentication.services.Authentication
     */
    function unauthenticate() {
      delete $cookies.authenticatedAccount;
    }

    /**
     * @name login
     * @desc Try to log in with email `email` and password `password`
     * @param {string} email The email entered by the user
     * @param {string} password The password entered by the user
     * @returns {Promise}
     * @memberOf thinkster.authentication.services.Authentication
     */
    function login(email, password){
      return $http.post('/api/v1.0/login/', {
        email   : email,
        password: password
      }).then(loginSuccessFn, loginErrorFn);

      /**
       * @name loginSuccessFn
       * @desc Set the authenticated account and redirect to index
       */
      function loginSuccessFn(data, status, headers, config) {
        Authentication.setAuthenticatedAccount(data.data);
        window.location = '/';
      }
      /**
       * @name loginErrorFn
       * @desc Log "Epic failure!" to the console
       */
      function loginErrorFn(data, status, headers, config) {
        console.error('Epic failure!');
      }
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