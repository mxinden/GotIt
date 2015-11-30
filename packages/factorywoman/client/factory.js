Factory = function(collection, attr) {
  this._collection = collection;
  this._attr = attr;
  this._traits = {};
};

Factory.prototype.trait = function(name, func) {
  if (this._traits[name] === undefined)
    this._traits[name] = func;
  else
    throw new Error('Trait ' + name + ' already defined.');

  return this;
};
