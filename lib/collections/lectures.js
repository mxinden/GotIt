var generateUniqueLectureCode;

Lectures = new Mongo.Collection('lectures');

"use strict";

App.Lectures = {};

Meteor.methods({
  insertLecture: function() {
    var lectureCode = generateUniqueLectureCode();
    var lectureId = Lectures.insert({
      author: Meteor.userId(),
      lectureCode: lectureCode,
      title: 'new lecture'
    });

    return {
      _id: lectureId,
      lectureCode: lectureCode
    };
  },

  insertMember: function(lectureCode) {
    Lectures.update({lectureCode: lectureCode}, {$addToSet: {members: Meteor.userId()}});
  },

  // Update Lecture title
  setTitle: function(lectureCode, title) {
    check(lectureCode, String);
    check(title, String);

    if (isAuthorOfLecture(lectureCode)) {
      Lectures.update({lectureCode: lectureCode}, {$set: {title: title}});
    } else {
      throw new Meteor.Error('Not the author of this lecture');
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
      Lectures.update({lectureCode: lectureCode}, {$pull: {members: {$in: [Meteor.userId()]}}});
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
    lectureWithSameCode = Lectures.findOne({lectureCode: suggestedLectureCode});
  } while (lectureWithSameCode);

  return suggestedLectureCode;
};

isAuthorOfLecture = function(lectureCode) {
  var lecture = Lectures.findOne({lectureCode: lectureCode}, {author: true});

  if (!lecture) {
    throw new Meteor.Error('Lecture not found');
  } else {
    return lecture.author === Meteor.userId();
  }
};

App.Lectures.getNumberOfMembers = function(lectureCode) {
  var lecture = Lectures.findOne({lectureCode: lectureCode}, {members: true, author: true});
  var author = Lectures.findOne({lectureCode: lectureCode, members: lecture.author}, {author: true});

  if (author !== undefined) {
    return lecture.members.length - 1;
  }
  return lecture.members.length;
};

