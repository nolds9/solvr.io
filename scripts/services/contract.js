'use strict'

app.factory('Contract', function( $firebase, Auth){
  var url = 'https://solvr.firebaseio.com/';
  var ref = new Firebase(url);
  var contracts = $firebase(ref.child('contracts')).$asArray();
  var user = Auth.user;

  var Contract = {
    all: contracts,

    getContract: function(id){
      return $firebase(ref.child('contracts').child(id));
    },

    createContract: function(contract) {
      contract.datetime = Firebase.ServerValue.TIMESTAMP;
      return contracts.$add(contract).then(function(newContract) {

        // Create User-Contracts lookup record for POSTER
        var obj = {
          contractId: newContract.key(),
          type: true,
          title: contract.title
        };

        return $firebase(ref.child('user_contracts').child(contract.poster)).$push(obj);
      });
    },

    createUserContracts: function(contractId) {
    			Contract.getContract(contractId)
    				.$asObject()
    				.$loaded()
    				.then(function(contract) {

    					// Create User-Contracts lookup record for RUNNER
    					var obj = {
    						contractId: contractId,
    						type: false,
    						title: contract.title
    					};

    					return $firebase(ref.child('user_contracts').child(contract.solvr)).$push(obj);
    				});
    		},

    editContract: function(contract){
      var c = this.getContract(contract.$id);
      return c.$update({title: contract.title, description: contract.description, total: contract.total});
    },

    closeContract: function(id){
      var c = this.getContract(id);
      return c.$update({status: "closed"});
    },

    completeContract: function(contractId){
        var c = this.getContract(contractId);
        return c.$update({status: "completed"});
    },

    // ========== BUSINESS RULES ===========================

    isCreator: function(contract){
      return ( user && user.provider && user.uid === contract.poster );
    },

    isOpen: function(contract){
        return contract.status === "open";
    },


    isSolvr: function(contract){
      return (user && user.provider && user.uid === contract.solvr );
    },

    isCompleted: function(contract){
      return contract.status === "completed";
    }
  };

  return Contract;

});
