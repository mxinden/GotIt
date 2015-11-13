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
    return getNumberOfMembersInLecture(this.lectureCode);
  },

  percentageOfUsersWhoVoted: function() {
    var questionCount = Votes.find({questionId: this._id}).count();
    var memberCount = getNumberOfMembersInLecture(this.lectureCode);
    var percent = (questionCount / memberCount) * 100;
    return Math.round(percent);
  }
});

Template.question.events({

  'click .btn-vote': function () {
    var vote = {
      questionId: this._id,
      lectureCode: this.lectureCode
    };

    Meteor.call('insertVote', vote, function(error, result){
      /** Display error */
      if(error) {
        return alert(error.reason);
      }
    });
  },

  'click .btn-unvote': function () {
    Meteor.call('deleteVote', this._id, function(error, result){
      /** Display error */
      if(error) {
        return alert(error.reason);
      }
    });
  }
});
