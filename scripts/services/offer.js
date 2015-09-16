'use strict';

app.factory('Offer', function(FURL, $firebase){
  var ref = new Firebase(FURL);

  var Offer = {
    offers: function(contractId){
        return $firebase(ref.child('offers').child(contractId)).$asArray();
    },

    makeOffer: function(contractId, offer){
      var contract_offers = this.offers(contractId);

      if(contract_offers){
        return contract_offers.$add(offer);
      }
    }
  };

  return Offer;
});
