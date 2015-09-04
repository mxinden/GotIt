getNumberOfMembersInLecture =  function(lectureCode) {
  return Lectures.findOne({lectureCode: lectureCode}, {members: true}).members.length;
};

