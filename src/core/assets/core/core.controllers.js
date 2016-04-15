/**
* Register controller
* @namespace core.controllers
*/
(function () {
  'use strict';

  angular
    .module('core.controllers', [])
    .controller('RegisterController', RegisterController)
    .controller('DemoController', DemoController);

  // DemoController.$inject = [];

  function DemoController(){
    this.label = "Estoy enlazado desde la aplicación de AngularJS";
  }

  RegisterController.$inject = ['$location', '$scope', 'Authentication'];

  /**
  * @namespace RegisterController
  */
  function RegisterController($location, $scope, Authentication) {
    var vm = this;

    vm.register = register;

    /**
    * @name register
    * @desc Register a new user
    * @memberOf core.controllers.RegisterController
    */
    function register() {
      Authentication.register(vm.email, vm.password, vm.username);
    }
  }
})();