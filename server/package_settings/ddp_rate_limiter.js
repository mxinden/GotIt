"use strict";

var setRateLimitToAllMeteorMethods;

// Any Meteor method can only be called 5 times each second
if (!process.env.NODE_ENV === 'development') {
  setRateLimitToAllMeteorMethods = {
    type: 'method',
    name: function() {
      return true;
    }
  };
  DDPRateLimiter.addRule(setRateLimitToAllMeteorMethods, 10, 1000);
}
