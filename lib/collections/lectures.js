Lectures = new Mongo.Collection('lectures');


Meteor.methods({

  /* Insert a lecture into the lectures collection */
  lectureInsert: function(){
    var lectureCode = generateUniqueLectureCode();
    var lectureId = Lectures.insert({'lectureCode': lectureCode});
    return {
      _id: lectureId,
      lectureCode: lectureCode
    }; 
  }

});


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

