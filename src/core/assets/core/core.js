(function () {
  'use strict';

  angular
    .module('cmi', [
      'core.config',
      'core.routes',
      'core.controllers',
      'core.service'
    ])
      .run(run);

    run.$inject = ['$http'];

  angular
      .module('core.config', []);

  angular
      .module('core.routes', ['ngRoute']);


  /**
    * @name run
    * @desc Update xsrf $http headers to align with Django's defaults
    */
    function run($http) {
      $http.defaults.xsrfHeaderName = 'X-CSRFToken';
      $http.defaults.xsrfCookieName = 'csrftoken';
    }

})();