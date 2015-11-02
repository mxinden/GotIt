describe("Questions on the lecture page", function() {

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
    Fixtures.createQuestion({questionText: 'First'}, function(error, result) {
      done();
    });
  });
  beforeAll(function(done) {
    Fixtures.createQuestion({questionText: 'Second', _id: '11111111111111111'}, function(error, result) {
      done();
    });
  });

  beforeAll(function(done) {
    Router.go('lecturePage', {lectureCode: lectureCode});
    Tracker.afterFlush(done);
  });

  beforeAll(waitForRouter);

  beforeAll(function(done) {
    $('.question:eq(0) .btn-unvote').click();
    var checkExist = setInterval(function() {
      if($('.question:eq(1) .btn-vote').length == 1) {
        clearInterval(checkExist);
        done();
      }
    }, 100);
  });

  it("reorder when votes are changed", function() {
    expect(true).toBe(true);
  });

});
