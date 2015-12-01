FactoryClosure = {};

'use strict';

FactoryClosure = function(func, callback, funcCount) {
  var self = this;

  this._callback = callback;
  this._funcCount = funcCount;
  this._counter = 0;
  this._traitCounter = 0;
  this._stack = [];
  this._interval = setInterval(function() {
    self.closureWorker();
  }, 50);

  func.call(this);
};

FactoryClosure.prototype.create = function(name, changes, traits) {
  return FactoryWoman.create.call(this, name, changes, traits);
};

FactoryClosure.prototype.closureWorker = function() {
  var obj;
  var self = this;

  if (this._counter >= this._funcCount) {
    // we got all functions running, time to check the stack
    if (this._stack.length > 0) {
      obj = this._stack.pop();

      if (obj.result._id === undefined) {
        this._stack.push(obj);
        return;
      }

      this._traitCounter++;
      Meteor.call('factoryWomanUpdate', obj.result._id, obj.collection, obj.attr, function(error) {
        if (error)
          throw new Error('Error updating trait');

        _.extend(obj.result, obj.attr);
        self._traitCounter--;
      });
    }
  }

  if ((this._counter >= this._funcCount)
      && (this._traitCounter === 0)
      && (this._stack.length === 0)) {
    clearInterval(this._interval);
    this._callback();
  };
};
