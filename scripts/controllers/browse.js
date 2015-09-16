'use strict';

app.controller('BrowseController', function($scope, $routeParams, toaster, Contract, Auth, Comment, Offer) {

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

			// Check if the current logged in user has already made an offer for selected contract
			// Check if the current login user has already made an offer for selected contract
				Offer.isOffered(contract.$id).then(function(data) {
					console.log(data);
					$scope.alreadyOffered = data;
					console.log($scope.alreadyOffered);
				});

			// Check if the current login user is the creator of selected contract
			$scope.isContractCreator = Contract.isCreator;

			// Check if the selectedContract is open
			$scope.isOpen = Contract.isOpen;

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
			console.log($scope.alreadyOffered);

			$scope.alreadyOffered = true;

			console.log($scope.alreadyOffered);


			// Reset offer form
			$scope.total = '';

			// Disable the "Offer Now" button on the modal
			$scope.block = true;
		});
	};

	// $scope.cancelOffer = function(offerId) {
	// 	Offer.cancelOffer($scope.selectedContract.$id, offerId).then(function() {
	// 		toaster.pop('success', "Your offer has been cancelled.");
	//
	// 		// Mark that the current user has cancelled offer for this contract.
	// 		$scope.alreadyOffered = false;
	//
	// 		// Unblock the Offer button on Offer modal
	// 		$scope.block = false;
	// 	});
	// };


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
