Template.singleQuestion.events({

  /** Vote a question */
  'click .btn-vote': function () {
    var vote = {
     'questionId': this._id
    }

    Meteor.call('voteInsert', vote, function(error, result){
      /** Display error */
      if(error)
        return alert(error.reson);
    });
  }

});


