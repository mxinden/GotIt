"use strict";

var generateUniqueLectureCode;

App.Lectures = {};
App.Lectures.Collection = new Mongo.Collection('lectures');

Meteor.methods({
  insertLecture: function() {
    var lectureCode = generateUniqueLectureCode();
    var lectureId = App.Lectures.Collection.insert({
      lecturer: Meteor.userId(),
      lectureCode: lectureCode,
      title: 'new lecture',
      students: []
    });

    return {
      _id: lectureId,
      lectureCode: lectureCode
    };
  },

  insertStudent: function(lectureCode) {
    App.Lectures.Collection.update({lectureCode: lectureCode}, {$addToSet: {students: Meteor.userId()}});
  },

  // Update Lecture title
  setTitleOfLecture: function(lectureCode, title) {
    check(lectureCode, String);
    check(title, String);

    if (App.Lectures.isLecturer(lectureCode)) {
      App.Lectures.Collection.update({lectureCode: lectureCode}, {$set: {title: title}});
    } else {
      throw new Meteor.Error('Not the lecturer of this lecture');
    }
  },

  removeCurrentUserFromLecture: function(lectureCode) {
    check(lectureCode, String);

    /**
     * '$in' operator is unknown in MiniMongo, without '$in' deletion is not
     * possible in Meteor, only in MongoDB console. Thereby Meteor method only
     * on server side.
    */
    if (Meteor.isServer) {
      App.Lectures.Collection.update({lectureCode: lectureCode}, {$pull: {students: {$in: [Meteor.userId()]}}});
    }
  }
});

generateUniqueLectureCode = function() {
  // Generate a random lecture code
  var generateLectureCode = function() {
    var i;
    var lectureCodeLength = 5;
    var lectureCode = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (i = 0; i < lectureCodeLength; i++) {
      lectureCode += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return lectureCode;
  };
  var suggestedLectureCode, lectureWithSameCode;

  do {
    suggestedLectureCode = generateLectureCode();
    lectureWithSameCode = App.Lectures.Collection.findOne({lectureCode: suggestedLectureCode});
  } while (lectureWithSameCode);

  return suggestedLectureCode;
};

App.Lectures.isLecturer = function(lectureCode) {
  var lecture = App.Lectures.Collection.findOne({lectureCode: lectureCode}, {lecturer: true});

  if (lecture) {
    return lecture.lecturer === Meteor.userId();
  }
};

App.Lectures.getNumberOfStudents = function(lectureCode) {
  var lecture = App.Lectures.Collection.findOne({lectureCode: lectureCode}, {students: true});
  if (lecture) {
    return lecture.students.length;
  }
};


App.Lectures.leaveLecture = function(lectureCode) {
  Meteor.call('deleteVotesFromUserFromLecture', lectureCode);
  Meteor.call('removeCurrentUserFromLecture', lectureCode);

  Router.go('landingPage');
  /* reset the page top padding when returning to the landing page
   * as the CSS of the body does not refresh */
  Tracker.afterFlush(function() {
    App.updateNavbarCSS();
  });
};
