Questions = new Mongo.Collection('questions');

Meteor.methods({
  /** Insert a new question into the questions collection */
  questionInsert: function(questionAttributes){
    check(this.userId, String);
    check(questionAttributes, {
      questionText: String,
      lectureCode: String
    });

    var question = _.extend(questionAttributes, {
      author: Meteor.user(),
      submitted: new Date()
    });

    return Questions.insert(question);
  }
});
