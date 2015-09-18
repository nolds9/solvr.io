'use strict';

app.controller('BrowseController', function($scope, $routeParams, toaster, Contract, Auth, Comment, Offer) {

 // =========== DEFAULTS ==========
	$scope.searchContract = '';
	$scope.contracts = Contract.all;
	$scope.user = Auth.user;

	$scope.signedIn = Auth.signedIn;

	$scope.listMode = true;

// ========= SHOW ==============

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

		// Check if the current logged in user has already made an offer for selected contract
			Offer.isOffered(contract.$id).then(function(data) {
				// console.log(data);
				$scope.alreadyOffered = data;
				// console.log($scope.alreadyOffered);
			});

			// Check if the current login user is the creator of selected contract
			$scope.isContractCreator = Contract.isCreator;

			// Check if the selectedContract is open
			$scope.isOpen = Contract.isOpen;

			// Check if the current user is the contract winner
			$scope.isSolvr = Contract.isSolvr;

			// Check if the contract has been completed
			$scope.isCompleted = Contract.isCompleted;

			// Unblock the Offer Button
			$scope.block = false;

			// Check if the current login user is offer maker (to display Cancel Offer button)
			$scope.isOfferMaker = Offer.isMaker;
		}

		// Get list of Comments for selected Contract
		$scope.comments = Comment.comments(contract.$id);

		// Get list of Offers for selected Contract
		$scope.offers = Offer.offers(contract.$id);

	}

	// --------------- OFFER ---------------
	$scope.makeOffer = function() {
		var offer = {
			total: $scope.data.total,
			uid: $scope.user.uid,
			name: $scope.user.profile.name,
			gravatar: $scope.user.profile.gravatar
		};

		Offer.makeOffer($scope.selectedContract.$id, offer).then(function() {
			toaster.pop('success', "Your offer has been placed.");

			// Mark that the current user has offerred for this contract.
			$scope.alreadyOffered = true;

			// Reset offer form
			$scope.total = '';

			// Disable the "Offer Now" button on the modal
			$scope.block = true;

			$scope.isOfferMaker = Offer.isMaker;

		});
	};

	$scope.cancelOffer = function(offerId) {
		Offer.cancelOffer($scope.selectedContract.$id, offerId).then(function() {
			toaster.pop('success', "Your offer has been cancelled.");

			// Mark that the current user has cancelled offer for this contract.
			$scope.alreadyOffered = false;

			// Unblock the Offer button on Offer modal
			$scope.block = false;
		});
	};


	$scope.acceptOffer = function(offerId, solvrId){
		Offer.acceptOffer($scope.selectedContract.$id, offerId, solvrId).then(function(){
			toaster.pop('success', 'Offer is accepted');
		});
	};

	$scope.completeContract = function(contractId){
		Contract.completeContract(contractId).then(function(){
			toaster.pop('success', 'Contract Complete! Congrats');
		});
	};


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
