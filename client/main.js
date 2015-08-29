Meteor.subscribe('lectures');
Meteor.subscribe('questions');
Meteor.subscribe('votes');

/** Keep track in which lecture room the user currently is */
Presence.state = function() {
  return {
    online: true,
    currentLectureCode: Router.current().params.lectureCode
  }
}
