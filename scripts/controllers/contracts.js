'use strict';

(function(){
  var contractControllers = angular.module('contractControllers', ['ngRoute'] );

  //index controller
  contractControllers.controller('contractsController', ['FURL', "$firebase", function(  Furl, $firebase ){
    // this.contracts = contract.query();
    var url = 'https://solvr.firebaseio.com/';
    var ref = new Firebase(url)
    var fbContracts = $firebase(ref.child('contracts')).$asArray();

    this.contracts = fbContracts;
  }]);

  // show controller
  contractControllers.controller('contractController', [ '$routeParams', function($routeParams){
      this.contract = {
        id: $routeParams.id,
        title: "clean my house"
      };
  }]);

  // new controller
  contractControllers.controller('newContractController', ['$location', 'FURL', "$firebase", function( $location, FURL, $firebase ){
      this.createcontract = function(contract, FURL){
        // console.log(contract)
        var url = 'https://solvr.firebaseio.com/';

        var ref = new Firebase(url)

        // var ref = new Firebase( FURL ).child("contracts");

        var fbContracts = $firebase(ref.child('/contracts')).$asArray();

        fbContracts.$add(contract);

        // pass in location TODO
        $location.path("/contracts");
      };
  }]);
  



  // app.controller('contractsController', function($scope){
  //   $scope.title = "Clean my house";
  // });
})();
