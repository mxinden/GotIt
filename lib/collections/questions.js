Questions = new Mongo.Collection('questions');

Meteor.methods({
  /** Insert a new question into the questions collection */
  questionInsertAddVote: function(questionAttributes){

    check(questionAttributes, {
      questionText: String,
      lectureCode: String
    });

    if(questionAttributes.questionText.trim().length === 0){
      throw new Meteor.Error('Not a valid question text');
    }

    /** Check if a lecture to this lecture code exists */
    lecture = Lectures.findOne({lectureCode: questionAttributes.lectureCode});
    if(lecture == undefined) {
      throw new Meteor.Error('Not a valid lecture code');
      return;
    }

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
      if(error) {
        return alert(error.reason);
      }
    });
  }

});
