'use strict';

var app = angular
  .module('Solvr', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'firebase',
    'toaster',
    "contractControllers",
    'angularMoment'
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
      .when('/contracts/:id', {
        templateUrl: 'views/contracts/show.html',
        controller: "contractController",
        controllerAs: "contractCtrl"
      })
      .when("/login", {
        templateUrl: "views/login.html",
        controller: "AuthController"
      })
      .when("/register", {
        templateUrl: "views/register.html",
        controller: "AuthController"
      })
      .otherwise({
        redirectTo: '/'
      });
  });
