Questions = new Mongo.Collection('questions');

Meteor.methods({
  /** Insert a new question into the questions collection */
  questionInsertAddVote: function(questionAttributes){
    if(questionAttributes.questionText.replace(/\s/g, '') == ""){
      throw new Meteor.Error('Not a valid question text');
      return;
    }

    check(this.userId, String);
    check(questionAttributes, {
      questionText: String,
      lectureCode: String
    });

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
      if(error)
        return alert(error.reason);
    });
  }

});
