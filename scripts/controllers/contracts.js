'use strict';

(function(){
  var contractControllers = angular.module('contractControllers', ['ngRoute'] );

  //index controller
  contractControllers.controller('contractsController', ['FURL', '$firebase', function(  Furl, $firebase ){
    // this.contracts = contract.query();
    var url = 'https://solvr.firebaseio.com/';
    var ref = new Firebase(url);
    var fbContracts = $firebase(ref.child('contracts')).$asArray();


    fbContracts.$loaded().then(function(data){
      console.log('Step 0: ' + data.length);
    });

    console.log("step 1 = " + fbContracts.length);



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

        var ref = new Firebase(url);

        // var ref = new Firebase( FURL ).child("contracts");

        var fbContracts = $firebase(ref.child('/contracts')).$asArray();

        fbContracts.$add(contract);

        // pass in location TODO
        $location.path("/contracts");
      };
  }]);

  // edit controller
  contractControllers.controller('editContractController', ['$location', '$routeParams', '$firebase', 'toaster', function($location, $routeParams, $firebase, toastr){
      // Connect to Firebase
      var url = 'https://solvr.firebaseio.com/';
      var ref = new Firebase(url)
      // store database recores in local variable as an array
      var fbContracts = $firebase(ref.child('/contracts')).$asArray();
      // grab contract's id from route params
      var contractId = $routeParams.id;

      // Query DB for specified contract
      this.getContract = function(contractId){
        return $firebase(ref.child('contracts').child(contractId)).$asObject();
      };

      // If record with an Id == routeParams.id
     if(contractId){
       // attach selectedContract to controller
       this.selectedContract = this.getContract(contractId);
     }

     // Take user input and update selectedContract
     this.updateContract = function(contract){
       this.selectedContract.$save(contract);
       toaster.pop('success', 'Contract Updated');
       $location.path('/contracts');
     };

  }]);

})();
