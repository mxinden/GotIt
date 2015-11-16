"use strict";

Template.lecturePageFooter.events({

  'submit form#create-question': function(event) {
    var questionId;
    var lectureCode = this.lectureCode;
    var questionText = $(event.target).find('#question-text').val();

    event.preventDefault();

    if (questionText.replace(/\s/g, '') === "") {
      return;
    }

    Meteor.call('insertQuestion', lectureCode, questionText, function(error, result) {
      var vote;
      var questionId = result;

      if (App.Lectures.isAuthor(lectureCode)) {
        return;
      }

      vote = {
        questionId: questionId,
        lectureCode: lectureCode
      };

      Meteor.call('insertVote', vote);
    });
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

