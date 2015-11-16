getNumberOfMembersInLecture = function(lectureCode) {
  var lecture = Lectures.findOne({lectureCode: lectureCode}, {members: true, author: true});
  var author = Lectures.findOne({lectureCode: lectureCode, members: lecture.author}, {author: true});

  if (author !== undefined) {
    return lecture.members.length - 1;
  }
  return lecture.members.length;
};
