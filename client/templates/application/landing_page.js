Template.landingPage.events({

  /* Go to lecture page */
  'submit form': function(e) {
    e.preventDefault();
    lectureID = $(e.target).find('#lectureID').val();

    Router.go('lecturePage', {_id: lectureID});
  },

  /* Create new lecture */
  'click #createClassroom': function (event) {
    event.preventDefault();

    Meteor.call('lectureInsert', function(error, result){
      //Display error
      if(error)
        return alert(error.reason);
      
      Router.go('lecturePage', {_id: result._id});
    });
  }

});
