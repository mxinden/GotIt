Questions = new Mongo.Collection('questions');

Meteor.methods({
  /** Insert a new question into the questions collection */
  questionInsertAddVote: function(questionAttributes){
    if(questionAttributes.questionText.replace(/\s/g, '') == ""){
      throw new Meteor.Error(500, 'No question text');

      return;
    }

    check(this.userId, String);
    check(questionAttributes, {
      questionText: String,
      lectureCode: String
    });

    var question = _.extend(questionAttributes, {
      author: Meteor.userId(),
      submitted: new Date()
    });

    questionId = Questions.insert(question);

    var vote = {
      questionId: questionId,
      lectureCode: questionAttributes.lectureCode
    };

    Meteor.call('voteInsert', vote, function(error, result){
      /** Display error */
      if(error)
        return alert(error.reason);
    });
  }

});
