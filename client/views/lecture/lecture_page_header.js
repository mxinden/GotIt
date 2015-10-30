Template.lecturePageHeader.helpers({

  numberMembers: function(){
    return getNumberOfMembersInLecture(this.lectureCode);
  }

}); 

Template.lecturePageHeader.events({

  'click #back-button': function() {
    leaveLecture(); //see lecture_page.js
 }

});

