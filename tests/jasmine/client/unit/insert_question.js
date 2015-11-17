"use strict";

describe('insertQuestion', function() {
  beforeAll(function(done) {
    Fixtures.clearDB(done);
  });

  describe('with an empty question text', function() {
    var callError, callResult;
    var amountQuestionsBefore = App.Questions.Collection.find().count();
    var lectureCode = 'Irrelevant in this spec';
    var questionText = '';

    beforeAll(function(done) {
      Meteor.call('insertQuestion', lectureCode, questionText, function(error, result) {
        callError = error;
        callResult = result;
        done();
      });
    });

    it('throws an error', function() {
      expect(callResult).toBe(undefined);
      expect(callError).not.toBe(undefined);
      expect(callError.error).toEqual("Not a valid question text");
    });

    it("does not create a new question in the mongodb", function() {
      var amountQuestionsAfter = App.Questions.Collection.find().count();

      expect(amountQuestionsBefore).toEqual(amountQuestionsAfter);
    });
  });

  describe("with this question text: '  '", function() {
    var callError, callResult;
    var amountQuestionsBefore = App.Questions.Collection.find().count();
    var lectureCode = 'Irrelevant in this spec';
    var questionText = '  ';

    beforeAll(function(done) {
      Meteor.call('insertQuestion', lectureCode, questionText, function(error, result) {
        callError = error;
        callResult = result;
        done();
      });
    });

    it('throws an error', function() {
      expect(callResult).toBe(undefined);
      expect(callError).not.toBe(undefined);
      expect(callError.error).toEqual("Not a valid question text");
    });

    it("does not create a new question in the mongodb", function() {
      var amountQuestionsAfter = App.Questions.Collection.find().count();

      expect(amountQuestionsBefore).toEqual(amountQuestionsAfter);
    });
  });

  describe("with an invalid lecture code", function() {
    var callError, callResult;
    var amountQuestionsBefore = App.Questions.Collection.find().count();
    var lectureCode = 'Not existing lecture';
    var questionText = 'Is this a valid lecture code?';

    beforeAll(function(done) {
      Meteor.call('insertQuestion', lectureCode, questionText, function(error, result) {
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
      var amountQuestionsAfter = App.Questions.Collection.find().count();

      expect(amountQuestionsBefore).toEqual(amountQuestionsAfter);
    });
  });
});
