Template.singleQuestion.helpers({

  isQuestionVoted: function() {
    return Votes.findOne({
      author: Meteor.userId(),
      questionId: this._id,
    }) !== undefined;
  },

  numberOfVotes: function(){
    return Votes.find({
      questionId: this._id
    }).count(); 
  },

  numberOfUsersInLecture: function() {
    /** Client is only subscribed to presence information of current lecture */
    return Presences.find().count();
  },

  /** Return percentage of users in the current classroom who have voted on this question */ 
  percentageUserVote: function(){
    console.log("Function calles");
    return (Votes.find({questionId: this._id}).count() / Presences.find().count()) * 100; 
  }

});

Template.singleQuestion.events({

  /** Vote a question */
  'click .btn-vote': function () {
    var vote = {
     'questionId': this._id
    }

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
