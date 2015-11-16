getNumberOfMembersInLecture =  function(lectureCode) {
  lecture = Lectures.findOne({lectureCode: lectureCode}, {members: true, author: true});
  author  = Lectures.findOne({lectureCode: lectureCode, members: lecture.author}, {author: true});

  if(author !== undefined){
    return lecture.members.length - 1;
  } else {
    return lecture.members.length;
  }
};
