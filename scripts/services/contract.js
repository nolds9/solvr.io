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

    createContract: function(contract){
      contract.datetime = Firebase.ServerValue.TIMESTAMP;
      return contracts.$add(contract);
    },

    editContract: function(contract){
      var c = this.getContract(contract.$id);
      return c.$update({title: contract.title, description: contract.description, total: contract.total});
    },

    closeContract: function(id){
      var c = this.getContract(id);
      return c.$update({status: "closed"});
    },

    isCreator: function(contract){
      return ( user && user.provider && user.uid === contract.poster );
    },

    isOpen: function(contract){
        return contract.status === "open";
    },

    completeContract: function(contractId){
        var c = this.getContract(contractId);
        return c.$update({status: "completed"});
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
