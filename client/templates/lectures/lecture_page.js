Template.lecturePage.helpers({

  questions: function() {
    return Questions.find();
  },

});

getNumberOfMembersInLecture =  function(lectureCode) {
  return Lectures.findOne({lectureCode: lectureCode}, {members: true}).members.length;
};

