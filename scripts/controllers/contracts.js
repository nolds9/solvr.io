'use strict';

(function(){
  var contractControllers = angular.module('contractControllers', ['ngRoute'] );

  //index controller
  contractControllers.controller('contractsController', ['$routeParams','toaster', 'Contract', 'Auth', function($routeParams, toaster, Contract, Auth){
    this.searchContract = '';
    this.contracts = Contract.all;
    this.signedIn = Auth.signedIn;
    this.listMode = true;
  }]);

  // show controller
  contractControllers.controller('contractController', [ '$routeParams', 'Auth', 'Contract', function($routeParams, Auth, Contract){
    if($routeParams.id){
      var contract = Contract.getContract($routeParams.id).$asObject();
      $scope.listMode = false
    }
  }]);

  // new controller
  contractControllers.controller('newContractController', ['$scope', '$location', 'toaster','Contract', 'Auth', function( $scope, $location, toaster, Contract, Auth ){
      $scope.createContract = function(){
        $scope.contract = {
          status: "open",
          gravatar: Auth.user.profile.gravatar,
          name: Auth.user.profile.name,
          poster: Auth.user.uid
        };

        Contract.createContract($scope.contract).then(function(ref){
          toaster.pop('success', 'Contract created successfully');
          $scope.contract = {title: '', description: '', total: '', status: 'open', gravatar: '', name: '', poster: ''};
          $location.path("/contracts/" + ref.key());
        });
      };
  }]);

  // edit controller
  contractControllers.controller('editContractController', ['$location', 'Contract', 'Auth', 'toaster', function($location, Contract, Auth, toaster){
     this.updateContract = function(contract){
       Contract.editContract(contract).then(function(){
         toaster.pop('success', 'Contract is updated');
       });
     };
  }]);

})();
