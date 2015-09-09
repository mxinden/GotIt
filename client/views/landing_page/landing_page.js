Template.landingPage.events({

  /* Go to lecture page */
  'submit form': function(e) {
    e.preventDefault();
    lectureCode = $(e.target).find('#lecture-id').val();

    Router.go('lecturePage', {lectureCode: lectureCode});
  },

  /* Create new lecture */
  'click #createClassroom': function (event) {
    event.preventDefault();

    Meteor.call('lectureInsert', function(error, result){
      //Display error
      if(error)
        return alert(error.reason);

      Router.go('lecturePage', {lectureCode: result.lectureCode});
    });
  },

    'keyup #lecture-id' : function() {
      console.log("Something changed");
      var possibleLectureID = $('#lecture-id').val();
      console.log("possibleLectureID: " + possibleLectureID);
      var possibleLecture = Lectures.findOne({lectureCode: possibleLectureID});
      if(possibleLecture){
        $('#btn-enter-lecture').removeClass('btn-danger');
        $('#btn-enter-lecture').removeClass('btn-default');
        $('#btn-enter-lecture').addClass('btn-success');
        $('button').prop('disabled',false); 
        console.log("FOUND");
      }
      else {
        $('#btn-enter-lecture').removeClass('btn-success');
        $('#btn-enter-lecture').removeClass('btn-default');
        $('#btn-enter-lecture').addClass('btn-danger');
        $('button').prop('disabled',true);
        console.log("Not FOUND");
      }
    },



});
