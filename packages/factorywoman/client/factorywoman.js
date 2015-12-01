FactoryWoman = {};

'use strict';

FactoryWoman = {
  _factories: {},
  begin: function(func, callback, funcCount) {
    new FactoryClosure(func, callback, funcCount);
  },
  create: function(name, changes, traits) {
    // 'this' refering to a FactoryClosure object
    var self = this;
    var result, factory;

    factory = FactoryWoman._factories[name];
    if (factory === undefined) {
      throw new Error('Factory ' + name + ' is not defined.');
    }

    result = _.clone(factory._attr);
    _.extend(result, changes);

    Meteor.call('factoryWomanInsert', factory._collection, result, function(error, insertResult) {
      if (error) {
        self._counter++;
        throw new Error('Error creating factory ' + name + '.');
      }

      result._id = insertResult;

      if (traits === undefined)
        traits = [];
      else if (typeof traits === 'string')
        traits = [traits];

      _.each(traits, function(trait) {
        var traitReturn = factory._traits[trait].call(self, result);

        _.extend(result, traitReturn);
        self._stack.push({
          collection: factory._collection,
          attr: traitReturn,
          result: result
        });
      });

      self._counter++;
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
      throw new Error('Factory ' + name + ' already defined.');
    }

    return factory;
  }
};
