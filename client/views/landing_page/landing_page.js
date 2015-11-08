Template.landingPage.events({

  /** Go to lecture page */
  'submit form': function(e) {
    e.preventDefault();
    lectureCode = $(e.target).find('#lecture-code-input').val();
    if(possibleLecture(lectureCode)){
      Router.go('lecturePage', {lectureCode: lectureCode});
    }
  },

  /** Create new lecture */
  'click #create-lecture': function (event) {
    event.preventDefault();

    Meteor.call('lectureInsert', function(error, result){
      //Display error
      if(error) {
        return alert(error.reason);
      }

      Router.go('lecturePage', {lectureCode: result.lectureCode});
    });
  },

  /** Make enter button turn green on right lecture code input */
  'keyup #lecture-code-input' : function() {
    var lectureCode = $('#lecture-code-input').val();
    var pLecture = possibleLecture(lectureCode);
    if(pLecture){
      $('#btn-enter-class').addClass('btn-success');
      $('#btn-enter-class').removeClass('disabled');
    }
    else {
      $('#btn-enter-class').removeClass('btn-success');
      $('#btn-enter-class').addClass('disabled');
    }
  }

});

Template.landingPage.rendered = function() {
  $('#landing-page-carousel').carousel({
    interval: 4000
  });
};

/** Check weather a lecture with this lecture code exists in the Lectures collection */
var possibleLecture = function(lectureCode) { 
  return Lectures.findOne({lectureCode: lectureCode});
};
