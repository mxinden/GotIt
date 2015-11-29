// Any Meteor method can only be called 5 times each second
var setRateLimitToAllMeteorMethods= {
  type: 'method',
  name: function() {
    return true
  }
}
DDPRateLimiter.addRule(setRateLimitToAllMeteorMethods, 5, 1000);
