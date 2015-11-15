describe("questionDelete", function() {

  describe("when the user is not the lecture author", function() {

    var callError;
    var callResult;
    var lectureCode;
    var amountQuestionsBefore = Questions.find().count();
    var amountQuestionsAfter;

    var lecture = {
      author: 'Somebody else',
    }

    var question = {
      lectureCode: '00000',
    }
    beforeAll(function(done) {
      Fixtures.clearDB(done);
    });

    beforeAll(function(done) {

      Meteor.subscribe('lecture',question.lectureCode);
      Meteor.subscribe('questions', question.lectureCode);

      done();
    });

    beforeAll(function(done) {
      Fixtures.createLecture(lecture, function(error, result) {
        lectureCode = result;
        done();
      });
    });

    beforeAll(function(done) {
      Fixtures.createQuestion(question,function(error, result){
        question = {
          lectureCode: '00000',
          questionId: result
        }
        done();
      });
    });

    beforeAll(function(done) {
      Meteor.call('deleteQuestion', question, function(error, result) {
        callError = error;
        callResult = result;
        done();
      });
    });


    it('throws an error', function() {
      expect(callResult).toBe(undefined);
      expect(callError).not.toBe(undefined);
      expect(callError.error).toEqual("Not the lecture author");

    });
  });


  describe("when the user is  the lecture author", function() {
    var callError;
    var callResult;
    var lectureCode;
    var amountQuestionsBefore;
    var amountQuestionsAfter;


    var question = {
      lectureCode: '00000',
    }

    beforeAll(function(done) {
      Fixtures.clearDB(done);
    });

    beforeAll(function(done) {
      Meteor.subscribe('lecture',question.lectureCode);
      Meteor.subscribe('questions', question.lectureCode);
      done();
    });

    beforeAll(function(done) {
      var interval = setInterval(function() {
        if(Meteor.userId() != null) {
          Fixtures.createLecture({author: Meteor.userId()}, function(error, result) {
            lectureCode = result;
            done();
          });
        }
      },100);
    });

    beforeAll(function(done) {
      amountQuestionsBefore = Questions.find().count();
      done();
    });

    beforeAll(function(done) {
      Fixtures.createQuestion(question,function(error, result){
        question = {
          lectureCode: '00000',
          questionId: result
        }
        done();
      });
    });

    beforeAll(function(done) {
      Meteor.call('deleteQuestion', question, function(error, result) {
        callError = error;
        callResult = result;
        amountQuestionsAfter = Questions.find().count();
        done();
      });
    });

    it('does not throw an error', function() {
      expect(callError).toBe(undefined);
      expect(amountQuestionsBefore).toEqual(amountQuestionsAfter);
    });
  });
});
