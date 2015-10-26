console.log("collections file");
Questions = new Meteor.Collection('Questions');

Meteor.methods({
  'db_reset': function() {
    Questions.remove({});
  }
});
