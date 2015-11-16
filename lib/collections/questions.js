Questions = new Mongo.Collection('questions');

Meteor.methods({
  insertQuestion: function(lectureCode, questionText) {
    var lecture, question;

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
    return Questions.insert(question);
  },

  deleteQuestion: function(questionDeleteParams) {
    var lectureCode = questionDeleteParams.lectureCode;
    var questionId = questionDeleteParams.questionId;

    if (!App.Lectures.isAuthor(lectureCode)) {
      throw new Meteor.Error('Not the lecture author');
    }

    Questions.remove(questionId);
  }
});
