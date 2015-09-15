'use strict';

app.controller('BrowseController', function($scope, $routeParams, toaster, Contract, Auth) {

	$scope.searchContract = '';
	$scope.contracts = Contract.all;

	$scope.signedIn = Auth.signedIn;

	$scope.listMode = true;

	if($routeParams.id) {
		var contract = Contract.getContract($routeParams.id).$asObject();
		$scope.listMode = false;
		setSelectedContract(contract);
	}

	function setSelectedContract(contract) {
		$scope.selectedContract = contract;

		// We check isContractCreator only if user signedIn
		// so we don't have to check every time normal guests open the contract
		if($scope.signedIn()) {
			// Check if the current login user is the creator of selected contract
			$scope.isContractCreator = Contract.isCreator;

			// Check if the selectedContract is open
			$scope.isOpen = Contract.isOpen;
		}
	}

	// --------------- CONTRACT ---------------

	$scope.cancelContract = function(id) {
		Contract.cancelContract(id).then(function() {
			toaster.pop('success', "This contract is cancelled successfully.");
		});
	};
});
