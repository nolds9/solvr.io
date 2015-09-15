'use strict';

app.controller('AuthController', function($scope, $location, Auth){
  $scope.register = function(user){
    Auth.register(user).then(function(){
        console.log("Registered successfully!");
        $location.path("/");
    }, function(err){
        console.log("Error...");
    });
  };

  $scope.login = function(user){
    Auth.login(user).then(function(){
        console.log("logged in successfully!");
        $location.path("/");
    }, function(err){
        console.log("Error...");
    });
  };

  $scope.changePassword = function(user){
    Auth.changePassword(user).then(function(){
        // reset form?
        console.log("password changed successfully!");
        $location.path("/");
    }, function(err){
        console.log("Error...");
    });
  };
});
