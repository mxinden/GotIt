User = new Meteor.Collection('users');
Animal = new Meteor.Collection('animals');

if (Meteor.isServer) {
  Meteor.methods({
    resetDatabase: function() {
      User.remove({});
      Animal.remove({});
    }
  });
}
