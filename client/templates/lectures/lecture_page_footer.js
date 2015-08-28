Template.lecturePageFooter.events({

  /** Create new question */
  'submit form': function (event) { 
    event.preventDefault();

    var question = {
      'lectureCode': this.lectureCode, 
      'questionText': $(event.target).find('#questionText').val()
    };

    Meteor.call('questionInsert',question, function(error, result){
      /** Display error */
      if(error)
        return alert(error.reason);
    });

    event.target.reset();

  }

  
});

