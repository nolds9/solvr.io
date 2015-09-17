'use strict';

app.factory('Dashboard', function(FURL, $firebase, $q){

  var ref = new Firebase(FURL);

  var Dashboard = {
    getContractsForUser: function(uid){
      var defer = $q.defer();

      $firebase(ref.child('user_contracts').child(uid))
        .$asArray()
        .$loaded()
        .then(function(contracts){
          defer.resolve(contracts);
        }, function(err){
          defer.reject();
        });

        return defer.promise;
    }

  };

  return Dashboard;
});
