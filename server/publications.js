Meteor.publish('lectures', function() {
  return Lectures.find();
});

Meteor.publish('questions', function(lectureCode) {
  return Questions.find({lectureCode: lectureCode});
});
