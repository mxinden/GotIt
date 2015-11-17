"use strict";

Template.question.helpers({
  votedByMe: function() {
    return App.Votes.Collection.findOne({
      author: Meteor.userId(),
      questionId: this._id
    }) !== undefined;
  },

  numberOfVotes: function() {
    return App.Votes.Collection.find({
      questionId: this._id
    }).count();
  },

  numberOfStudentsInLecture: function() {
    return App.Lectures.getNumberOfStudents(this.lectureCode);
  },

  percentageOfUsersWhoVoted: function() {
    var questionCount = App.Votes.Collection.find({questionId: this._id}).count();
    var studentCount = App.Lectures.getNumberOfStudents(this.lectureCode);
    var percent;

    if (studentCount === 0) {
      return 0;
    }

    percent = questionCount / studentCount * 100;
    return Math.round(percent);
  },

  isLecturer: function() {
    return App.Lectures.isLecturer(this.lectureCode);
  }
});

Template.question.events({
  'click .btn-vote': function() {
    var vote = {
      questionId: this._id,
      lectureCode: this.lectureCode
    };

    Meteor.call('insertVote', vote);
  },

  'click .btn-unvote': function() {
    Meteor.call('deleteVote', this._id);
  },

  'click .btn-delete-question': function() {
    var questionDeleteParams = {
      questionId: this._id,
      lectureCode: this.lectureCode
    };

    Meteor.call('deleteQuestion', questionDeleteParams);
  }
});
