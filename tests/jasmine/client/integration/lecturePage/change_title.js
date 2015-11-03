describe('Change class room title', function() {
  beforeAll(function(done) {
    Fixtures.clearDB(done);
  });

  describe('for non authors', function() {
    var lectureCode = 'AAAAA';

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

    beforeAll(function(done) {
      $('#title').trigger('click');
      setInterval(done, 100);
    });

    it('should not be changeable', function() {
      expect($('#title-input')).not.toExist();
    });
  });

  describe('for authors', function() {
    var lectureCode = 'BBBBB';

    beforeAll(function(done) {
      Fixtures.createLecture({
        lectureCode: lectureCode,
        author: Meteor.userId()
      }, done);
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
      $('#title').trigger('click');
      setInterval(done, 100);
    });

    it('should be changeable', function() {
      expect($('#title')).not.toExist();
      expect($('#title-input')).toExist();
    });

    describe('title update', function() {
      beforeAll(function(done) {
        $('#title-input').val('I like trains');
        $('#title-input').blur();
        setTimeout(done, 100);
      });

      it('updates the title in the database', function() {
        var lecture = Lectures.findOne({lectureCode: lectureCode});

        expect(lecture.title).toEqual('I like trains');
      });
    });
  });
});
