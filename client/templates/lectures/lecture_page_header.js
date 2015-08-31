Template.lecturePageHeader.helpers({

  numberOfUsersInLecture : function() {
    members = Lectures.find({lectureCode: this.lectureCode}, {members: true}).fetch();
    return members.length;
  }

}); 
