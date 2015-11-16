Questions = new Mongo.Collection('questions');

Meteor.methods({
  questionInsertAddVote: function(lectureCode, questionText) {
    var lecture, question, questionId, vote;

    check(lectureCode, String);
    check(questionText, String);

    if (questionText.trim().length === 0) {
      throw new Meteor.Error('Not a valid question text');
    }

    // Check if a lecture to this lecture code exists
    lecture = Lectures.findOne({lectureCode: lectureCode});
    if (lecture === undefined) {
      throw new Meteor.Error('Not a valid lecture code');
    }

    question = {
      lectureCode: lectureCode,
      questionText: questionText,
      author: Meteor.userId(),
      submitted: new Date()
    };
    questionId = Questions.insert(question);

    if (isAuthor(lectureCode)) {
      return;
    }

    vote = {
      questionId: questionId,
      lectureCode: lectureCode
    };

    Meteor.call('insertVote', vote, function(error, result) {
      if (error) {
        return alert(error.reason);
      }
    });
  },


  deleteQuestion: function(questionDeleteParams) {
    var lectureCode = questionDeleteParams.lectureCode;
    var questionId = questionDeleteParams.questionId;

    if (!isAuthor(lectureCode)) {
      throw new Meteor.Error('Not the lecture author');
    }

    Questions.remove(questionId);
  }
});
