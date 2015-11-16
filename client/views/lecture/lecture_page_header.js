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
    if (this.author === Meteor.userId()) {
      Session.set('landingPage.changingTitle', true);
    }
  },
  // Handle the <RETURN> key event
  'keypress #title-input': function(e) {
    if (e.which === 13) {
      Meteor.call('setTitle', this.lectureCode, $('#title-input').val());
      Session.set('landingPage.changingTitle', false);
    }
  },
  'blur #title-input': function() {
    Meteor.call('setTitleOfLecture', this.lectureCode, $('#title-input').val());
    Session.set('landingPage.changingTitle', false);
  },
  'click #back-button': function() {
    // see lecture_page.js
    leaveLecture();
  },
  'click #show-lecture-code': function() {
    Session.set('lecturePage.isLectureCodeVisible', true);
    Tracker.afterFlush(function() {
      updateNavbarCSS();
    });
  },
  'click #hide-lecture-code': function() {
    Session.set('lecturePage.isLectureCodeVisible', false);
    updateNavbarCSS();
  }
});

Template.lecturePageHeaderTitle.helpers({
  isAuthor: function() {
    return this.author === Meteor.userId();
  },
  numberOfMembers: function() {
    var number = App.Lectures.getNumberOfMembersInLecture(this.lectureCode);
    var result = number + ' member';

    if (number > 1) {
      result += 's';
    }

    return result;
  }
});

Template.lecturePageHeaderTitleChange.rendered = function() {
  $('#title-input').focus();
  updateNavbarCSS();
};

Template.lecturePageHeaderTitle.rendered = function() {
  updateNavbarCSS();
};
