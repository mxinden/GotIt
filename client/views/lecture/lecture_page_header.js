"use strict";

Template.lecturePageHeader.helpers({
  isChangingTitle: function() {
    return Session.get('landingPage.changingTitle');
  },
  isLectureCodeVisible: function() {
    return Session.get('lecturePage.isLectureCodeVisible');
  }
});

Template.lecturePageHeader.events({
  // Handle Click event
  'click #title': function() {
    if (this.lecturer === Meteor.userId()) {
      Session.set('landingPage.changingTitle', true);
    }
  },
  // Handle the <RETURN> key event
  'keypress #title-input': function(e) {
    if (e.which === 13) {
      Meteor.call('setTitleOfLecture', this.lectureCode, $('#title-input').val());
      Session.set('landingPage.changingTitle', false);
    }
  },
  'blur #title-input': function() {
    Meteor.call('setTitleOfLecture', this.lectureCode, $('#title-input').val());
    Session.set('landingPage.changingTitle', false);
  },
  'click #back-button': function() {
    // see lecture_page.js
    App.Lectures.leaveLecture(this.lectureCode);
  },
  'click #show-lecture-code': function() {
    Session.set('lecturePage.isLectureCodeVisible', true);
    Tracker.afterFlush(function() {
      App.updateNavbarCSS();
    });
  },
  'click #hide-lecture-code': function() {
    Session.set('lecturePage.isLectureCodeVisible', false);
    App.updateNavbarCSS();
  }
});

Template.lecturePageHeaderTitle.helpers({
  isLecturer: function() {
    return App.Lectures.isLecturer(this.lectureCode);
  },
  numberOfStudents: function() {
    var number = this.students.length;
    var result = number + ' student';

    if (number !== 1) {
      result += 's';
    }

    return result;
  }
});

Template.lecturePageHeaderTitleChange.rendered = function() {
  $('#title-input').focus();
  App.updateNavbarCSS();
};

Template.lecturePageHeaderTitle.rendered = function() {
  App.updateNavbarCSS();
};
