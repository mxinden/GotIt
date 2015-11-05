Lectures = new Mongo.Collection('lectures');


Meteor.methods({

  /** Insert a new lecture into the lectures collection */
  lectureInsert: function() {
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

  /** Insert a new member to the members of a lecture */
  insertMember: function(lectureCode) {
    var userId = Meteor.userId();
    Lectures.update({lectureCode: lectureCode}, {$addToSet: {members: userId}});
  },

  // Update Lecture title
  setTitleOfLecture: function(lectureCode, title) {
    check(lectureCode, String);
    check(title, String);
    if (isLectureOwner(lectureCode, Meteor.userId()))
      Lectures.update({lectureCode: lectureCode}, {$set: {title: title}});
    else
      throw new Meteor.Error('Not the author of this lecture');
    return;
  },

  /** Delete a certain member from members of lecture */
  deleteMember: function(lectureCode) {
    check(lectureCode, String);
    /**
     * '$in' operator is unknown in MiniMongo, without '$in' deletion is not
     * possible in Meteor, only in MongoDB console. Thereby Meteor method only
     * on server side. 
    */
    if(Meteor.isServer){
      var userId = Meteor.userId();
      Lectures.update({lectureCode:lectureCode}, {$pull: {members: {$in: [userId]}}});
    }
  }
});

var isLectureOwner = function(lectureCode, userId) {
  lecture = Lectures.findOne({lectureCode: lectureCode});
  if(!lecture)
    throw new Meteor.Error('Lecture not found');
  else
    return lecture.author == userId;
};

var generateUniqueLectureCode = function(){
  do {
    var suggestedLectureCode = generateLectureCode(); 
    var lectureWithSameCode = Lectures.findOne({lectureCode: suggestedLectureCode});
  }  while (lectureWithSameCode);
  return suggestedLectureCode;
}


/* Generate a random lecture code */
var generateLectureCode = function(){
  var lectureCodeLength = 5;
  var lectureCode = "";
  var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

  for(var i = 0 ; i < lectureCodeLength; i++){
    lectureCode += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return lectureCode;
}

