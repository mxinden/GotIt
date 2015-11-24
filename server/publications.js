"use strict";

Meteor.publish('lecture', function(lectureCode) {
  return App.Lectures.Collection.find({lectureCode: lectureCode});
});

Meteor.publish('lecturesOnlyLectureCode', function() {
  return App.Lectures.Collection.find({}, {fields:{lectureCode: 1}});
});

Meteor.publish('questions', function(lectureCode) {
  return App.Questions.Collection.find({lectureCode: lectureCode});
});

Meteor.publish('votes', function(lectureCode) {
  return App.Votes.Collection.find({lectureCode: lectureCode});
});
