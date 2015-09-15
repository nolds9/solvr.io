'use strict';

(function(){
  // var authControllers = angular.module('authControllers', ["$location", "Auth"]);

app.controller('authController', ['$location', 'Auth', function($location, Auth){
    this.register = function(user){
      Auth.register(user).then(function(){
        console.log("Registered successfully");
        $location.path('/');
      }, function(err){
        console.log("Error...");
      });
    };

    this.login = function(user){
      Auth.login(user).then(function(){
        console.log("Logged in successfully");
        $location.path('/');
      }, function(err){
        console.log("Error...");
      });
    };

    this.changePassword = function(user){
      Auth.changePassword(user).then(function(){
        //reset form
        this.user = {};
        console.log("password changed successfully");
      }, function(err){
        console.log("Error...");
      });
    };

  }]); //end controller

})();
