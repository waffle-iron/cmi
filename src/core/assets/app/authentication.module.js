(function () {
  'use strict';

  angular
    .module('cmi.authentication', [
      'cmi.authentication.controllers',
      'cmi.authentication.services'
    ]);

  angular
    .module('cmi.authentication.controllers', []);

  angular
    .module('cmi.authentication.services', ['ngCookies']);
})();