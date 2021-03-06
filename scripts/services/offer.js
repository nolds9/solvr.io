'use strict';

app.factory('Offer', function(FURL, $firebase, $q, Auth, Contract) {
	var ref = new Firebase(FURL);
	var user = Auth.user;

	var Offer = {
		offers: function(contractId) {
			return $firebase(ref.child('offers').child(contractId)).$asArray();
		},

		makeOffer: function(contractId, offer) {
			var contract_offers = this.offers(contractId);

			if(contract_offers) {
				return contract_offers.$add(offer);
			}
		},

		//-----------------------------------------------//

		// Check if the login user already made offer for this contract.
		// Prevent a user from offering more than 1.
		isOffered: function(contractId) {

			if(user && user.provider) {
				var d = $q.defer();

				// created defered object to be called in the ctrl
				$firebase(ref.child('offers').child(contractId).orderByChild("uid")
					.equalTo(user.uid))
					.$asArray()
					.$loaded().then(function(data) {
						d.resolve(data.length > 0);
					}, function() {
						d.reject(false);
					});

				return d.promise;
			}

		},

		//-----------------------------------------------//

		isMaker: function(offer) {
			return (user && user.provider && user.uid === offer.uid);
		},

		getOffer: function(contractId, offerId) {
			return $firebase(ref.child('offers').child(contractId).child(offerId));
		},

		cancelOffer: function(contractId, offerId) {
			return this.getOffer(contractId, offerId).$remove();
		},

		acceptOffer: function(contractId, offerId, solvrId){
			// Step 1: Update Offer with accepted = true
			var o = this.getOffer(contractId, offerId);
			return o.$update({accepted: true})
				.then(function(){
					// Step 2: Update Contract with status = "assigned" and solvrId
					var c = Contract.getContract(contractId);
					return c.$update({status:"assigned", solvr: solvrId});
				})
				.then(function(){
					// Step 3: Create User-Contracts lookup record for use in Dashboard
					return Contract.createUserContracts(contractId);
				});
		}

	};

	return Offer;

});
