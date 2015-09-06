Template.lecturePageFooter.events({

  /** Create new question */
  'submit form': function (event) { 
    event.preventDefault();
    var lectureCode = this.lectureCode
    var question = {
      'lectureCode': lectureCode, 
      'questionText': $(event.target).find('#question-text').val()
    };

    Meteor.call('questionInsert',question, function(error, result){
    
        if(error){
            return alert(error.reason);
        }else{
            questionId = result; 

            var vote = {
                questionId: questionId,
                lectureCode: lectureCode
            };

            Meteor.call('voteInsert', vote, function(error, result){
                /** Display error */
                if(error)
                    return alert(error.reason);
            });

        }
        
    });
      
      

    event.target.reset();

  }

  
});

