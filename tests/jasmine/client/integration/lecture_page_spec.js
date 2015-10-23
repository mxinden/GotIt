describe("lecturePage", function() {

  var lectureCode = '00000';

  describe("template", function() {

    beforeAll(function(done) {
      Router.go('lecturePage', {lectureCode: lectureCode});
      Tracker.afterFlush(done);
    });
    beforeAll(waitForRouter);

    it("is a lecture page", function() {
      expect(Router.current().route.getName()).toEqual('lecturePage'); 
    });

    describe("header", function() {

      it("shows the right title", function() {
        lectureTitle = Router.current().data().title;
        expect($('#title')[0].innerHTML).toEqual(lectureTitle);
      });

      it("shows at least one present user", function() {
        /** return everything after a colon and a space */
        var reg = new RegExp(/\:\s(.*)/);
        var htmlString = $('#number-members')[0].innerHTML;
        numberMembers = reg.exec(htmlString)[1];
        expect(numberMembers).toBeGreaterThan(0);
      });

    });

    /** Vote the question from fixtures */
    describe("main", function() {

      describe("'Same here' button", function() {

        var amountVotesBefore
          beforeAll(function() {
            amountVotesBefore = Votes.find({lectureCode: lectureCode}).count();
            $('button.btn-vote').click();
          });

        it("creates a new vote in the votes collection", function() {
          var amountVotesAfter = Votes.find({lectureCode: lectureCode}).count();
          expect(amountVotesAfter).toBeGreaterThan(amountVotesBefore);
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
      describe("'Got it!' button", function() {

        var amountVotesBefore;
        beforeAll(function() {
          amountVotesBefore = Votes.find({lectureCode: lectureCode}).count();
          $('button.btn-unvote').click();
        });

        it("deletes the vote in the votes collection", function() {
          var amountVotesAfter = Votes.find({lectureCode: lectureCode}).count();
          expect(amountVotesBefore).toBeGreaterThan(amountVotesAfter);
        });

        it("replaces the 'Got it!' button with the 'Same here' button", function(done) {
          waitForElement('span.question-text', function() {
            expect($('.btn-vote')).toExist();
            expect($('.btn-unvote')).not.toExist();
            done();
          });
        });

      });

    });

    describe("footer", function() {

      it("shows the 'Your question ...' input field", function() {
        expect($('input#question-text')).toExist();
      });

      it("shows the 'Send' button", function() {
        expect($('button#create-question')).toExist();
      });

      /** Insert a new question */
      describe("'Send' button", function() {
        var amountQuestionsBefore;
        var amountVotesBefore;
        var testQuestion = "What is a micro kernel?";

        beforeAll(function(done) {
          amountQuestionsBefore = Questions.find({lectureCode: lectureCode}).count();
          amountVotesBefore = Votes.find({lectureCode: lectureCode}).count();
          $('#question-text').val(testQuestion);
          $('#create-question').click();
          waitForElement('.list-group-item:eq(1) > .btn-unvote', function(){
            done();
          });
        });

        it("creates a new question in the questions collection", function() {
          var amountQuestionsAfter = Questions.find({lectureCode: lectureCode}).count();
          expect(amountQuestionsAfter).toBeGreaterThan(amountQuestionsBefore);
        });

        it("creates a new vote in the votes collection", function() {
          var amountVotesAfter = Votes.find({lectureCode: lectureCode}).count();
          expect(amountVotesAfter).toBeGreaterThan(amountVotesBefore);
        });

        it("adds a new question template with the right title that is voted by the user", function() {
          expect($('span.question-text:contains("'+ testQuestion + '")')).toExist();
          expect($('.list-group-item:eq(1) > .btn-unvote').text()).toEqual("Got it!");
        });

      });

    });

  });

});
