Votes = new Mongo.Collection('votes');

Meteor.methods({

  /** Insert a new vote into the votes collection */
  voteInsert: function(voteAttributes){

    check(this.userId, String);
    check(voteAttributes, {
      questionId: String, 
    });

    var vote = _.extend(voteAttributes, {
      author: Meteor.user()
    });

    var voteExists = Votes.findOne({author: vote.author, questionId: vote.questionId});
    if(voteExists){
      return;
    }

    Votes.insert(vote); 
  }
  

});
