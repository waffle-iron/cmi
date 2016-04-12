(function () {
  'use strict';

  angular
    .module('core', [
      'core.controllers',
      'core.service'
    ]);

  angular
    .module('core.controllers', []);

  angular
    .module('core.services', ['ngCookies']);
})();