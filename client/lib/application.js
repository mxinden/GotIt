getNumberOfMembersInLecture =  function(lectureCode) {

   lecture = Lectures.findOne({lectureCode: lectureCode}, {members: true, lectureCreator: true});
   lectureCreator = Lectures.findOne({lectureCode: lectureCode,members: lecture.lectureCreator }, {members: true, lectureCreator: true});
  
  if(lectureCreator !== undefined){
    return lecture.members.length - 1 
  }
  else{
    return lecture.members.length
  }
};