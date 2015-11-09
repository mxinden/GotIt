
describe("Delete a question", function() {


  var lectureCode;
  var amountQuestionsBefore;
  var testQuestion = "Why is the earth not flat?";

  beforeAll(function(done) {
    Fixtures.clearDB(done);
  });

  beforeAll(function(done) {
    Fixtures.createLecture({author:  Meteor.userId()},function(error, result) {
      lectureCode = result;
      done();
    });
  });


  beforeAll(function(done) {
    Fixtures.createQuestion({lectureCode: lectureCode, questionText: testQuestion },function(error, result) {
      done();
    });
  });

  beforeAll(function(done) {
    Router.go('lecturePage', {lectureCode: lectureCode});
    Tracker.afterFlush(done);

  });

  beforeAll(waitForRouter);



  beforeAll(function(done) {
    waitForElement('.btn-delete-question', done);
  });

  it("shows the question delete button", function() {
    //jasmine.clock().tick( 500  );

    expect('.btn-delete-question').toExist();
  });


  beforeAll(function(done) {
    amountQuestionsBefore = Questions.find({lectureCode: lectureCode}).count();
    jQuery.fx.off = true;

    $('.btn-delete-question').click();

    done();

  });

  it("deletes the question in the questions collection", function() {
    var amountQuestionsAfter = Questions.find({lectureCode: lectureCode}).count();
    expect(amountQuestionsAfter).toEqual(amountQuestionsBefore - 1);
  });

  it("removes the question template", function() {
    setTimeout(function(){    expect('.btn-delete-question').not.toExist();
}, 100);

    //expect($('.question-text:contains("'+ testQuestion + '")')).not.toExist();



  });

  afterAll(function(done) {
    jasmine.clock().uninstall();
    jQuery.fx.off = false;

  });


});

/*
beforeAll(function(done) {
amountQuestionsBefore = Questions.find({lectureCode: lectureCode}).count();
amountVotesBefore = Votes.find({lectureCode: lectureCode}).count();
//$('#create-question').click();
waitForElement('.question', done);
});
*/
