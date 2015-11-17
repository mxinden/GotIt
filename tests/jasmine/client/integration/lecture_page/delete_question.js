"use strict";

describe("Delete a question", function() {
  var lectureCode, amountQuestionsBefore;
  var testQuestion = "Why is the earth not flat?";

  beforeAll(function(done) {
    Fixtures.clearDB(done);
  });

  beforeAll(function(done) {
    Fixtures.createLecture({lecturer: Meteor.userId()}, function(error, result) {
      lectureCode = result;
      done();
    });
  });

  beforeAll(function(done) {
    Fixtures.createQuestion({lectureCode: lectureCode, questionText: testQuestion}, done);
  });

  beforeAll(function(done) {
    Router.go("lecturePage", {lectureCode: lectureCode});
    Tracker.afterFlush(done);
  });

  beforeAll(waitForRouter);

  beforeAll(function(done) {
    waitForElement(".btn-delete-question", done);
  });

  beforeAll(function(done) {
    var interval;

    amountQuestionsBefore = App.Questions.Collection.find({lectureCode: lectureCode}).count();
    $('.btn-delete-question').click();
    interval = setInterval(function() {
      var displayedQuestions = $(".question-text:contains('" + testQuestion + "')");

      if (displayedQuestions.length === 0) {
        clearInterval(interval);
        done();
      }
    }, 100);
  });

  it("deletes the question in the questions collection", function() {
    var amountQuestionsAfter = App.Questions.Collection.find({lectureCode: lectureCode}).count();
    expect(amountQuestionsAfter).toEqual(amountQuestionsBefore - 1);
  });

  it("removes the question template", function() {
    expect($(".question-text:contains('" + testQuestion + "')")).not.toExist();
    expect(".btn-delete-question").not.toExist();
  });
});
