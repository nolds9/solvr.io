'use strict';

var app = angular
  .module('Solvr', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'firebase',
    "contractControllers"
  ])
  .constant('FURL', 'https://solvr.firebaseio.com/')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/contracts', {
        templateUrl: 'views/contracts/index.html',
        controller: 'contractsController',
        controllerAs: "contractsCtrl"
      })
      .when('/contracts/new', {
        templateUrl: 'views/contracts/new.html',
        controller: "newContractController",
        controllerAs: "newContractCtrl"
      })
      .when('/contracts/:id', {
        templateUrl: 'views/contracts/show.html',
        controller: "contractController",
        controllerAs: "contractCtrl"
      })
      .when('/contracts/:id/edit', {
        templateUrl: 'views/contracts/edit.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
