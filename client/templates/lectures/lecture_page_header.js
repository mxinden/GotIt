Template.lecturePageHeader.helpers({

    numberOfUsers: function() {
    return Presences.find().count();
  }

}); 
