"use strict";

describe("deleteQuestion", function() {
  beforeAll(function(done) {
    Fixtures.clearDB(done);
  });

  describe("when the user is not the lecturer of the lecture", function() {
    var callError, callResult, amountQuestionsBefore;
    var lecture = {
      lectureCode: '00000',
      lecturer: 'Somebody else'
    };
    var question = {
      lectureCode: lecture.lectureCode
    };

    beforeAll(function(done) {
      Meteor.subscribe('lecture', lecture.lectureCode, done);
    });

    beforeAll(function(done) {
      Meteor.subscribe('questions', lecture.lectureCode, done);
    });

    beforeAll(function(done) {
      Fixtures.createLecture(lecture, done);
    });

    beforeAll(function(done) {
      Fixtures.createQuestion(question, function(error, result) {
        question.questionId = result;
        done();
      });
    });

    beforeAll(function(done) {
      amountQuestionsBefore = App.Questions.Collection.find().count();
      Meteor.call('deleteQuestion', question, function(error) {
        callError = error;
        done();
      });
    });

    it('throws an error', function() {
      expect(callResult).toBe(undefined);
      expect(callError).not.toBe(undefined);
      expect(callError.error).toEqual('Not the lecturer of this lecture');
    });

    it("does not change the number of questions", function() {
      var amountQuestionsAfter = App.Questions.Collection.find().count();

      expect(amountQuestionsBefore).toEqual(amountQuestionsAfter);
    });
  });

  describe("when the user is the lecturer of the lecture", function() {
    var callError, amountQuestionsBefore;
    var lecture = {
      lectureCode: '11111'
    };
    var question = {
      _id: '12345678901234567',
      lectureCode: lecture.lectureCode
    };

    beforeAll(function(done) {
      Meteor.subscribe('lecture', lecture.lectureCode);
      Meteor.subscribe('questions', lecture.lectureCode);
      done();
    });

    beforeAll(function(done) {
      var interval = setInterval(function() {
        if (Meteor.userId() !== null) {
          clearInterval(interval);
          lecture.lecturer = Meteor.userId();
          Fixtures.createLecture(lecture, done);
        }
      }, 100);
    });

    beforeAll(function(done) {
      Fixtures.createQuestion(question, function(error, result) {
        amountQuestionsBefore = App.Questions.Collection.find().count();
        question.questionId = result;
        done();
      });
    });

    beforeAll(function(done) {
      Meteor.call('deleteQuestion', question, function(error) {
        callError = error;
        done();
      });
    });

    it('does not throw an error', function() {
      expect(callError).toBe(undefined);
    });

    it("decreases the amount of questions", function() {
      var amountQuestionsAfter = App.Questions.Collection.find().count();

      expect(amountQuestionsBefore).toEqual(amountQuestionsAfter + 1);
    });
  });
});
