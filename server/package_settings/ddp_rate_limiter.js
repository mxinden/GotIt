"use strict";

var setRateLimitToAllMeteorMethods;

if (process.env.NODE_ENV === 'production') {
  setRateLimitToAllMeteorMethods = {
    type: 'method',
    name: function() {
      return true;
    }
  };

  // Any Meteor method can only be called 5 times each second
  DDPRateLimiter.addRule(setRateLimitToAllMeteorMethods, 10, 1000);
}
