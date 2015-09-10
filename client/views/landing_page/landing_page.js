Template.landingPage.events({

  /** Go to lecture page */
  'submit form': function(e) {
    e.preventDefault();
    lectureCode = $(e.target).find('#lecture-code-input').val();

    Router.go('lecturePage', {lectureCode: lectureCode});
  },

  /** Create new lecture */
  'click #create-lecture': function (event) {
    event.preventDefault();

    Meteor.call('lectureInsert', function(error, result){
      //Display error
      if(error)
        return alert(error.reason);

      Router.go('lecturePage', {lectureCode: result.lectureCode});
    });
  },

  /** Make enter button turn green on right lecture code input */
  'keyup #lecture-code-input' : function() {
    var possibleLectureID = $('#lecture-code-input').val();
    var possibleLecture = Lectures.findOne({lectureCode: possibleLectureID});
    if(possibleLecture){
      $('#btn-enter-class').addClass('btn-success');
      $('#btn-enter-class').removeClass('disabled');
    }
    else {
      $('#btn-enter-class').removeClass('btn-success');
      $('#btn-enter-class').addClass('disabled');
    }
  }

});
