"use strict";

Template.lecturePageFooter.events({

  'submit form#create-question': function(event) {
    var lectureCode = this.lectureCode;
    var questionText =  $(event.target).find('#question-text').val()

    event.preventDefault();

    if (questionText.replace(/\s/g, '') === "") {
      return;
    }

    Meteor.call('insertQuestion', lectureCode, questionText);
    event.target.reset();
  },


  'keyup #question-text': function() {
    var questionText = $('#question-text').val();

    if (questionText.replace(/\s/g, '') === "") {
      $('#btn-create-question').addClass('disabled');
    } else {
      $('#btn-create-question').removeClass('disabled');
    }
  }

});

