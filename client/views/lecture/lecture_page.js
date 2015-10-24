Template.lecturePage.helpers({

  questions: function() {
    var questions =  Questions.find({lectureCode: this.lectureCode}).fetch();

    for (var i = 0; i< questions.length; i++) {
      var question = questions[i];
      var amountVotes = Votes.find({questionId: question._id}).count();
      question.amountVotes = amountVotes;
    }

    questions.sort(function(a,b) {
      return b.amountVotes - a.amountVotes;
    });

    return questions;
  },

});


