Template.lecturePageHeader.helpers({

    /** Client is only subscribed to presence information of current lecture */
    numberOfUsersInLecture: function() {
    return Presences.find().count();
  }

}); 
