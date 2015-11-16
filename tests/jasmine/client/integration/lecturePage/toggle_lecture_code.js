describe('Toggle lecture code', function() {
  var lectureCode = 'AAAAA';

  beforeAll(function(done) {
    Fixtures.clearDB(done);
  });

  beforeAll(function(done) {
    Fixtures.createLecture({lectureCode: lectureCode}, done);
  });

  beforeAll(function(done) {
    Router.go('lecturePage', {lectureCode: lectureCode});
    Tracker.afterFlush(done);
  });

  beforeAll(waitForRouter);

  beforeAll(function(done) {
    waitForElement('#lecture-page', done);
  });

  it('displays the lecture code on load of lecture page', function() {
    expect($('#lecture-page-navbar-lecture-code')).toBeVisible();
  });

  describe('clicking the hide-button', function() {
    beforeAll(function(done) {
      $('#hide-lecture-code').trigger('click');
      Tracker.afterFlush(done);
    });

    it('hides the lecture code', function() {
      expect($('#lecture-page-navbar-lecture-code')).not.toExist();
    });
  });

  describe('clicking the show-button', function() {
    beforeAll(function(done) {
      $('#show-lecture-code').trigger('click');
      Tracker.afterFlush(done);
    });

    it('displays the lecture code again', function() {
      expect($('#lecture-page-navbar-lecture-code')).toBeVisible();
    });
  });
});
