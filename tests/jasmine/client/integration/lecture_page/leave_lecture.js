"use strict";

describe("Leaving the lecture", function() {
  var amountVotesBefore;
  var lectureCode = "00001";

  beforeAll(function(done) {
    Fixtures.clearDB(done);
  });

  beforeAll(function(done) {
    Fixtures.createLecture({lectureCode: lectureCode}, done);
  });

  beforeAll(function(done) {
    Router.go("lecturePage", {lectureCode: lectureCode});
    Tracker.afterFlush(done);
  });

  beforeAll(waitForRouter);

  beforeAll(function(done) {
    $("#question-text").val("I am going to leave!");
    $("#btn-create-question").click();
    waitForElement(".btn-unvote", function() {
      amountVotesBefore = App.Votes.Collection.find({lectureCode: lectureCode}).count();
      done();
    });
  });

  beforeAll(function(done) {
    $("#back-button").click();
    waitForElement("#landing-page", done);
  });

  it("deletes all votes from user from lecture in the MongoDB", function() {
    var amountVotesAfter = App.Votes.Collection.find({lectureCode: lectureCode}).count();

    expect(amountVotesAfter).toBeLessThan(amountVotesBefore);
  });

  it("routes back to the landing page", function() {
    expect(Router.current().route.getName()).toEqual("landingPage");
  });

  it("should delete the user from the students array of the lecture", function() {
    var amountStudents = App.Lectures.Collection.findOne({lectureCode: lectureCode}).students.length;

    expect(amountStudents).toEqual(0);
  });
});
