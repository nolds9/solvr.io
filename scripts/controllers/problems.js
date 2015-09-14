'use strict';

(function(){
  var problemControllers = angular.module('problemControllers', ['ngRoute'] );

  //index controller
  problemControllers.controller('problemsController', function($scope){
    // this.problems = Problem.query();
    $scope.title = "clean my house 2";
  });

  // show controller
  problemControllers.controller('problemController', [ '$routeParams', function($routeParams){
      this.problem = {
        id: $routeParams.id,
        title: "clean my house"
      };
  }]);

  problemControllers.controller('newProblemController', [ function($routeParams){
      this.createProblem = function(problem){
        console.log(problem)
      };
  }]);



  // app.controller('ProblemsController', function($scope){
  //   $scope.title = "Clean my house";
  // });
})();
