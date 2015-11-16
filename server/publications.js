"use strict";

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
