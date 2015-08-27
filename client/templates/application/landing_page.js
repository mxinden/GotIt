Template.landingPage.events({

  /* Go to lecture page */
  'submit form': function(e) {
    e.preventDefault();
    lectureID = $(e.target).find('#lectureID').val();

    Router.go('lecturePage', {_id: lectureID});
  }

});
