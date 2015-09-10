if (process.env.IS_MIRROR) {
  Meteor.methods({
    'loadFixtures': function(){
      console.log('Loading default fixtures');

      Lectures.insert({
        lectureCode: '00000',
        title: 'OpenSource150904'
      });
      Questions.insert({
        "lectureCode" : "00000",
        "questionText" : "What is a monolithic kernel?\"",
        "author" : "arrizdwR4Y57H8HFP",
        "submitted" : new Date("2015-09-10T14:37:23.036Z")
      }); 

      console.log('Finished loading default fixtures');
    },

    'clearDB': function(){
      console.log('Clear DB');

      var collectionsRemoved = 0;
      var db = Meteor.users.find()._mongo.db;
      db.collections(function (err, collections) {

        var appCollections = _.reject(collections, function (col) {
          return col.collectionName.indexOf('velocity') === 0 ||
            col.collectionName === 'system.indexes';
        });

        _.each(appCollections, function (appCollection) {
          appCollection.remove(function (e) {
            if (e) {
              console.error('Failed removing collection', e);
              fut.return('fail: ' + e);
            }
            collectionsRemoved++;
            console.log('Removed collection');
            if (appCollections.length === collectionsRemoved) {
              console.log('Finished resetting database');
            }
          });
        });

      });

      console.log('Finished clearing');
    }
  });
}
