Meteor.publish('lecture', function(lectureCode) {
  return Lectures.find({lectureCode: lectureCode});
});

Meteor.publish('lecturesOnlyLectureCode', function() {
  return Lectures.find({}, {lectureCode: 1});
});

Meteor.publish('questions', function(lectureCode) {
  return Questions.find({lectureCode: lectureCode});
});

Meteor.publish('votes', function(lectureCode) {
  return Votes.find({lectureCode: lectureCode});
});

/** Publish which user is present in the current lecture */
Meteor.publish('presences', function(lectureCode) {
  return Presences.find({'state.currentLectureCode': lectureCode});
});
