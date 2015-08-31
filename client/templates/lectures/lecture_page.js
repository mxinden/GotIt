Template.lecturePage.helpers({

  questions: function() {
    return Questions.find();
  },

});

getNumberOfMembersInLecture =  function(lectureCode) {
  members = Lectures.find({lectureCode: lectureCode}, {members: true}).fetch();
  return members.length;
};
