'use strict';

app.controller('DashboardController', function($scope, Dashboard, Auth){
  $scope.contractPoster = [];
  $scope.contractSolvr = [];

  var uid = Auth.user.uid;

  Dashboard.getContractsForUser(uid).then(function(contracts){
    for(var i = 0; i < contracts.length; i++){
      // if type == true, push contract to Poster array, else push to Solvr array
      contracts[i].type? $scope.contractPoster.push(contracts[i]) : $scope.contractSolvr.push(contracts[i]);
    }

    $scope.numPoster = $scope.contractPoster.length;
    $scope.numSolvr = $scope.contractSolvr.length;
  });

});
