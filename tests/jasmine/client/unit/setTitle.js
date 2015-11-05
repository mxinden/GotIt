describe('setTitle', function() {

  var oldLectureTitle = "Old lecture title";
  var newLectureTitle = "New lecture title";

  describe("of not own lecture", function() {

    var lectureCode, callError;

    beforeAll(function(done) {
      Fixtures.clearDB(done);
    });

    beforeAll(function(done) {
      Fixtures.createLecture({title: oldLectureTitle}, function(error, result) {
        lectureCode = result;
        done();
      });
    });

    beforeAll(function(done) {
      Meteor.subscribe('lecture', '00000');
      interval = setInterval(function() {
        lecture = Lectures.findOne({lectureCode: lectureCode});
        if(lecture) {
          clearInterval(interval);
          done();
        }
      }, 100);
    });

    beforeAll(function(done) {
      Meteor.call('setTitle', lectureCode, newLectureTitle, function(error, result) {
        callError = error;
        console.log('error and result'+ error + ' ' + result);
        done();
      });
    });

    it("returns an error", function() {
      expect(callError).not.toBe(undefined);
    });

    it("does not change the name of the lecture in the db", function() {
      var lecture = Lectures.findOne({lectureCode: lectureCode});
      expect(lecture.title).toEqual(oldLectureTitle);
    });

  });

  describe("of own lecture", function() {

    var lectureCode, callError;

    beforeAll(function(done) {
      Fixtures.clearDB(done);
    });

    beforeAll(function(done) {
      Fixtures.createLecture({author: Meteor.userId(), title: oldLectureTitle}, function(error, result) {
        lectureCode = result;
        done();
      });
    });

    beforeAll(function(done) {
      Meteor.subscribe('lecture', '00000');
      interval = setInterval(function() {
        lecture = Lectures.findOne({lectureCode: lectureCode});
        if(lecture) {
          clearInterval(interval);
          done();
        }
      }, 100);
    });

    beforeAll(function(done) {
      Meteor.call('setTitle',lectureCode, newLectureTitle, function(error, result) {
        callError = error;
        done();
      });
    });

    it("returns no error", function() {
      expect(callError).toBe(undefined);
    });

    it("changes the name of the lecture in the db", function() {
      var lecture = Lectures.findOne({lectureCode: lectureCode});
      expect(lecture.title).toEqual(newLectureTitle);
    });

  });

});
