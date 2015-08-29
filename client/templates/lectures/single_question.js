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


