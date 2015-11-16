Questions = new Mongo.Collection('questions');

Meteor.methods({
  questionInsertAddVote: function(questionAttributes) {
    var lecture, question, questionId, vote;

    check(questionAttributes, {
      questionText: String,
      lectureCode: String
    });

    if(questionAttributes.questionText.trim().length === 0) {
      throw new Meteor.Error('Not a valid question text');
    }

    // Check if a lecture to this lecture code exists
    lecture = Lectures.findOne({lectureCode: questionAttributes.lectureCode});
    if (lecture === undefined) {
      throw new Meteor.Error('Not a valid lecture code');
    }

    question = _.extend(questionAttributes, {
      author: Meteor.userId(),
      submitted: new Date()
    });
    questionId = Questions.insert(question);

    if (isAuthor(questionAttributes.lectureCode)) {
      return;
    }

    vote = {
      questionId: questionId,
      lectureCode: questionAttributes.lectureCode
    };

    Meteor.call('insertVote', vote, function(error, result) {
      if (error) {
        return alert(error.reason);
      }
    });
  },


  deleteQuestion: function(questionDeleteParams) {
    var lectureCode = questionDeleteParams.lectureCode;
    var questionId  = questionDeleteParams.questionId;

    if (!isAuthor(lectureCode)) {
      throw new Meteor.Error('Not the lecture author');
    }

    Questions.remove(questionId);
  }
});
