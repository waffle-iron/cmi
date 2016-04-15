(function () {
  'use strict';

  angular
    .module('core.config')
    .config(config)
    .config(django);

  config.$inject = ['$locationProvider'];
  django.$inject = ['$interpolateProvider']

  /**
  * @name config
  * @desc Enable HTML5 routing
  */
  function config($locationProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
  }

  function django($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
  }
})();