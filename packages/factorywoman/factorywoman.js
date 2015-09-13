var Factories = function() {
  this._factories = {};
  this._collections = {};
};

Factories.prototype.begin = function(func, callback) {
  setTimeout(function() {
    func();
    callback();
  }, 1);
};

Factories.prototype.define = function(name, collection, attr) {
  if (this._factories[name])
    throw new Error('Factory ' + name + ' already exists.');

  this._factories[name] = new Factory(name, collection, attr);
  return this._factories[name];
};

Factories.prototype.create = function(name, changes, traits) {
  var factory = this._factories[name];
  var attr, insertId;

  if (!factory)
    throw new Error('Factory ' + name + ' does not exist.');

  attr = _.clone(factory._attr);
  _.extend(attr, changes);

  for (var i = 2; i < arguments.length; i++) {
    var trait = factory._traits[arguments[i]];

    if (trait)
      _.extend(attr, trait);
  }

  insertId = Meteor.call('factoryInsert', factory._collection, attr);
  _.extend(attr, {_id: insertId});

  if (arguments.length > 2) {
    for (var i = 2; i < arguments.length; i++) {
      var afterTrait = factory._afterTraits[arguments[i]];

      if (afterTrait)
        _.extend(attr, afterTrait(attr));
    }

    Meteor.call('factoryUpdate', insertId, factory._collection);
  }

  return attr;
};

var Factory = function(name, collection, attr) {
  this._name = name;
  this._collection = collection;
  this._attr = attr;
  this._traits = {};
  this._afterTraits = {};
};

Factory.prototype.afterTrait = function(name, func) {
  if (this._afterTraits[name])
    throw new Error('After Trait ' + name + ' already exists.');

  this._afterTraits[name] = func;
  return this;
};

Factory.prototype.trait = function(name, attr) {
  if (this._traits[name])
    throw new Error('Trait ' + name + ' already exists.');

  this._traits[name] = attr;
  return this;
};

FactoryWoman = new Factories();

if (Meteor.isServer) {
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
