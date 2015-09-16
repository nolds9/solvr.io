'use strict';

app.factory('Offer', function(FURL, $firebase, $q, Auth) {
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

		// This function is to check if the login user already made offer for this contract.
		// This to prevent a user from offering more than 1.
		isOffered: function(contractId) {

			if(user && user.provider) {
				var d = $q.defer();

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
		}

	};

	return Offer;

});
