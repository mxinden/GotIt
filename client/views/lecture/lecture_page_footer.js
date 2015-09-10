Template.lecturePageFooter.events({

  /** Create new question */
  'submit form': function (event) { 
    event.preventDefault();
    var lectureCode = this.lectureCode
      var question = {
        'lectureCode': lectureCode, 
        'questionText': $(event.target).find('#question-text').val()
      };
    Meteor.call('questionInsertAddVote',question, function(error, result){
      if(error)
        return alert(error.reason);
    });
    event.target.reset();
  }

});

