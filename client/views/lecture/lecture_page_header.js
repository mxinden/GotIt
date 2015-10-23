Template.lecturePageHeader.helpers({

  numberMembers: function(){
    return getNumberOfMembersInLecture(this.lectureCode);
  }

}); 

Template.lecturePageHeader.events({

  'click #back-button': function(event) {
    event.preventDefault();
    Meteor.call('deleteVotesFromUserFromLecture', this.lectureCode, function(error, result) {
      if(error) 
        return alert(error);
    });
    Meteor.call('memberDelete', this.lectureCode, function(error, result) {
      if(error)
        return alert(error);
    });
    Router.go('landingPage');
  }

});

