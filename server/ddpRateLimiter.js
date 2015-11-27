Meteor.methods({
  dosAttack: function() {console.log("dos");}
});

var preventDosAttack= {
  userId: function() {return true;},
  type: 'method',
  method: 'dosAttack'
}

DDPRateLimiter.addRule(preventDosAttack, 5, 1000);
