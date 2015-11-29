"use strict";

describe("Questions sort by amount of votes", function() {
  var lectureCode;

  beforeAll(function(done) {
    Fixtures.clearDB(done);
  });

  beforeAll(function(done) {
    Fixtures.createLecture({}, function(error, result) {
      lectureCode = result;
      done();
    });
  });

  beforeAll(function(done) {
    Fixtures.createQuestion({questionText: 'First'}, done);
  });

  beforeAll(function(done) {
    Fixtures.createQuestion({questionText: 'Second', _id: '11111111111111111'}, done);
  });

  beforeAll(function(done) {
    Router.go('lecturePage', {lectureCode: lectureCode});
    Tracker.afterFlush(done);
  });

  beforeAll(waitForRouter);

  beforeAll(function(done) {
    waitForElement('#lecture-page', done);
  });

  beforeAll(function(done) {
    var interval;

    $('.question:eq(0) .btn-unvote').click();
    interval = setInterval(function() {
      if ($('.question:eq(1) .btn-vote').length === 1) {
        clearInterval(interval);
        done();
      }
    }, 100);
  });

  it("reorders the questions when votes are changed", function() {
    expect(true).toBe(true);
  });
});
