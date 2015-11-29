"use strict";

Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'landingPage',
  waitOn: function() {
    return [
      Meteor.subscribe('lecturesOnlyLectureCode')
    ];
  }
});

Router.route('/impressum', {
  name: 'impressum'
});

Router.route('/privacyPolicy', {
  name: 'privacyPolicy'
});

Router.route('/:lectureCode', {
  name: 'lecturePage',
  waitOn: function() {
    return [
      Meteor.subscribe('lecture', this.params.lectureCode),
      Meteor.subscribe('questions', this.params.lectureCode),
      Meteor.subscribe('votes', this.params.lectureCode)
    ];
  },
  onBeforeAction: function() {
    if (!App.Lectures.isLecturer(this.params.lectureCode)) {
      Meteor.call('insertStudent', this.params.lectureCode);
    }
    this.next();
  },
  data: function() {
    return App.Lectures.Collection.findOne({lectureCode: this.params.lectureCode});
  }
});

/** Route to notFound template if lecture with this lecture code does not exist*/
Router.onBeforeAction('dataNotFound', {only: 'lecturePage'});
