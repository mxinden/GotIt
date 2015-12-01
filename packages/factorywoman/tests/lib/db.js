Users = new Meteor.Collection('users');
Animals = new Meteor.Collection('animals');

'use strict';

if (Meteor.isServer) {
  Meteor.publish('users', function() {
    return Users.find({});
  });

  Meteor.publish('animals', function() {
    return Animals.find({});
  });
}

Meteor.methods({
  resetDatabase: function() {
    Users.remove({});
    Animals.remove({});
  }
});
