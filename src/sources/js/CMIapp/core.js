/**
 * Created by INE on 20/04/2016.
 */

'use strict';

var cmi;
cmi = angular.module('cmiApp',
  [
    'ngResource',
    'core.controllers'
  ])
  .config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
  });
