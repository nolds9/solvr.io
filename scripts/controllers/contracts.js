'use strict';

app.controller('ContractController', function($scope, $location, toaster, Contract, Auth) {

	$scope.createContract = function() {

		$scope.contract.status = 'open'; // do we need this if its being declared on line 13?
		$scope.contract.gravatar = Auth.user.profile.gravatar;
		$scope.contract.name = Auth.user.profile.name;
		$scope.contract.poster = Auth.user.uid;

		Contract.createContract($scope.contract).then(function(ref) {
			toaster.pop('success', 'Contract created successfully.');
			// Reset form
			$scope.contract = {title: '', description: '', total: '', status: 'open', gravatar: '', name: '', poster: ''};
			$location.path('/contracts/' + ref.key());
		});
	};

	$scope.editContract = function(contract) {
		Contract.editContract(contract).then(function() {
			toaster.pop('success', "Contract is updated.");
		});
	};

});
