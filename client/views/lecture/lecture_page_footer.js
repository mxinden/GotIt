Template.lecturePageFooter.events({

  /** Create new question */
  'submit form': function (event) {
    var lectureCode = this.lectureCode;
    var question = {
      lectureCode: lectureCode,
      questionText: $(event.target).find('#question-text').val()
    };

    event.preventDefault();
    Meteor.call('questionInsertAddVote', question, function(error, result){
      if(error)
        return alert(error);
    });
    event.target.reset();
  },
  'keyup #question-text' : function() {
    var questionText = $('#question-text').val();
    
    if(questionText.replace(/\s/g, '') == ""){
      //$('#create-question').removeClass('btn-success');
      $('#create-question').addClass('disabled');
    }
    else {
      //$('#create-question').addClass('btn-success');
      $('#create-question').removeClass('disabled');
      
    }
  }

});

