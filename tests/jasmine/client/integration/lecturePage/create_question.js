describe("Create a question", function() {
  var amountQuestionsBefore;
  var amountVotesBefore;
  var testQuestion = "What is a micro kernel?";
  var lectureCode;

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
    Router.go('lecturePage', {lectureCode: lectureCode});
    Tracker.afterFlush(done);
  });

  beforeAll(waitForRouter);

  beforeAll(function(done) {
    waitForElement('#lecture-page', function() {
      done();
    });
  });

  beforeAll(function(done) {
    amountQuestionsBefore = Questions.find({lectureCode: lectureCode}).count();
    amountVotesBefore = Votes.find({lectureCode: lectureCode}).count();
    $('#question-text').val(testQuestion);
    $('#create-question').click();
    waitForElement('.question', done);
  });

  it("creates a new question in the questions collection", function() {
    var amountQuestionsAfter = Questions.find({lectureCode: lectureCode}).count();
    expect(amountQuestionsAfter).toEqual(amountQuestionsBefore + 1);
  });

  it("creates a new vote in the votes collection", function() {
    var amountVotesAfter = Votes.find({lectureCode: lectureCode}).count();
    expect(amountVotesAfter).toEqual(amountVotesBefore + 1);
  });

  it("adds a new question template with the right title that is voted by the user", function() {
    expect($('.question-text:contains("'+ testQuestion + '")')).toExist();
    expect($('.btn-unvote').text()).toEqual("Got it!");
  });

});
