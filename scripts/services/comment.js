'use strict';

app.factory('Comment', function(FURL, $firebase){
  var ref = new Firebase(FURL)

  var Comment = {
    comments: function(contractId){
      return $firebase(ref.child('comments').child(contractId)).$asArray();
    },

    addComment: function(contractId, comment){
      var contract_comments = this.comments(contractId);
      comment.datetime = Firebase.ServerValue.TIMESTAMP;

      if(contract_comments){
        return contract_comments.$add(comment);
      }
    }
  };

  return Comment;
});
