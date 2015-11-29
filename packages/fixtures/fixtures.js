/* eslint-disable strict, no-unused-expressions */

Fixtures = {
  clearDB: function(callback) {
    Meteor.call('clearDB', callback);
  },
  createLecture: function(changes, callback) {
    Meteor.call('createLecture', changes, callback);
  },
  createQuestion: function(changes, callback) {
    Meteor.call('createQuestion', changes, callback);
  },
  createVote: function(changes, callback) {
    Meteor.call('createVote', changes, callback);
  },
  createUser: function(changes, callback) {
    Meteor.call('createTestUser', changes, callback);
  }
};

"use strict";

if (Meteor.isServer) {
  Meteor.methods({
    createTestUser: function(changes) {
      var user, userId;
      check(changes, Match.Any);
      user = {
        _id: '00000000000000000',
        createdAt: new Date()
      };
      _.extend(user, changes);
      userId = Meteor.users.insert(user);
      return userId;
    },

    createLecture: function(changes) {
      var lecture;
      check(changes, Match.Any);
      lecture = {
        lectureCode: '00000',
        title: 'Example lecture title',
        lecturer: '00000000000000000',
        students: []
      };
      _.extend(lecture, changes);
      App.Lectures.Collection.insert(lecture);
      return lecture.lectureCode;
    },

    createQuestion: function(changes) {
      var question, questionId;
      check(changes, Match.Any);
      question = {
        _id: '00000000000000000',
        lectureCode: '00000',
        questionText: 'Example question text',
        author: '00000000000000000',
        submited: new Date()
      };
      _.extend(question, changes);
      questionId = App.Questions.Collection.insert(question);
      return questionId;
    },

    createVote: function(changes) {
      var vote, voteId;
      check(changes, Match.Any);
      vote = {
        _id: '00000000000000000',
        questionId: '00000000000000000',
        lectureCode: '00000',
        author: '00000000000000000'
      };
      _.extend(vote, changes);
      voteId = App.Votes.Collection.insert(vote);
      return voteId;
    },

    clearDB: function() {
      App.Lectures.Collection.remove({});
      App.Questions.Collection.remove({});
      App.Votes.Collection.remove({});
    }
  });
}
