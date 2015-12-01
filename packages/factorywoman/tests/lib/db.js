Users = new Meteor.Collection('users');
Animals = new Meteor.Collection('animals');

'use strict';

Meteor.methods({
  resetDatabase: function() {
    Users.remove({});
    Animals.remove({});
  }
});
