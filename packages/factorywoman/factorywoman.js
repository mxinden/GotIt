"use strict";

if (Meteor.isClient) {
  var Factory, FactoryClosure;

  FactoryWoman = {
    self: this,

    _factories: {},
    begin: function(func, callback, func_count) {
      new FactoryClosure(func, callback, func_count);
    },
    create: function(name, changes, traits) {
      var result, factory;

      factory = FactoryWoman._factories[name];
      if (factory === undefined) {
        console.error('Factory ' + name + ' is not defined.');
        return;
      }

      result = factory._attr;
      result._id = null;
      _.extend(result, changes);

      Meteor.call('factoryWomanInsert', factory._collection, factory._attr, function(error, result) {
        if (error) {
          console.error('Error creating factory ' + name + '.');
          this._counter++;
          return;
        }

        result._id = result;

        if (traits === undefined)
          return;
        else if (typeof traits === 'string')
          traits = [traits];

        _.each(traits, function(trait) {
          // this refering to a FactoryClosure object
          this._stack.push({
            collection: factory._collection,
            attr: result
          });
          _.extend(result, trait.call(this, result));
        });

        // this refering to a FactoryClosure object
        this._counter++;
      });

      return result;
    },
    define: function(name, collection, attr) {
      var factory;

      if (this._factories[name] === undefined) {
        factory = new Factory(collection, attr);
        this._factories[name] = factory;
      } else {
        factory = new Factory('', {});
        console.error('Factory ' + name + ' already defined.');
      }

      return factory;
    }
  };

  FactoryClosure = function(func, callback, func_count) {
    var self = this;

    this._callback = callback;
    this._func_count = func_count;
    this._counter = 0;
    this._trait_counter = 0;
    this._stack = [];
    this._interval = setInterval(function() {
      self.closureWorker();
    }, 50);

    func.call(this);
  };

  FactoryClosure.prototype.create = function(name, changes, traits) {
    FactoryWoman.create.call(this, name, changes, traits);
  };

  FactoryClosure.prototype.closureWorker = function() {
    if (this._counter === this._func_count) {
      // we got all functions running, time to check the stack
      if (this._stack.length > 0) {
        var obj = this._stack.pop();

        if (obj.attr._id === undefined) {
          this._stack.push(obj);
          return;
        }

        this._trait_counter++;
        Meteor.call('factoryWomanUpdate', obj.attr._id, obj.collection, obj.attr, function(error) {
          if (error)
            console.error('Error updating trait');

          this._trait_counter--;
        });
      }
    }

    if ((this._counter === this._func_count) && (this._trait_counter === 0) && (this._stack === [])) {
      clearInterval(this._interval);
      this._callback();
    };
  };

  Factory = function(collection, attr) {
    this._collection = collection;
    this._attr = attr;
    this._traits = {};
  };

  Factory.prototype.trait = function(name, func) {
    if (this._traits[name] === undefined)
      this._traits[name] = func;
    else
      console.error('Trait ' + name + ' already defined.');

    return this;
  };
};

if (Meteor.isServer) {
  FactoryWoman = {
    _collections: {}
  };

  Meteor.addCollectionExtension(function(collection) {
    FactoryWoman._collections[collection._name] = collection;
  });

  Meteor.methods({
    factoryWomanInsert: function(collection_name, attr) {
      return FactoryWoman._collections[collection_name].insert(attr);
    },
    factoryWomanUpdate: function(id, collection_name, attr) {
      return FactoryWoman._collections[collection_name].update({_id: id}, {$set: attr});
    }
  });
}
