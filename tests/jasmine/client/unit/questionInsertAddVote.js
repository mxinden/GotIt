describe('questionInsertAddVote', function() {

  describe('with an empty question text', function() {

    var callError;
    var callResult;
    var amountQuestionsBefore = Questions.find().count();
    var amountQuestionsAfter;

    var question = {
      lectureCode: '00000', 
      questionText: ''
    }

    beforeAll(function(done) {
      Meteor.call('questionInsertAddVote', question, function(error, result) {
        callError = error;
        callResult = result;
        done();
      });
    });

    it('throws an error', function() {
      expect(callResult).toBe(undefined);
      expect(callError).not.toBe(undefined);
    });

    it("does not create a new question in the mongodb", function() {
      amountQuestionsAfter = Questions.find().count();
      expect(amountQuestionsBefore).toEqual(amountQuestionsAfter);
    });  

  });

  describe("with this question text: '  '", function() {

    var callError;
    var callResult;
    var amountQuestionsBefore = Questions.find().count();
    var amountQuestionsAfter;

    var question = {
      lectureCode: '00000', 
      questionText: '  '
    }

    beforeAll(function(done) {
      Meteor.call('questionInsertAddVote', question, function(error, result) {
        callError = error;
        callResult = result;
        done();
      });
    });

    it('throws an error', function() {
      expect(callResult).toBe(undefined);
      expect(callError).not.toBe(undefined);
    });

    it("does not create a new question in the mongodb", function() {
      amountQuestionsAfter = Questions.find().count();
      expect(amountQuestionsBefore).toEqual(amountQuestionsAfter);
    });  

  });

  describe("with a invalid lecture code", function() {

    var callError;
    var callResult;
    var amountQuestionsBefore = Questions.find().count();
    var amountQuestionsAfter;

    var question = {
      lectureCode: 'notAValidLectureCode', 
      questionText: 'Is this a valid lecture code?'
    }

    beforeAll(function(done) {
      Meteor.call('questionInsertAddVote', question, function(error, result) {
        callError = error;
        callResult = result;
        done();
      });
    });

    it("throws an error", function() {
      expect(callResult).toBe(undefined);
      expect(callError).not.toBe(undefined);
      expect(callError.error).toEqual("Not a valid lecture code");
    });

    it("does not create a new question in the mongodb", function() {
      amountQuestionsAfter = Questions.find().count();
      expect(amountQuestionsBefore).toEqual(amountQuestionsAfter);
    });  

  });

});
