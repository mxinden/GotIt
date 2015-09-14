if (Meteor.isClient) {
  var Factories, Factory;

  Factories = function() {
    this._factories = {};
  };

  Factories.prototype.begin = function() {

  };

  Factories.prototype._factoryExists = function(name) {
    return this._factories[name] !== undefined;
  };

  Factories.prototype.define = function(name, collection, attr) {
    if (this._factories[name])
      return console.error('Factory ' + name + ' already exists.');

    this._factories[name] = new Factory(name, collection, attr);
    return this._factories[name];
  };

  Factories.prototype.create = function(name, changes) {
    var result = {_id: undefined};
    var factory = this._factories[name];
    var traits = [];
    var attr;

    if (!factory)
      return console.error('Factory ' + name + ' does not exist.');

    for (var i = 2; i < arguments.length; i++)
      traits.push(arguments[i]);

    attr = _.clone(factory._attr);
    _.extend(result, attr);

    Meteor.call('factoryInsert', factory._collection, attr, function(error, insertResult) {
      result._id = insertResult;

      _.each(traits, function(trait) {
        if (!factory._traitExists(trait))
          return console.error('Trait ' + trait + ' does not exist.');

        _.extend(result, factory._traits[trait](result));
        Meteor.call('factoryUpdate', insertResult, factory._collection, result, function() {

        });
      });
    });

    return result;
  };

  FactoryWoman = new Factories();

  Factory = function(name, collection, attr) {
    this._name = name;
    this._collection = collection;
    this._attr = attr;
    this._traits = {};
  };

  Factory.prototype._traitExists = function(name) {
    return this._traits[name] !== undefined;
  };

  Factory.prototype.trait = function(name, func) {
    if (this._traitExists(name)) {
      console.error('Trait ' + name + ' already exists.');
      return this;
    }

    this._traits[name] = func;
    return this;
  };

};

if (Meteor.isServer) {
  var Factories = function() {
    this._collections = {};
  };

  FactoryWoman = new Factories();

  Meteor.addCollectionExtension(function(collection) {
    FactoryWoman._collections[collection._name] = collection;
  });

  Meteor.methods({
    factoryInsert: function(collectionName, attr) {
      return FactoryWoman._collections[collectionName].insert(attr);
    },
    factoryUpdate: function(id, collectionName, attr) {
      return FactoryWoman._collections[collectionName].update({_id: id}, {$set: attr});
    }
  });
}
