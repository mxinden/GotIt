describe("Leaving the lecture", function() {

  var lectureCode = '00001';

  beforeAll(function(done) {
    Fixtures.clearDB(done);
  });

  beforeAll(function(done) {
    Fixtures.createLecture({lectureCode: lectureCode}, function(){
      done();
    });
  });

  beforeAll(function(done) {
    Router.go('lecturePage', {lectureCode: lectureCode});
    Tracker.afterFlush(done);
  });

  beforeAll(waitForRouter);

  /** Create a new question and thereby a new vote */
  beforeAll(function(done) {
    $('#question-text').val('I am going to leave!');
    $('#create-question').click();
    waitForElement('.btn-unvote', function() {
      amountVotesBefore = Votes.find({lectureCode: lectureCode}).count();
      done();
    });
  });

  /** Leave the lecture */
  beforeAll(function(done) {
    $('#back-button').click();
    waitForElement('#landing-page', function() {
      done();
    });
  });

  it("Deletes all votes from user from lecture in the MongoDB", function() {
    amountVotesAfter = Votes.find({lectureCode: lectureCode}).count();
    expect(amountVotesAfter).toBeLessThan(amountVotesBefore);
  });

  it("Routes back to the landing page", function() {
    expect(Router.current().route.getName()).toEqual('landingPage'); 
  });

  it("Should delete the user from the members array of the lecture", function() {
    amountMembers = Lectures.findOne({lectureCode: lectureCode}).members.length;
    expect(amountMembers).toEqual(0);
  });

});
