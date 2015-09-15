'use strict';

var app = angular
  .module('Solvr', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'firebase',
    'toaster',
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
        controller: 'BrowseController'
      })
      .when('/contracts/:id', {
        templateUrl: 'views/contracts/index.html',
        controller: "BrowseController"
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
