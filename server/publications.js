Meteor.publish('lectures', function() {
  return Lectures.find();
});

Meteor.publish('questions', function(lectureCode) {
  return Questions.find({'lectureCode': lectureCode});
});

Meteor.publish('votes', function(lectureCode) {
  return Votes.find({'lectureCode': lectureCode});
});
