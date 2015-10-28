describe("Questions on the lecture page", function() {

  var lectureCode = 'sortQuestions';

  beforeAll(function(done) {
    Router.go('lecturePage', {lectureCode: lectureCode});
    Tracker.afterFlush(done);
  });

  beforeAll(waitForRouter);

  beforeAll(function(done) {
    var firstQuestionExists = false;
    var secondQuestionExists = false;
    $('#question-text').val('First');
    $('#create-question').click();
    var checkExist1 = setInterval(function() {
      if($('.question:eq(0)').length == 1) {
        console.log("First");
        firstQuestionExists = true;
        clearInterval(checkExist1);
      }
    }, 100);

    $('#question-text').val('Second');
    $('#create-question').click();
    var checkExist2 = setInterval(function() {
      if(firstQuestionExists && $('.question:eq(1)').length == 1) {
        console.log("Second");
        secondQuestionExists = true;
        clearInterval(checkExist2);
      }
    }, 100);

    var waitForSecondQuestion = setInterval(function() {
      if(secondQuestionExists) {
        console.log("Third");
        $('.question:eq(0) .btn-unvote').click();
        clearInterval(waitForSecondQuestion);
        done();
      }
    }, 100);
  });


  it("reorder when votes are changed", function(done) {
    console.log("Fourth");
    var checkExist = setInterval(function() {
      console.log("Fifth");
      console.log($('.question:eq(1) .btn-vote').length);
      if($('.question:eq(1) .btn-vote').length == 1) {
        expect(true).toBe(true);
        clearInterval(checkExist);
        done();
      }
    }, 100);
  });

});




