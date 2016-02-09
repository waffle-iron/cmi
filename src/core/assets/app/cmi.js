(function () {
  'use strict';

  angular
    .module('cmi', [
      'cmi.routes',
      'cmi.authentication'
    ]);

  angular
    .module('cmi.routes', ['ngRoute']);
})();