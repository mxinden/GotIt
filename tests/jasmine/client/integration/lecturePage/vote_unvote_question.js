describe("Vote unvote question", function() {
  var lectureCode;
  var amountVotesBefore;

  beforeAll(function(done) {
    Fixtures.clearDB(done);
  });

  beforeAll(function(done) {
    Fixtures.createLecture({},function(error, result) {
      lectureCode = result;
      done()
    });
  });

  beforeAll(function(done) {
    Fixtures.createQuestion({}, done);
  });

  beforeAll(function(done) {
    Router.go('lecturePage', {lectureCode: lectureCode});
    Tracker.afterFlush(done);
  });
  beforeAll(waitForRouter);

  describe("Vote question", function() {

    beforeAll(function(done) {
      amountVotesBefore = Votes.find({lectureCode: lectureCode}).count();
      $('button.btn-vote').click();
      waitForElement('.btn-unvote', done);
    });

    it("creates a new vote in the votes collection", function() {
      var amountVotesAfter = Votes.find({lectureCode: lectureCode}).count();
      expect(amountVotesAfter).toEqual(amountVotesBefore + 1);
    });

    it("replaces the 'Same here' button with the 'Got it!' button", function(done) {
      waitForElement('#question-text', function() {
        expect($('.btn-unvote')).toExist();
        expect($('.btn-vote')).not.toExist();
        done();
      });
    });

  });

  /** Unvote the question from fixtures */
  describe("Unvote question", function() {

    var amountVotesBefore;
    beforeAll(function(done) {
      amountVotesBefore = Votes.find({lectureCode: lectureCode}).count();
      $('button.btn-unvote').click();
      waitForElement('.btn-vote', done);
    });

    it("deletes the vote in the votes collection", function() {
      var amountVotesAfter = Votes.find({lectureCode: lectureCode}).count();
      expect(amountVotesBefore).toEqual(amountVotesAfter + 1);
    });

    it("replaces the 'Got it!' button with the 'Same here' button", function(done) {
      waitForElement('.question-text', function() {
        expect($('.btn-vote')).toExist();
        expect($('.btn-unvote')).not.toExist();
        done();
      });
    });

  });

});
