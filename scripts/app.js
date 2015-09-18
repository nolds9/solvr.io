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
  // Firebase URL
  .constant('FURL', 'https://solvr.firebaseio.com/')
  // if not authenticated, redirect to login
  .run(function($rootScope, $location){
    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
      // Catch error thrown when the $requireAuth promise is rejected
      // and then redirect the user back to the login page
      if(error === 'AUTH_REQUIRED'){
        $location.path('/login');
      }
    });
  })
  // -------------- ROUTES ------------
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
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardController',
        resolve: {
          currentAuth: function(Auth){
            return Auth.requireAuth();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
