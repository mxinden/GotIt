"use strict";

App.Votes = {};
App.Votes.Collection = new Mongo.Collection('votes');

Meteor.methods({
  /** Insert a new vote into the votes collection */
  insertVote: function(voteAttributes) {
    var vote, voteExists, questionExists;
    check(voteAttributes, {
      questionId: String,
      lectureCode: String
    });

    vote = _.extend(voteAttributes, {
      author: Meteor.userId()
    });

    voteExists = App.Votes.Collection.findOne({author: vote.author,
      questionId: vote.questionId
    });
    if (voteExists !== undefined) {
      throw new Meteor.Error('User has already voted on this question');
    }

    questionExists = App.Questions.Collection.findOne({_id: voteAttributes.questionId});
    if (questionExists === undefined) {
      throw new Meteor.Error('Question for this vote does not exist');
    }

    App.Votes.Collection.insert(vote);
  },

  /** Delete an existing vote from the votes collection */
  deleteVote: function(questionId) {
    check(questionId, String);
    App.Votes.Collection.remove({author: Meteor.userId(), questionId: questionId});
  },

  deleteVotesFromUserFromLecture: function(lectureCode) {
    check(lectureCode, String);
    App.Votes.Collection.remove({author: Meteor.userId(), lectureCode: lectureCode});
  }

});
