Votes = new Mongo.Collection('votes');

"use strict";

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

    voteExists = Votes.findOne({author: vote.author,
      questionId: vote.questionId
    });
    if (voteExists !== undefined) {
      throw new Meteor.Error('User has already voted on this question');
    }

    questionExists = Questions.findOne({_id: voteAttributes.questionId});
    if (questionExists === undefined) {
      throw new Meteor.Error('Question for this vote does not exist');
    }

    Votes.insert(vote);
  },

  /** Delete an existing vote from the votes collection */
  deleteVote: function(questionId) {
    check(questionId, String);
    Votes.remove({author: Meteor.userId(), questionId: questionId});
  },

  deleteVotesFromUserFromLecture: function(lectureCode) {
    check(lectureCode, String);
    Votes.remove({author: Meteor.userId(), lectureCode: lectureCode});
  }

});
