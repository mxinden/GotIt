Template.lecturePageHeader.helpers({

  numberMembers: function(){
    return getNumberOfMembersInLecture(this.lectureCode);
  }

}); 

Template.lecturePageHeader.events({

  'click #back-button': function() {
    leaveLecture(this.lectureCode); //see lecture_page.js
 }

});

