'use strict';

app.controller('BrowseController', function($scope, $routeParams, toaster, Contract, Auth, Comment) {

	$scope.searchContract = '';
	$scope.contracts = Contract.all;

	$scope.user = Auth.user;

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
		$scope.comments = Comment.comments(contract.$id);
	}

	// --------------- COMMENT ---------------
	$scope.addComment = function(){
		var comment = {
			content: $scope.content,
			name: $scope.user.profile.name,
			gravatar: $scope.user.profile.gravatar
		};

		Comment.addComment($scope.selectedContract.$id, comment ).then(function(){
			$scope.content = '';
		});
	};

	// --------------- CONTRACT ---------------

	$scope.cancelContract = function(id) {
		Contract.closeContract(id).then(function() {
			toaster.pop('success', "This contract was cancelled successfully.");
		});
	};
});
