'use strict';

var app = angular
  .module('Solvr', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'firebase',
    "problemControllers"
  ])
  // .constant('FURL', 'https://your-firebase.firebaseio.com/')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/problems', {
        templateUrl: 'views/problems/index.html',
        controller: 'problemsController',
        controllerAs: "problemsCtrl"
      })
      .when('/problems/new', {
        templateUrl: 'views/problems/new.html',
        controller: "newProblemController",
        controllerAs: "newProblemCtrl"
      })
      .when('/problems/:id', {
        templateUrl: 'views/problems/show.html',
        controller: "problemController",
        controllerAs: "problemCtrl"
      })
      .when('/problems/:id/edit', {
        templateUrl: 'views/problems/edit.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
