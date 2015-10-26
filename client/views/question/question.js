Template.question.helpers({
  votedByMe: function() {
    return Votes.findOne({
      author: Meteor.userId(),
      questionId: this._id,
    }) !== undefined;
  },

  numberOfVotes: function() {
    return Votes.find({
      questionId: this._id
    }).count();
  },

  numberMembers: function() {
   return getNumberOfMembersInLecture(this.lectureCode);
  },

  /** Return percentage of users in the current classroom who have voted on this question */ 
  percentageUserVote: function() {
    var questionCount = Votes.find({questionId: this._id}).count();
    var memberCount = getNumberOfMembersInLecture(this.lectureCode);
    var percent = (questionCount / memberCount) * 100;
    return Math.round(percent);
  }
});

Template.question.events({
  /** Vote a question */
  'click .btn-vote': function () {
    var vote = {
      questionId: this._id,
      lectureCode: this.lectureCode
    };

    Meteor.call('voteInsert', vote, function(error, result){
      /** Display error */
      if(error)
        return alert(error.reason);
    });
  },

  /** Unvote a question */
  'click .btn-unvote': function () {
    Meteor.call('voteDelete', this._id, function(error, result){
      /** Display error */
      if(error)
        return alert(error.reason);
    });
  }
});

//Template.question.rendered = function() {
 // this.$('.question').hide().fadeIn(500);
//}
