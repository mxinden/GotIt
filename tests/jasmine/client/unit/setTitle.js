"use strict";

describe('setTitle', function() {
  var oldLectureTitle = 'Old lecture title';
  var newLectureTitle = 'New lecture title';

  describe('of not own lecture', function() {
    var callError;
    var lectureCode = '00001';
    var lecture = {
      title: oldLectureTitle,
      lectureCode: lectureCode
    };

    beforeAll(function(done) {
      Fixtures.clearDB(done);
    });

    beforeAll(function(done) {
      async.series([
        function() {
          var interval = setInterval(function() {
            if (Meteor.userId() !== null) {
              clearInterval(interval);
            }
          }, 100);
        },

        Fixtures.createLecture(lecture, function(error, result) {
          lectureCode = result;
        }),

        Meteor.call('setTitle', lectureCode, newLectureTitle, function(error) {
          callError = error;
        }),

        done()
      ]);
    });

    beforeAll(function(done) {
      var interval;

      Meteor.subscribe('lecture', lectureCode);
      interval = setInterval(function() {
        var foundLecture = Lectures.findOne({lectureCode: lectureCode});

        if (foundLecture) {
          clearInterval(interval);
          done();
        }
      }, 100);
    });


    it('returns an error', function() {
      expect(callError).not.toBe(undefined);
      expect(callError.error).toEqual('Not the author of this lecture');
    });

    it('does not change the name of the lecture in the db', function() {
      var foundLecture = Lectures.findOne({lectureCode: lectureCode});

      expect(foundLecture.title).toEqual(oldLectureTitle);
    });
  });

  describe('of own lecture', function() {
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
      var interval;

      Meteor.subscribe('lecture', '00000');
      interval = setInterval(function() {
        var foundLecture = Lectures.findOne({lectureCode: lectureCode});

        if (foundLecture) {
          clearInterval(interval);
          done();
        }
      }, 100);
    });

    beforeAll(function(done) {
      Meteor.call('setTitle', lectureCode, newLectureTitle, function(error) {
        callError = error;
        done();
      });
    });

    it('returns no error', function() {
      expect(callError).toBe(undefined);
    });

    it('changes the name of the lecture in the db', function() {
      var lecture = Lectures.findOne({lectureCode: lectureCode});
      expect(lecture.title).toEqual(newLectureTitle);
    });
  });
});
