var lectureCode = '00000';

describe("lecturePage", function() {

  describe("template", function() {

    beforeAll(function(done) {
      Router.go('lecturePage', {lectureCode: lectureCode});
      Tracker.afterFlush(done);
    });
    beforeAll(waitForRouter);

    describe("footer", function() {

      describe("'Send' button", function() {
        var amountQuestionsBefore;
        var testQuestion = "  m ";

        beforeAll(function() {
          amountQuestionsBefore = Questions.find({lectureCode: lectureCode}).count();
          $('#question-text').val(testQuestion);
          $('#create-question').click();
        });

        it("prevent question without text from being created in the collection", function() {
          var amountQuestionsAfter = Questions.find({lectureCode: lectureCode}).count();
          expect(amountQuestionsAfter).toEqual(amountQuestionsBefore);
        });

      });

    });

  });

});
