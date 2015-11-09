Template.lecturePageFooter.events({

  'submit form#create-question': function (event) {
    var lectureCode = this.lectureCode;
    var question = {
      lectureCode: lectureCode,
      questionText: $(event.target).find('#question-text').val()
    };

    event.preventDefault();

    if(question.questionText.replace(/\s/g, '') == ""){
      return;
    }

    Meteor.call('questionInsertAddVote', question, function(error, result){
      if(error) {
        return alert(error);
      }
    });

    event.target.reset();
  },


  'keyup #question-text' : function() {
    var questionText = $('#question-text').val();

    if(questionText.replace(/\s/g, '') == ""){
      $('#btn-create-question').addClass('disabled');
    } else {
      $('#btn-create-question').removeClass('disabled');
    }
  }

});

