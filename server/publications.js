"use strict";

Meteor.publish('lecture', function(lectureCode) {
  check(lectureCode, String);
  return App.Lectures.Collection.find({lectureCode: lectureCode});
});

Meteor.publish('lecturesOnlyLectureCode', function() {
  return App.Lectures.Collection.find({}, {fields: {lectureCode: 1}});
});

Meteor.publish('questions', function(lectureCode) {
  check(lectureCode, String);
  return App.Questions.Collection.find({lectureCode: lectureCode});
});

Meteor.publish('votes', function(lectureCode) {
  check(lectureCode, String);
  return App.Votes.Collection.find({lectureCode: lectureCode});
});
