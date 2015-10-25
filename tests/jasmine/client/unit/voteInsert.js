describe('voteInsert', function() {

  describe('with a wrong questionId', function() {

    var callError;
    var callResult;
    var amountVotesBefore = Votes.find().count();
    var amountVotesAfter = Votes.find().count();

    var vote = {
      questionId: 'NotAnExistingQuestion', 
      lectureCode: '00000'
    }

    beforeAll(function(done) {
      Meteor.call('voteInsert', vote, function(error, result) {
        callError = error;
        callResult = result;
        done();
      });
    });

    it('throws an error', function() {
      expect(callResult).toBe(undefined);
      expect(callError).not.toBe(undefined);
      expect(callError.error).toEqual('Question for this vote does not exist');
    });

    it("does not create a new question in the mongodb", function() {
      var amountVotesAfter = Votes.find().count();
      expect(amountVotesBefore).toEqual(amountVotesAfter);
    });  

  });

});
