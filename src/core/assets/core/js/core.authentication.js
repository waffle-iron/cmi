(function(){
  'use strict';

  angular.module('core.authentication')
    .factory('Authentication', Authentication);
  Authentication.$inject = ['$cookies', '$http'];

  function Authentication($cookies, $http) {
    var Authentication = {
      register: register
    };
    return Authentication;
    function register(email, password, username) {
      return $http.post('/api/v1.0/users/', {
        username: username,
        password: password,
        email   : email
      });
    }
  }
})();