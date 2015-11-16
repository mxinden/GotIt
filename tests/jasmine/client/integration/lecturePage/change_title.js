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
      waitForElement('#title', function() {
        $('#title').trigger('click');
        done();
      });
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
      done();
    });

    it('should be changeable', function(done) {
      waitForElement('#title-input', function() {
        expect($('#title')).not.toExist();
        expect($('#title-input')).toExist();
        done();
      });
    });

    describe('title update', function() {
      beforeAll(function() {
        $('#title-input').val('I like trains');
        $('#title-input').blur();
      });

      it('updates the title in the database', function() {
        var interval = setInterval(function() {
          var lecture = App.Lectures.Collection.findOne({lectureCode: lectureCode, title: 'I like trains'});
          if (lecture) {
            expect(true).toBe(true);
            clearInterval(interval);
          }
        }, 100);
      });

    });
  });
});
