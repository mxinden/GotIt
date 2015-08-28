Meteor.publish('lectures', function(){
  return Lectures.find();
})

Meteor.publish('questions', function(){
  return Questions.find();
})
