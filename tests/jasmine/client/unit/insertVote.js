"use strict";

describe("insertVote", function() {
  describe("with a wrong questionId", function() {
    var callError, callResult;
    var amountVotesBefore = App.Votes.Collection.find().count();
    var vote = {
      questionId: "NotAnExistingQuestion",
      lectureCode: "00000"
    };

    beforeAll(function(done) {
      Fixtures.clearDB(done);
    });

    beforeAll(function(done) {
      Meteor.subscribe("votes", vote.lectureCode);
      done();
    });

    beforeAll(function(done) {
      Meteor.call("insertVote", vote, function(error, result) {
        callError = error;
        callResult = result;
        done();
      });
    });

    it("throws an error", function() {
      expect(callResult).toBe(undefined);
      expect(callError).not.toBe(undefined);
      expect(callError.error).toEqual("Question for this vote does not exist");
    });

    it("does not create a new vote in the mongodb", function() {
      var amountVotesAfter = App.Votes.Collection.find().count();

      expect(amountVotesBefore).toEqual(amountVotesAfter);
    });
  });
});
