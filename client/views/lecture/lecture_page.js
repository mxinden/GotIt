Template.lecturePage.helpers({
  questions: function() {
    var questions = App.Questions.Collection.find({lectureCode: this.lectureCode}).fetch();

    _.each(questions, function(question) {
      var amountVotes = App.Votes.Collection.find({questionId: question._id}).count();
      question.amountVotes = amountVotes;
    });

    questions.sort(function(a, b) {
      return b.amountVotes - a.amountVotes;
    });

    return questions;
  },

  // Prevent template rendering before lecture data is available
  lectureDataReady: function() {
    var lectureData = App.Lectures.Collection.findOne({lectureCode: this.lectureCode});

    if (lectureData) {
      return true;
    }
    return false;
  }
});

Template.lecturePage.rendered = function() {
  Session.set('lecturePage.isLectureCodeVisible', true);
  Tracker.afterFlush(function() {
    updateNavbarCSS();
  });

  //* Copyright (C) 2012--2014 Discover Meteor */
  this.find('.animated')._uihooks = {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .fadeIn();
    },

    moveElement: function(node, next) {
      var newTop;
      var $node = $(node);
      var oldTop = $node.offset().top;
      var height = $(node).outerHeight(true);

      // find all the elements between next and node
      var $inBetween = $(next).nextUntil(node);
      if ($inBetween.length === 0) {
        $inBetween = $(node).nextUntil(next);
      }

      // now put node in place
      $(node).insertBefore(next);

      // measure new top
      newTop = $(node).offset().top;

      // move node *back* to where it was before
      $(node)
        .removeClass('animate')
        .css('top', oldTop - newTop);

      // push every other element down (or up) to put them back
      $inBetween
        .removeClass('animate')
        .css('top', oldTop < newTop ? height : -1 * height);


      // force a redraw
      $(node).offset();

      // reset everything to 0, animated
      $(node).addClass('animate').css('top', 0);
      $inBetween.addClass('animate').css('top', 0);
    },

    removeElement: function(node) {
      $(node).fadeOut(function() {
        $(this).remove();
      });
    }
  };
};

/** call leaveLecture() before tab / window close */
Meteor.startup(function() {
  $(window).bind('beforeunload', function() {
    if (Router.current().route.getName() === 'lecturePage') {
      leaveLecture();
    }
  });

  $(window).resize(function() {
    var currentRoute = Router.current().route.getName();

    if (currentRoute === 'lecturePage' || currentRoute === 'landingPage') {
      updateNavbarCSS();
    }
  });
});


leaveLecture = function() {
  var lectureCode = Router.current().data().lectureCode;

  Meteor.call('deleteVotesFromUserFromLecture', lectureCode);
  Meteor.call('removeCurrentUserFromLecture', lectureCode);

  Router.go('landingPage');
  // reset the page top padding when returning to the landing page
  // as the CSS of the body does not refresh
  Tracker.afterFlush(function() {
    updateNavbarCSS();
  });
};

// as the navbar poisition is fixed, the page content needs to be
// pulled down when the navbar gets higher (on resize or when the title is edited)
updateNavbarCSS = function() {
  var navbarHeight, columnLectureCodeHeight, columnLectureCodeMargin,
    lectureCodeNavbarHeight, bodyPaddingTop;

  // reset the margin of the column to calculate proper dimensions
  $('#col-show-lecture-code').css('margin-top', '0');

  navbarHeight = $('#lecture-page-header').height();
  columnLectureCodeHeight = $('#col-show-lecture-code').height();
  lectureCodeNavbarHeight = 0;

  if (Session.get('lecturePage.isLectureCodeVisible')) {
    lectureCodeNavbarHeight = $('#lecture-page-navbar-lecture-code').height();
  }

  bodyPaddingTop = navbarHeight + lectureCodeNavbarHeight + 12;
  columnLectureCodeMargin = navbarHeight - columnLectureCodeHeight;

  $('#lecture-page-navbar-lecture-code').css('top', navbarHeight + 'px');
  $('#col-show-lecture-code').css('margin-top', columnLectureCodeMargin + 'px');
  $('body').css('padding-top', bodyPaddingTop + 'px');
};
