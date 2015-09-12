'use strict';

var app = angular
  .module('TaskNinjaApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'firebase'
  ])
  .constant('FURL', 'https://your-firebase.firebaseio.com/')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/problems', {
        templateUrl: 'views/problems/index.html'
      })
      .when('/problems/new', {
        templateUrl: 'views/problems/new.html',
        controller: "ProblemsController"
      })
      .when('/problems/:id', {
        templateUrl: 'views/problems/show.html',
        controller: "ProblemsController"
      })
      .when('/problems/:id/edit', {
        templateUrl: 'views/problems/edit.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
