"use strict";

Meteor.publish('lecture', function(lectureCode) {
  return App.Lectures.Collection.find({lectureCode: lectureCode});
});

Meteor.publish('lecturesOnlyLectureCode', function() {
  return App.Lectures.Collection.find({}, {lectureCode: 1});
});

Meteor.publish('questions', function(lectureCode) {
  return Questions.find({lectureCode: lectureCode});
});

Meteor.publish('votes', function(lectureCode) {
  return Votes.find({lectureCode: lectureCode});
});
