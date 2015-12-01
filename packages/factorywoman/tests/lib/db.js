Users = new Meteor.Collection('users');
Animals = new Meteor.Collection('animals');

'use strict';

if (Meteor.isServer) {
  Meteor.methods({
    resetDatabase: function() {
      User.remove({});
      Animal.remove({});
    }
  });
}
