FactoryWoman = {
  _collections: {}
};

Meteor.addCollectionExtension(function(collection) {
  FactoryWoman._collections[collection._name] = collection;
});

Meteor.methods({
  factoryWomanInsert: function(collectionName, attr) {
    return FactoryWoman._collections[collectionName].insert(attr);
  },
  factoryWomanUpdate: function(id, collectionName, attr) {
    return FactoryWoman._collections[collectionName].update({_id: id}, {$set: attr});
  }
});
