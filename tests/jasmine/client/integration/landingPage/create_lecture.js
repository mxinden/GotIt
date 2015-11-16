describe("Create lecture", function() {
  var amountLecturesBefore = App.Lectures.Collection.find().count();

  beforeAll(function(done) {
    Fixtures.clearDB(done);
  });

  beforeAll(function(done) {
    Router.go('landingPage');
    Tracker.afterFlush(done);
  });

  beforeAll(waitForRouter);

  beforeAll(function(done) {
    waitForElement('#landing-page', function() {
      done();
    });
  });

  beforeAll(function(done) {
    $('#create-lecture').click();
    waitForElement('#question-text', function() {
      done();
    });
  });

  it("routes to a lecture", function() {
    expect(Router.current().route.getName()).toEqual('lecturePage');
  });

  it("creates an new lecture document in the lectures collection", function() {
    var amountLecturesAfter = App.Lectures.Collection.find().count();
    expect(amountLecturesAfter).toEqual(amountLecturesBefore + 1);
  });

});
