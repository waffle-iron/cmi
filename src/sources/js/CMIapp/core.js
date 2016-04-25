/**
 * Created by INE on 20/04/2016.
 */

(function(){
  'use strict';

  angular.module('cmiApp', [
      'ngRoute',
      'ngResource',
      'core.controllers',
      'core.routers'
    ])
    .config(function ($interpolateProvider) {
      $interpolateProvider.startSymbol('{$');
      $interpolateProvider.endSymbol('$}');
    });
})();