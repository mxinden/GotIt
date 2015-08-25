Meteor.publish('lectures', function(){
  return Lectures.find();
})
