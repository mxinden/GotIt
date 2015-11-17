"use strict";

describe("Enter lecture", function() {
  var lectureCode = "00007";

  beforeAll(function(done) {
    Fixtures.clearDB(done);
  });

  beforeAll(function(done) {
    Fixtures.createLecture({lectureCode: lectureCode}, done);
  });

  beforeAll(function(done) {
    Router.go("landingPage");
    Tracker.afterFlush(done);
  });

  beforeAll(waitForRouter);

  beforeAll(function(done) {
    $("#lecture-code-input").val(lectureCode);
    $("#btn-enter-lecture").trigger("click");
    waitForElement("#question-text", done);
  });

  it("routes to a lecture page", function() {
    expect(Router._currentRoute.getName()).toEqual("lecturePage");
  });
});
