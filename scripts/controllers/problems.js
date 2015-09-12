'use strict';

(function(){
  var problemControllers = angular.module('problemControllers', ['ngRoute'] );

  //index controller
  problemControllers.controller('problemsController', ['Problem', function(){
    // this.problems = Problem.query();
  }]);

  // show controller
  problemControllers.controller('problemController', [function(){
    
  }]);



  // app.controller('ProblemsController', function($scope){
  //   $scope.title = "Clean my house";
  // });
})();
