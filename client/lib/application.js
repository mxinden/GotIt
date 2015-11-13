getNumberOfMembersInLecture =  function(lectureCode) {
  var lecture = Lectures.findOne({lectureCode: lectureCode}, {members: true});
  if(lecture) {
    return lecture.members.length;
  }
};
