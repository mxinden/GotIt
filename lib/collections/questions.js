"use strict";

App.Questions = {};
App.Questions.Collection = new Mongo.Collection('questions');

Meteor.methods({
  insertQuestion: function(lectureCode, questionText) {
    var lecture, question;

    check(lectureCode, String);
    check(questionText, String);

    if (questionText.trim().length === 0) {
      throw new Meteor.Error('Not a valid question text');
    }

    // Check if a lecture to this lecture code exists
    lecture = App.Lectures.Collection.findOne({lectureCode: lectureCode});
    if (lecture === undefined) {
      throw new Meteor.Error('Not a valid lecture code');
    }

    question = {
      lectureCode: lectureCode,
      questionText: questionText,
      author: Meteor.userId(),
      submitted: new Date()
    };
    return App.Questions.Collection.insert(question);
  },

  deleteQuestion: function(lectureCode, questionId) {
    check(lectureCode, String);
    check(questionId, String);

    if (!App.Lectures.isLecturer(lectureCode)) {
      throw new Meteor.Error('Not the lecturer of this lecture');
    }

    App.Questions.Collection.remove(questionId);
  }
});
