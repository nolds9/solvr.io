'use strict';

app.controller('AuthController', function($scope, $location, Auth, toaster){
  $scope.register = function(user){
    Auth.register(user).then(function(){
      toaster.pop('success', 'Registered successfully');
        $location.path("/contacts");
    }, function(err){
      toaster.pop('error', 'Sorry, something went wrong');
    });
  };

  $scope.login = function(user){
    Auth.login(user).then(function(){
      toaster.pop('success', 'Logged In successfully');
        $location.path("/dashboard");
    }, function(err){
      toaster.pop('error', 'Sorry, something went wrong');
    });
  };

  $scope.changePassword = function(user){
    Auth.changePassword(user).then(function(){
        // reset form?
        toaster.pop('success', 'Password Changed successfully');
        $location.path("/");
    }, function(err){
      toaster.pop('error', 'Sorry, something went wrong');
    });
  };
});
