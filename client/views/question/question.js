"use strict";

Template.question.helpers({
  votedByMe: function() {
    return Votes.findOne({
      author: Meteor.userId(),
      questionId: this._id
    }) !== undefined;
  },

  numberOfVotes: function() {
    return Votes.find({
      questionId: this._id
    }).count();
  },

  numberOfMembersInLecture: function() {
    return App.Lectures.getNumberOfMembers(this.lectureCode);
  },

  percentageOfUsersWhoVoted: function() {
    var questionCount = Votes.find({questionId: this._id}).count();
    var memberCount = App.Lectures.getNumberOfMembers(this.lectureCode);
    var percent;

    if (memberCount === 0) {
      return 0;
    }

    percent = questionCount / memberCount * 100;
    return Math.round(percent);
  },

  isAuthor: function() {
    var lecture = Lectures.findOne({lectureCode: this.lectureCode}, {author: true});

    return lecture.author === Meteor.userId();
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
