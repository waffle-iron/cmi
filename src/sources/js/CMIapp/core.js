/**
 * Created by INE on 20/04/2016.
 */

'use strict';

var cmi;
cmi = angular.module('cmiApp', [])
  .config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
  });

cmi.controller('PoliticController', function(){
  this.label = "Esta es mi política";
});