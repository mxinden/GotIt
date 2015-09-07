Template.lecturePageHeader.helpers({


  numberMembers: function(){
    return getNumberOfMembersInLecture(this.lectureCode);
  }
}); 

Template.lecturePageHeader.events({
  
  //Handle Click event
  'click #title': function(e){
    $(e.target).attr('contentEditable', true);  
  },
  //Handle the <RETURN> key event
   'keydown #title': function(e){
     if(e.keyCode == 13) {
       $(e.target).attr('contentEditable', false);
       //Update Title in DB
       Meteor.call('setTitleOfLecture', this.lectureCode, $(e.target).text());
     }
  },
  //When user clicks outside control
  'blur': function(e){

    //Update Title in DB
    Meteor.call('setTitleOfLecture', this.lectureCode, $('#title').text());
  }
});

Template.lecturePageHeader.onRendered(function(){ 
  if(!this._rendered){ 
    //console.log(this.title);
    //if(typeof this.title === 'undefined'){
    if( $('#title').text() === ''){
      $('#title').text("Undefined Title");
      //this.title = "Undefined?";
      this._rendered=true;
    }
  }
});